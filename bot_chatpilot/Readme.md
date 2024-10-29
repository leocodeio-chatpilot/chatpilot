## how to run the app

1. Create an empty folder `.venv` in the root folder (chatpilot)
2. Run:
   ```
   poetry install
   poetry shell
   ```
3. Set up GEMINI_API_KEY in the .env file
   ```
   GEMINI_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Run the FastAPI app:
   ```
   uvicorn main:app --reload
   ```

## Project Structure

- `flows/`: Initial flow diagrams
- `outputs/`: Scraping outputs
- `scrape/`: Selenium scraper
  - `selenium_model.py`: Main scraper
  - `database/`: DB file
  - `preprocess/`: Scripts to process text and update database
  - `similarity_search.py`: Scripts to query the database
- `vector_database/`: Vector database
- `main.py`: Main app
- `.env`: Environment variables
- `Readme.md`: This file

## To contribute

1. Fork the repository
2. Clone your forked repo
3. Make changes or improvements locally
4. Commit and push the changes to your account

## Raising a PR (pull request)

1. Go to your forked repo on GitHub
2. Click on "Contribute" button
3. Click on "Create pull request"
4. Submit the PR for review
