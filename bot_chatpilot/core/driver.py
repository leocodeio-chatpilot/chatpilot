from selenium import webdriver
from contextlib import contextmanager
from selenium.webdriver.chrome.service import Service
class WebDriverManager:
    @staticmethod
    @contextmanager
    def get_driver():
        service = Service("C:/WebDriver/chromedriver.exe")  
        driver = webdriver.Chrome(service=service)
        try:
            driver.implicitly_wait(10)
            yield driver
        finally:
            driver.quit() 