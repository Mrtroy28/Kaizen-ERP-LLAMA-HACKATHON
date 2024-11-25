from langchain.prompts import PromptTemplate
from langchain_ollama import OllamaLLM
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

# Carga las variables de entorno desde el archivo .env
load_dotenv()

# Inicializa el modelo de lenguaje Ollama
llm = OllamaLLM(model="llama3.2:latest")

# Define el prompt para resumir el texto
summarization_prompt = PromptTemplate.from_template(
    """
    Por favor, a partir del siguiente texto, elabora una cotización detallada y estructurada en un formato que se vea bien al enviarlo por 
    correo electrónico. Asegúrate de incluir todos los elementos necesarios, como descripción de productos o servicios, cantidades, precios 
    unitarios, subtotales y total. El resultado debe ser claro y fácil de leer, utilizando encabezados y listas cuando sea apropiado.

{text}
    """
)

# Crea la secuencia combinando el prompt y el modelo
summarization_chain = summarization_prompt | llm

def generate_summary(text):
    """
    Función para generar un resumen a partir del texto dado.
    """
    # Genera el resumen
    summary = summarization_chain.invoke({"text": text})
    # Devuelve el texto resumido
    return summary

def send_email(text):
    email = "ceferino.troya.r@gmail.com"
    receiver_email = "wolfest2899@gmail.com"

    subject = "cotizacion"
    message = text

    # Obtén la contraseña desde una variable de entorno
    email_password = os.getenv("EMAIL_PASSWORD")

    if not email_password:
        print("ERROR: La variable de entorno EMAIL_PASSWORD no está configurada o está vacía.")
        return

    try:
        msg = EmailMessage()
        msg.set_content(message)
        msg['Subject'] = subject
        msg['From'] = email
        msg['To'] = receiver_email

        # Asegura que el mensaje se codifique en UTF-8
        msg.set_charset('utf-8')

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(email, email_password)
        server.send_message(msg)
        server.quit()
        print("Email ha sido enviado a " + receiver_email)
    except Exception as e:
        print(f"Ocurrió un error al enviar el correo: {e}")

if __name__ == "__main__":
    # Define el texto que deseas resumir
    texto_a_resumir = """
     : hola
    Bot Bot 2: ¡Hola! Bienvenido a ETESA. ¿En qué puedo ayudarte hoy?
    : tengo un problema en mi casa que hay bajones electricos
    Bot Bot 2: Lamento escuchar eso. En ETESA, ofrecemos servicios de reparación e instalación eléctrica para resolver problemas como bajones eléctricos. Estamos ubicados en Ciudad de Panamá, pero brindamos servicios a todo el país, así que podemos ayudarte sin importar dónde te encuentres. 

    Actualmente, tenemos una promoción especial en servicios de diagnóstico y reparación eléctrica. ¿Te gustaría que agendemos una cita para que uno de nuestros técnicos visite tu hogar?
    : si por favor
    Bot Bot 2: ¡Excelente! Vamos a agendar una cita para ti. ¿Qué día te gustaría que nuestro técnico te visite? También, por favor, indícame la hora que te conviene más. Una vez que confirmemos la cita, te proporcionaré el enlace para completar el pago.
    : me gustaria que fuera el miercoles
    Bot Bot 2: Perfecto, podemos agendar la visita para el miércoles. ¿Qué hora te conviene más para que nuestro técnico te visite?
    : seria bueno en la tarde
    Bot Bot 2: ¡Genial! Agendaremos la visita para el miércoles en la tarde. Ahora, por favor visita el siguiente enlace para completar el pago: [pagoservicio.com](http://pagoservicio.com).

    Voy a proceder a confirmar la cita y te enviaré un correo con todos los detalles adicionales.
    : gracias
    Bot Bot 2: ¡De nada! Estoy aquí para ayudarte. He confirmado tu cita para el miércoles en la tarde y te enviaré un correo con todos los detalles adicionales. Si tienes alguna otra pregunta o necesitas más asistencia, no dudes en decírmelo. ¡Que tengas un excelente día!
    """
    # Genera el resumen
    resumen = generate_summary(texto_a_resumir)
    print("\nResumen:")
    print(resumen)

    # Envía el resumen por correo electrónico
    send_email(resumen)
