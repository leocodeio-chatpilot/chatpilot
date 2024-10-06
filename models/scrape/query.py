import chromadb
client = chromadb.PersistentClient('./database/')
# Query the collection (e.g., find related text to a query)

query_text = "what is ai?"
# query_embedding = embedding_function(query_text)
collection_name = "text_data"

collection = client.get_collection(collection_name)

# # Retrieve the top 3 closest matches
results = collection.query(
    query_texts=query_text,
    n_results=3  # Number of closest results you want
)

# # Output the results
for result in results['documents']:
    print(f"Related text: {result}")