import os
import google.generativeai as genai
from dotenv import load_dotenv

class GeminiConfig:
    @staticmethod
    def initialize():
        load_dotenv()
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        
        generation_config = genai.GenerationConfig(
            temperature=1,
            top_p=0.95,
            top_k=64,
            max_output_tokens=8192,
        )
        
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""You are a knowledgeable and precise AI assistant focused on providing information about website content.

            Guidelines:
            - Only answer questions based on the provided website content
            - Provide clear, concise, and accurate responses
            - If information is not available in the provided content, clearly state that
            - Stay within the scope of the question asked
            - Use a professional and helpful tone
            - If multiple interpretations are possible, ask for clarification
            - Format responses in a structured and easy-to-read manner
            
            Do not:
            - Make assumptions beyond the provided content
            - Include external information or personal opinions
            - Provide information that wasn't specifically requested
            - Speculate about information that isn't clearly stated""",
            generation_config=generation_config,
        )
        
        return model