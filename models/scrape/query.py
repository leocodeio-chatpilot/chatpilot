import chromadb
import os


def query_db(query_text):
    # Get the current directory of this file
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Path for the ChromaDB database
    db_path = os.path.join(current_dir, './database/')

    # Initialize ChromaDB client with the absolute path
    client = chromadb.PersistentClient(db_path)

    # the collection 
    collection_name = "text_data"

    # Retrieve the collection
    collection = client.get_or_create_collection(collection_name)


    # print(query_text)
    # Retrieve the top 3 closest matches
    results = collection.query(
        query_texts=query_text,
        n_results=3  # Number of closest results you want
    )

    # Output the results
    # for result in results['documents']:
    #     print(f"Related text: {result}")
    
    return results
# ouput = query_db(query_text)
# print(ouput)