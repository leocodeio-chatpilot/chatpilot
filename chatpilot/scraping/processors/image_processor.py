import csv
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

class ImageProcessor:
    def __init__(self, output_folder: str):
        self.output_folder = output_folder
        self.images_file = os.path.join(output_folder, "selenium_output[images].csv")
        self.images_folder = os.path.join(output_folder, "images")
        os.makedirs(self.images_folder, exist_ok=True)
        
    def process(self, soup: BeautifulSoup):
        # Extract and save image information
        images = soup.find_all("img")
        self._save_image_info(images)
        
        # Download images
        self._download_images(images)
        
    def _save_image_info(self, images):
        with open(self.images_file, mode="w", newline="", encoding="utf-8") as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(["Alt text", "Image URL", "Local Path"])
            
            for image in images:
                alt_text = image.get("alt", "")
                src = image.get("src")
                if src and not src.startswith('data:'):
                    local_path = self._get_local_path(src)
                    csv_writer.writerow([alt_text, src, local_path])
                    
    def _download_images(self, images):
        for image in images:
            src = image.get("src")
            if src and not src.startswith('data:'):
                try:
                    local_path = self._get_local_path(src)
                    full_path = os.path.join(self.images_folder, local_path)
                    
                    response = requests.get(src)
                    if response.status_code == 200:
                        with open(full_path, 'wb') as f:
                            f.write(response.content)
                except Exception as e:
                    print(f"Error downloading image {src}: {e}")
                    
    def _get_local_path(self, url: str) -> str:
        """Generate a safe local filename from URL"""
        filename = url.split('/')[-1]
        # Remove query parameters
        filename = filename.split('?')[0]
        # Ensure filename is safe
        filename = "".join(c for c in filename if c.isalnum() or c in '._-')
        return filename or 'image.jpg' 