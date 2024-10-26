from typing import List
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from scrape.similarity_search import query_db
from scrape.selenium_scrapper import selenium_scrape_and_save_to_csv
# Initialize FastAPI app
app = FastAPI()


# Input model for scraping request
class ScrapeRequest(BaseModel):
    url: str
    website_name: str


# Input model for query request
class QueryRequest(BaseModel):
    query_text: str
    website_name: str


@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}


# @app.get("/favicon.ico", include_in_schema=False)
# def favicon():
#     return RedirectResponse(url="https://example.com/favicon.ico")


@app.post("/scrape/")
def scrape_and_store(scrape_request: ScrapeRequest):
    try:
        content = selenium_scrape_and_save_to_csv(
            scrape_request.url, scrape_request.website_name
        )
        return {"message": "Scraping successful, content stored.", "content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@app.post("/query/")
def query_content(query_request: QueryRequest):
    results = query_db(query_request.query_text, query_request.website_name)
    return {"results": results}


# To run the server
# Use: uvicorn main:app --reload
