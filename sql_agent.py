# 1. Cargar la base de datos con LangChain
from langchain.sql_database import SQLDatabase
db = SQLDatabase.from_uri("sqlite:///ecommerce.db")

# 2. Importar el modelo OllamaLLM
from langchain_ollama import OllamaLLM
llm = OllamaLLM(model='llama3.2:latest', temperature=0.2)



formato = """
Dada una pregunta del usuario, sigue estos pasos:
1. Crea una consulta en sqlite3 para responder la pregunta.
2. Ejecuta la consulta y revisa los resultados.
3. Devuelve el dato encontrado.
4. Si necesitas hacer alguna aclaración o devolver cualquier texto, hazlo siempre en español.
5. solo devuelve la consulta sql y no escribas nada mas ejemploL: SELECT "producto" FROM ventas GROUP BY "producto" ORDER BY COUNT(*) DESC LIMIT 5;

Pregunta: {question}
"""


# 5. Crear la cadena con el prompt, el modelo y la caché
from langchain_experimental.sql import SQLDatabaseChain

cadena = SQLDatabaseChain(llm=llm, database=db, verbose=False)

def consulta(input):
    consulta= formato.format(question=input)
    resultado = cadena.run(consulta)
    return resultado


