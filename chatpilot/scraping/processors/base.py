from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
from core.database import ChromaDBManager
from core.textfilter import TextFilter

class BaseProcessor(ABC):
    def __init__(self, api_key: str, output_folder: str):
        self.api_key = api_key
        self.output_folder = output_folder
        self.db_manager = ChromaDBManager()
        self.text_filter = TextFilter()
        
    def _create_chunks(self, text: str, chunk_size: int = 100):
        words = text.split()
        return [words[i:i + chunk_size] for i in range(0, len(words), chunk_size)]
        
    def _store_chunks(self, chunks: list):
        texts = []
        for idx, chunk in enumerate(chunks):
            text_data = " ".join(chunk)
            texts.append({"id": str(idx + 1), "text": text_data})
            
        for text_data in texts:
            transformed_text = self._transform_text(text_data["text"])
            self.db_manager.add_documents(
                self.api_key,
                documents=[transformed_text],
                ids=[text_data["id"]]
            )
            
        return texts
    
    def _transform_text(self, text: str) -> str:
        return self.text_filter.filter(text)
