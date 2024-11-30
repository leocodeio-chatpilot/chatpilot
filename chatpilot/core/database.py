import chromadb
from typing import List

class ChromaDBManager:
    def __init__(self, db_path: str = "./vector_database/"):
        self.client = chromadb.PersistentClient(path=db_path)
    
    def get_or_create_collection(self, api_key: str):
        collection_name = f"{api_key}_data"
        return self.client.get_or_create_collection(collection_name)
    
    def add_documents(self, collection_name: str, documents: List[str], ids: List[str]):
        collection = self.get_or_create_collection(collection_name)
        collection.add(documents=documents, ids=ids)
    
    def query_documents(self, collection_name: str, query_text: str, n_results: int = 3):
        collection = self.get_or_create_collection(collection_name)
        return collection.query(query_texts=[query_text], n_results=n_results)