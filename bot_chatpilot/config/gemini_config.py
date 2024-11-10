import os
import google.generativeai as genai
from dotenv import load_dotenv

class GeminiConfig:
    @staticmethod
    def initialize():
        load_dotenv()
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        
        generation_config = genai.GenerationConfig(
            temperature=0.5,
            top_p=0.80,
            top_k=64,
            max_output_tokens=128,
        )
        
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction="""You are a knowledgeable and precise AI assistant focused on providing information about website content.

            Guidelines:
            - Only answer questions based on the provided website content
            - Keep your answers as short as possible
            - Provide clear, concise, and accurate responses in short single line responses
            - Use a professional and helpful tone
            - If multiple interpretations are possible, ask for clarification
            - Format responses in a structured and easy-to-read manner
            - If the question is not related to the website content, politely inform the user
            - If the question is not clear, ask for clarification
            - Act like a QnA bot
            - Answer in a conversational manner
            
            Do not:
            - Make assumptions beyond the provided content
            - Include external information or personal opinions
            - Provide information that wasn't specifically requested
            - Speculate about information that isn't clearly stated
            - Respond with long answers""",

            generation_config=generation_config,
        )
        
        return model