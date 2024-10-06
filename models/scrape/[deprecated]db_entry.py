#ignore this file for now

import chromadb
import pandas as pd

# Initialize ChromaDB client
client = chromadb.Client()

# Create a collection
collection = client.create_collection("my_collection")

# Read text file content with UTF-8 encoding
# with open('./outputs/selenium_output.txt', 'r', encoding='utf-8') as file:
#     text_content = file.read()

# Insert content into ChromaDB collection
# collection.add("text_content", text_content)

# Load CSV files into DataFrame
df_routes = pd.read_csv("./outputs/selenium_output[routes].csv")

# Iterate through rows and add to ChromaDB
for index, row in df_routes.iterrows():
    document_id = f"csv_document_routes_{index}"
    content = row.to_string()
    collection.add(ids=document_id, documents=content)

df_images = pd.read_csv("./outputs/selenium_output[images].csv")

# Iterate through rows and add to ChromaDB
for index, row in df_images.iterrows():
    document_id = f"csv_document_images_{index}"
    content = row.to_string()
    collection.add(document_id, documents=content)
