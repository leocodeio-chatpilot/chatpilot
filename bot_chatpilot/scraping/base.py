from abc import ABC, abstractmethod
from bs4 import BeautifulSoup
from core.driver import WebDriverManager

class BaseScraper(ABC):
    def __init__(self, url: str, website_name: str):
        self.url = url
        self.website_name = website_name
        
    @abstractmethod
    def scrape(self):
        pass
    
    def get_page_content(self):
        with WebDriverManager.get_driver() as driver:
            driver.get(self.url)
            soup = BeautifulSoup(driver.page_source, "html.parser")
            return soup