from core.database import ChromaDBManager
from config.gemini_config import GeminiConfig

class SimilaritySearch:
    def __init__(self):
        self.model = GeminiConfig.initialize()
        self.db_manager = ChromaDBManager()
    
    def query(self, query_text: str, website_name: str) -> str:
        try:
            # Get similar documents from ChromaDB
            results = self.db_manager.query_documents(
                website_name,
                query_text,
                n_results=3
            )
            
            # Start chat session with Gemini
            chat_session = self.model.start_chat(history=[])
            response = chat_session.send_message(
                f"Answer the following question: {query_text}, This is the relevant info about the webpage {results}"
            )
            
            return response.text
            
        except Exception as e:
            raise Exception(f"Error in similarity search: {str(e)}") 