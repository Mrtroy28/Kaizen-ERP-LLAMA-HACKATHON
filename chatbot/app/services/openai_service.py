#openai_service.py
from openai import OpenAI
import shelve
from dotenv import load_dotenv
import os
import time
import logging
import requests
import json

from .summarization import generate_summary


load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_ASSISTANT_ID = os.getenv("OPENAI_ASSISTANT_ID")
client = OpenAI(api_key=OPENAI_API_KEY)


def verificar_correo(correo):
    correo = correo.lower()
    
    base_url = "https://apiqa.prosit.bio/patients/"
    url = f"{base_url}{correo}"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            user_id = data['data']['id']
            return user_id, "El correo está registrado."
        else:
            return None, "El correo no está registrado."
    except requests.exceptions.RequestException as e:
        return None, f"Error en la solicitud: {e}"

def registrar_paciente(names, first_lastname, email):
    url = "https://apiqa.prosit.bio/patients"
    payload = {
        "names": names,
        "first_lastname": first_lastname,
        "second_lastname": None,
        "email": email,
        "create_temporal_password": True
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:  
            data = response.json()
            user_id = data['data']['id']
            return user_id, "Paciente registrado exitosamente."
        else:
            return None, f"Error al registrar paciente: {response.text}"
    except requests.exceptions.RequestException as e:
        return None, f"Error en la solicitud: {e}"



def agendar_cita(user_id):
    url = "https://apiqa.prosit.bio/appointments"
    payload = {
        "patient_attended_id": user_id,
        "patient_reserved_id": user_id,
        "created_for_doctor": False,
        "type": 2
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            data = response.json()
            appointment_id = data['data']['service_attention']['id']
            service_for_attention_id = data['data']['service_attention']['service_for_attention_id']
            return appointment_id, service_for_attention_id, "Cita agendada exitosamente."
        else:
            return None, None, f"Error al agendar cita: {response.text}"
    except requests.exceptions.RequestException as e:
        return None, None, f"Error en la solicitud: {e}"



def actualizar_resumen(service_for_attention_id, summary):
    url = f"https://apiqa.prosit.bio/medical_consulties/{service_for_attention_id}/summary"
    payload = {
        "summary": summary
    }
    
    try:
        response = requests.put(url, json=payload)
        if response.status_code == 200:
            return "Resumen actualizado exitosamente."
        else:
            return f"Error al actualizar resumen: {response.text}"
    except requests.exceptions.RequestException as e:
        return f"Error en la solicitud: {e}"


def check_if_thread_exists(wa_id):
    with shelve.open("threads_db") as threads_shelf:
        return threads_shelf.get(wa_id, None)

def store_thread(wa_id, thread_id):
    with shelve.open("threads_db", writeback=True) as threads_shelf:
        threads_shelf[wa_id] = thread_id

def store_user_id(wa_id, user_id):
    with shelve.open("users_db", writeback=True) as users_shelf:
        users_shelf[wa_id] = user_id

def get_user_id(wa_id):
    with shelve.open("users_db") as users_shelf:
        return users_shelf.get(wa_id, None)

def store_messages(wa_id, message):
    with shelve.open("messages_db", writeback=True) as messages_shelf:
        if wa_id not in messages_shelf:
            messages_shelf[wa_id] = []
        messages_shelf[wa_id].append(message)

def get_messages(wa_id):
    with shelve.open("messages_db") as messages_shelf:
        return messages_shelf.get(wa_id, [])


def run_assistant(thread, name):
    try:
        assistant = client.beta.assistants.retrieve(OPENAI_ASSISTANT_ID)
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id,
        )

        while run.status not in ["completed", "failed"]:
            if run.status == "requires_action":
                if run.required_action and run.required_action.submit_tool_outputs:
                    tool_call = run.required_action.submit_tool_outputs.tool_calls[0]
                    arguments = json.loads(tool_call.function.arguments)
                    function_name = tool_call.function.name

                    if function_name == "verificar_correo":
                        user_id, result = verificar_correo(arguments['correo'])
                        if user_id:
                            store_user_id(thread.id, user_id)
                    elif function_name == "registrar_paciente":
                        user_id, result = registrar_paciente(arguments['names'], arguments['first_lastname'], arguments['email'])
                        if user_id:
                            store_user_id(thread.id, user_id)
                    elif function_name == "agendar_cita":
                        user_id = get_user_id(thread.id)
                        if user_id:
                            appointment_id, service_for_attention_id, result = agendar_cita(user_id)
                            if appointment_id and service_for_attention_id:
                                result = f"Cita agendada exitosamente. Puedes acceder a la cita en: https://directorioqa.prosit.bio/create-password?sid={appointment_id}"
                                summary_text = " ".join(get_messages(thread.id))
                                summary = generate_summary(summary_text)
                                print(summary)
                                actualizar_resumen(service_for_attention_id, summary)
                                print(f"service_for_attention_id{service_for_attention_id}")
                        else:
                            result = "No se encontró el ID del usuario para agendar la cita."
                    else:
                        result = f"Función desconocida: {function_name}"

                    tool_outputs = [{
                        "tool_call_id": tool_call.id,
                        "output": result
                    }]

                    run = client.beta.threads.runs.submit_tool_outputs_and_poll(
                        thread_id=thread.id,
                        run_id=run.id,
                        tool_outputs=tool_outputs
                    )

            time.sleep(0.5)
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)

        messages = client.beta.threads.messages.list(thread_id=thread.id)
        if messages.data:
            new_message = messages.data[0].content[0].text.value
            logging.info(f"Generated message: {new_message}")
            store_messages(thread.id, new_message)
            return new_message
        else:
            logging.error("No messages found in the thread.")
            return "Error: No messages found in the thread."

    except Exception as e:
        logging.error(f"Error running assistant: {e}")
        return f"Error: {e}"



from datetime import datetime, timedelta


def store_last_activity(wa_id):
    with shelve.open("activity_db", writeback=True) as activity_shelf:
        activity_shelf[wa_id] = datetime.now()

def get_last_activity(wa_id):
    with shelve.open("activity_db") as activity_shelf:
        return activity_shelf.get(wa_id, None)

def is_inactive(wa_id, timeout_minutes=5):
    last_activity = get_last_activity(wa_id)
    if last_activity:
        return datetime.now() - last_activity > timedelta(minutes=timeout_minutes)
    return False


def generate_response(message_body, wa_id, name):
    try:
        if is_inactive(wa_id):
            return "La conversación ha expirado debido a la inactividad. Por favor, inicia una nueva conversación si necesitas más ayuda."

        store_last_activity(wa_id)
        thread_id = check_if_thread_exists(wa_id)

        if thread_id is None:
            logging.info(f"Creating new thread for {name} with wa_id {wa_id}")
            thread = client.beta.threads.create()
            store_thread(wa_id, thread.id)
            thread_id = thread.id
        else:
            logging.info(f"Retrieving existing thread for {name} with wa_id {wa_id}")
            thread = client.beta.threads.retrieve(thread_id)

        message = client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_body,
        )

        store_messages(thread_id, message_body)

        new_message = run_assistant(thread, name)
        return new_message

    except Exception as e:
        logging.error(f"Error generating response: {e}")
        return f"Error: {e}"
