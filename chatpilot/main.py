from typing import List
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from scraping.similarity_search import SimilaritySearch
from scraping.selenium_scraper import SeleniumScraper

from fastapi.openapi.docs import get_swagger_ui_html
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

# Initialize FastAPI app
app = FastAPI(docs_url=None, redoc_url=None)

from fastapi.middleware.cors import CORSMiddleware
import uuid
# Allow requests from frontend server (e.g., Vite on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

# Initialize the similarity search
similarity_search = SimilaritySearch()

# Input model for scraping request
class ScrapeRequest(BaseModel):
    url: str


# Input model for query request
class QueryRequest(BaseModel):
    query_text: str
    api_key: str

class SampleRequest(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

security = HTTPBasic()

def authenticate_user(credentials: HTTPBasicCredentials):
    correct_username = "admin"
    correct_password = "password"
    if credentials.username != correct_username or credentials.password != correct_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect credentials",
            headers={"WWW-Authenticate": "Basic"},
        )

@app.get("/docs")
def get_docs(credentials: HTTPBasicCredentials = Depends(security)):
    authenticate_user(credentials)
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")


@app.post("/scrape/")
def scrape_and_store(scrape_request: ScrapeRequest):
    api_key = uuid.uuid4()
    try:
        SeleniumScraper(
            scrape_request.url, api_key
        ).scrape()
        return api_key
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@app.post("/query/")
def query_content(query_request: QueryRequest):
    try:
        results = similarity_search.query(
            query_request.query_text, 
            query_request.api_key
        )
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sample/")
def sample(sample_request: SampleRequest):
    api_key = uuid.uuid4()
    try:
        SeleniumScraper(
            sample_request.url, api_key
        ).scrape_sample()
        return api_key
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# To run the server
# Use: uvicorn main:app --reload