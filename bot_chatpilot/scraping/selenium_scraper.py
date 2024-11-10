import os
from scraping.base import BaseScraper
from scraping.processors.text_processor import TextProcessor
from scraping.processors.route_processor import RouteProcessor
from scraping.processors.image_processor import ImageProcessor

class SeleniumScraper(BaseScraper):
    def __init__(self, url: str, website_name: str):
        super().__init__(url, website_name)
        self.output_folder = f"./outputs/{website_name}"
        os.makedirs(self.output_folder, exist_ok=True)
        
    def scrape(self):
        try:
            soup = self.get_page_content()
            
            # Process text
            text_processor = TextProcessor(self.website_name, self.output_folder)
            content = text_processor.process(soup)
            
            # Process routes
            # route_processor = RouteProcessor(self.website_name, self.output_folder)
            # route_processor.process(soup)
            
            # Process images
            # image_processor = ImageProcessor(self.website_name, self.output_folder)
            # image_processor.process(soup)
            
            return content

        except Exception as e:
            print(f"Error scraping {self.url}: {e}")
            return None