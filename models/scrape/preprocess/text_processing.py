import chromadb

def process_text(text):
    
    #dividing into chunks
    chunk_size = 30
    words = text.split()  
    chunks =[words[i:i + chunk_size] for i in range(0, len(words), chunk_size)]
    print(chunks[0])
    # Initialize ChromaDB client
    client = chromadb.Client()

    # db to store
    client = chromadb.PersistentClient(path="./database/")

    # Create or load a collection in ChromaDB
    collection_name = "text_data"
    collection = client.create_collection(collection_name)

    # Example text data to store 

    texts = []
    for idx,chunk in enumerate(chunks):
        text_data = " ".join(chunk)
        texts.append({"id": str(idx+1), "text": text_data})

    # Add text data to the collection with embeddings
    for text_data in texts:
        collection.add(
            documents=[text_data["text"]],
            ids=[text_data["id"]],       
        )

    print("Data has been successfully added to the collection.")