# have to write
import csv
import os
from bs4 import BeautifulSoup
from selenium import webdriver

def selenium_scrape_text_only(url):
    #To scrape only text from the routes 
    try:
        # Initialize a WebDriver (e.g., Chrome)
        driver = webdriver.Chrome()
        # Navigate to the URL
        driver.get(url)
        # Allow JavaScript to execute
        driver.implicitly_wait(10)  # Wait for up to 10 seconds

        # Extract content using BeautifulSoup or other methods
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        content = soup.get_text()

        # Clean content
        content = content.replace('\u200e', '').replace('\n', '')
        
        driver.quit()

        return content
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None
    
def scrape_text_from_routes(base_url,routes_csv_path,output_file_path):
    # Read routes from CSV file and 
    # scrapes the text by calling selenium-scrape_text_only function
    # stores text extracted in routes.txt file
    try:
        # open the output file --> routes.txt
        with open(output_file_path,'w',encoding='utf-8') as output:
           # open the csv file of routes
           with open(routes_csv_path,mode='r',encoding='utf-8') as file:
               # read the routes which are in the format link text,URL
               csv_reader=csv.reader(file)
               # Ignore the first row which doesn't contain any URL
               next(csv_reader)
               # For each row 
               for route in csv_reader:
                   # To get full URL combine BASE URL with ROUTE URL(This is first column in the csv file)
                   full_url=base_url+route[1]
                   print(f"Scrapping text from:{full_url}")
                   # call the function to scrape text from the URL
                   scrapped_text=selenium_scrape_text_only(full_url)
                   # it returns the text content of the line
                   if scrapped_text:
                       output.write(scrapped_text)
    except Exception as e:
        print(f"Error processing route:{e}")
