import chromadb
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure the API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model
generation_config = genai.GenerationConfig(
    temperature=1,
    top_p=0.95,
    top_k=64,
    max_output_tokens=8192,
)

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction="""You are a helpful assistant that can answer questions about the website content. 
    Answer the question based on the provided information. If you are unsure, say so. 
    But do not give any information that is not asked. Also do not give any information outside of the website.""",
    generation_config=generation_config,
)


def query_db(query_text, website_name):
    # Initialize ChromaDB client with the absolute path
    client = chromadb.PersistentClient("./vector_database/")

    # Get the collection for the specific website
    collection_name = f"{website_name}_text_data"

    # Retrieve the collection
    collection = client.get_collection(collection_name)

    # Retrieve the top 3 closest matches
    results = collection.query(
        query_texts=[query_text], n_results=3  # Number of closest results you want
    )

    chat_session = model.start_chat(history=[])
    response = chat_session.send_message(
        f"Answer the following question: {query_text}, This is the relevant info about the webpage {results}"
    )

    return response.text


# query_text = "What is the history of anime?"
# ouput = query_db(query_text)
# print(ouput)

import os
