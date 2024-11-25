import os
from bs4 import BeautifulSoup
from core.database import ChromaDBManager
from .base import BaseProcessor

class TextProcessor(BaseProcessor):
    def __init__(self, website_name: str, output_folder: str):
        super().__init__(website_name, output_folder)
        self.text_file = os.path.join(output_folder, f"{website_name}_text.txt")

    def process(self, soup: BeautifulSoup):
        content = soup.get_text()
        content = content.replace("\u200e", "").replace("\n", "")

        # store the text in the file
        self._store_text(content)

        # Process chunks and store in database
        chunks = self._create_chunks(content)

        # store the chunks in the database
        self._store_chunks(chunks)

        return content
    
    def _store_text(self, content: str):
        with open(self.text_file, "a", encoding="utf-8") as file:
            file.write(content)
        