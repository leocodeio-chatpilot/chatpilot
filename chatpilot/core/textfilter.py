import nltk
import re
from nltk.corpus import stopwords
import os

class TextFilter:
    def __init__(self):
        # Set NLTK data path to a specific location in your project
        nltk_data_dir = os.path.join(os.path.dirname(__file__), '..', 'nltk_data')
        os.makedirs(nltk_data_dir, exist_ok=True)
        nltk.data.path.append(nltk_data_dir)

        # Download required NLTK data explicitly
        self._download_nltk_data()
        
        # Initialize stopwords after ensuring downloads
        self.stop_words = set(stopwords.words('english'))
    
    def _download_nltk_data(self):
        """Download required NLTK data packages"""
        try:
            nltk.download('stopwords', download_dir=nltk.data.path[0])
        except Exception as e:
            print(f"Error downloading NLTK data: {str(e)}")
            # Fallback: try downloading to default location
            nltk.download('stopwords')

    def filter(self, text: str) -> str:
        """
        Clean and transform text for QA purposes
        
        Args:
            text (str): Input text to be cleaned
            
        Returns:
            str: Cleaned and formatted text
        """
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and extra whitespace
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Simple word tokenization using split()
        words = text.split()
        
        # Remove stopwords
        filtered_text = [word for word in words if word not in self.stop_words]
        # Join the words back together
        return ' '.join(filtered_text)