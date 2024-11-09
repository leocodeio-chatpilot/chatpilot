from bs4 import BeautifulSoup
from core.database import ChromaDBManager

class TextProcessor:
    def __init__(self, website_name: str):
        self.website_name = website_name
        self.db_manager = ChromaDBManager()
        
    def process(self, soup: BeautifulSoup):
        content = soup.get_text()
        content = content.replace("\u200e", "").replace("\n", "")
        
        # Process chunks and store in database
        chunks = self._create_chunks(content)
        self._store_chunks(chunks)
        
        return content
        
    def _create_chunks(self, text: str, chunk_size: int = 30):
        words = text.split()
        return [words[i:i + chunk_size] for i in range(0, len(words), chunk_size)]
        
    def _store_chunks(self, chunks: list):
        texts = []
        for idx, chunk in enumerate(chunks):
            text_data = " ".join(chunk)
            texts.append({"id": str(idx + 1), "text": text_data})
            
        for text_data in texts:
            self.db_manager.add_documents(
                self.website_name,
                documents=[text_data["text"]],
                ids=[text_data["id"]]
            )