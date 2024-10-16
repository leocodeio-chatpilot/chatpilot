import datetime
from typing import List
from pydantic import BaseModel

class HistoryItem(BaseModel):
    id: int
    query: str
    timestamp: datetime.datetime

class QueryHistory:
    def __init__(self):
        self.items: List[HistoryItem] = []
        self.counter = 0

    def add_item(self, query: str) -> HistoryItem:
        self.counter += 1
        item = HistoryItem(id=self.counter, query=query, timestamp=datetime.datetime.now())
        self.items.append(item)
        return item

    def get_items(self) -> List[HistoryItem]:
        return self.items

    def get_recent_queries(self, n: int = 5) -> List[str]:
        return [item.query for item in self.items[-n:]]

# Create a global instance of QueryHistory
query_history = QueryHistory()

def get_query_history() -> QueryHistory:
    return query_history