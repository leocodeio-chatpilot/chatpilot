import csv
import os
from bs4 import BeautifulSoup
from core.driver import WebDriverManager

class RouteProcessor:
    def __init__(self, output_folder: str):
        self.output_folder = output_folder
        self.routes_file = os.path.join(output_folder, "selenium_output[routes].csv")
        
    def process(self, soup: BeautifulSoup):
        # Extract and save links
        links = soup.find_all("a")
        self._save_routes(links)
        
        # Process each route's content
        self._process_route_contents()
        
    def _save_routes(self, links):
        with open(self.routes_file, mode="w", newline="", encoding="utf-8") as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(["Link Text", "URL"])
            for link in links:
                text = link.get_text(strip=True)
                href = link.get("href")
                if href and not href.startswith(('#', 'javascript:', 'mailto:')):
                    csv_writer.writerow([text, href])
                    
    def _process_route_contents(self):
        routes_content_file = os.path.join(self.output_folder, "routes_content.txt")
        
        try:
            with open(self.routes_file, mode='r', encoding='utf-8') as routes_file:
                csv_reader = csv.reader(routes_file)
                next(csv_reader)  # Skip header
                
                with open(routes_content_file, 'w', encoding='utf-8') as output_file:
                    for route in csv_reader:
                        if len(route) >= 2:
                            url = route[1]
                            content = self._scrape_route_content(url)
                            if content:
                                output_file.write(f"URL: {url}\n")
                                output_file.write(f"Content: {content}\n")
                                output_file.write("-" * 80 + "\n")
        except Exception as e:
            print(f"Error processing route contents: {e}")
                                
    def _scrape_route_content(self, url: str) -> str:
        try:
            with WebDriverManager.get_driver() as driver:
                driver.get(url)
                soup = BeautifulSoup(driver.page_source, 'html.parser')
                content = soup.get_text()
                return content.replace('\u200e', '').replace('\n', ' ').strip()
        except Exception as e:
            print(f"Error scraping route {url}: {e}")
            return None 