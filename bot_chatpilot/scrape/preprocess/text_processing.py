import os
import chromadb


def process_text(text, website_name):
    # current_dir = os.path.dirname(os.path.abspath(__file__))
    # db_path = os.path.join(current_dir, "../Vector_database/")

    # dividing into chunks
    chunk_size = 30
    words = text.split()
    chunks = [words[i : i + chunk_size] for i in range(0, len(words), chunk_size)]
    print(chunks[0])

    # Initialize ChromaDB client
    client = chromadb.PersistentClient(path="./vector_database/")

    # Create or load a collection in ChromaDB for the specific website
    collection_name = f"{website_name}_text_data"
    collection = client.get_or_create_collection(collection_name)

    # Example text data to store

    texts = []
    for idx, chunk in enumerate(chunks):
        text_data = " ".join(chunk)
        texts.append({"id": str(idx + 1), "text": text_data})

    # Add text data to the collection with embeddings
    for text_data in texts:
        # data preprocess
        collection.add(
            documents=[text_data["text"]],
            ids=[text_data["id"]],
        )

    print(f"Data has been successfully added to the {collection_name} collection.")
