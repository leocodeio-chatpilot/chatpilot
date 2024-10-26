import csv
import os
from bs4 import BeautifulSoup
from selenium import webdriver
from scrape.preprocess.text_processing import process_text


def selenium_scrape_and_save_to_csv(url, website_name):
    """Scrapes a website using Selenium and extracts its content.

    Args:
        url (str): The URL of the website to scrape.
        website_name (str): The name of the website (used for folder naming).

    Returns:
        str: The extracted content of the website.
    """

    try:
        # Initialize a WebDriver (e.g., Chrome)
        driver = webdriver.Chrome()
        # Navigate to the URL
        driver.get(url)
        # Allow JavaScript to execute
        driver.implicitly_wait(10)  # Wait for up to 10 seconds

        # Extract content using BeautifulSoup or other methods
        soup = BeautifulSoup(driver.page_source, "html.parser")
        content = soup.get_text()

        # Clean content
        content = content.replace("\u200e", "").replace("\n", "")
        print(content)

        # Create website-specific output folder
        output_folder = f"./outputs/{website_name}"
        os.makedirs(output_folder, exist_ok=True)

        # Paths for saving files
        text_output_path = os.path.join(output_folder, "selenium_output.txt")
        routes_output_path = os.path.join(output_folder, "selenium_output[routes].csv")
        images_output_path = os.path.join(output_folder, "selenium_output[images].csv")

        # Write the content to a file
        with open(text_output_path, "w", encoding="utf-8") as file:
            file.write(content)  # Write content
            process_text(content, website_name)  # Process content with website_name

        # Extract and save links
        links = soup.find_all("a")
        with open(routes_output_path, mode="w", newline="", encoding="utf-8") as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(["Link Text", "URL"])
            for link in links:
                text = link.get_text(strip=True)
                href = link.get("href")
                csv_writer.writerow([text, href])

        # Extract and save images
        images = soup.find_all("img")
        with open(images_output_path, mode="w", newline="", encoding="utf-8") as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(["Alt text", "Image URLs"])
            for image in images:
                alt_text = image.get("alt", "")
                src = image.get("src")
                csv_writer.writerow([alt_text, src])

        # Close the WebDriver
        driver.quit()

        return content

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None


# url = "https://www.apple.com/"
# url = "https://www.youtube.com/results?search_query=ai"
# content = selenium_scrape_and_save_to_csv(url)
# print(content)
