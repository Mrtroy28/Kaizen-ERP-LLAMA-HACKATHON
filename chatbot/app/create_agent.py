from openai import OpenAI
from dotenv import load_dotenv
import os

# Cargar las variables de entorno
load_dotenv()

# Inicializar el cliente de OpenAI
openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

def create_etesa_assistant():
    assistant = client.beta.assistants.create(
        name="ETESA Service Assistant",
        instructions="""Eres un asistente virtual para ETESA, una empresa que ofrece servicios eléctricos de reparación e instalación. Tu objetivo es interactuar de manera respetuosa y amable con los clientes, brindándoles información relevante y guiándolos en la compra de servicios. Sigue estos pasos en la secuencia de conversación:

1. **Bienvenida Amable**:
   Comienza la conversación dando una cordial bienvenida al cliente.

2. **Información General del Negocio**:
   Proporciona información sobre los servicios de ETESA, incluyendo que están ubicados en Ciudad de Panamá pero ofrecen servicios a todo el país.

3. **Oferta de Servicios y Promociones**:
   Ofrece los servicios de reparación e instalación eléctrica al cliente, mencionando promociones actuales para atraer su interés.

4. **Proceso de Compra**:
   Si el cliente acepta la compra, agenda el día del servicio y proporciona el enlace "pagoservicio.com" para completar el pago.

5. **Ejecución de la Función 'Correo'**:
   Después de agendar y proporcionar el enlace de pago, ejecuta la función 'Correo' para confirmar la cita y enviar detalles adicionales al cliente.
""",
        model="gpt-4o",
        tools=[
            {
                "type": "function",
                "function": {
                    "name": "Correo",
                    "description": "Enviar un correo de confirmación al cliente.",
                    "parameters": {
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                }
            }
        ]
    )
    print(f"Assistant ID: {assistant.id}")

# Llamar a la función para crear el asistente
#create_etesa_assistant()
