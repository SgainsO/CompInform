from langchain.retrievers.you import YouRetriever
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from fastapi import FastAPI, Query
from typing import Optional
from uvicorn import run
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
from TreeModel import *


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

you_api_key : str
open_api : str

with open('apiKEY.txt', 'r') as file:
    you_api_key = file.readline().strip()

with open('openAPI.txt', 'r') as file:
    open_api = file.readline().strip()

    
os.environ["YDC_API_KEY"] = you_api_key
os.environ["OPENAI_API_KEY"] = open_api


def get_ai_snippets_for_query(query):
    headers = {"X-API-Key": you_api_key}
    params = {"query": query}
    return requests.get(
        f"https://api.ydc-index.io/search?query={query}",
        params=params,
        headers=headers,
    ).json()

yr = YouRetriever()
model = "gpt-3.5-turbo-16k"
qa = RetrievalQA.from_chain_type(llm=ChatOpenAI(model=model), chain_type="stuff", retriever=yr)

@app.get("/")
async def DoNothing():
    return "Connected"


@app.get("/GivePrompt/{prompt}")
async def get_data(prompt):
    x = qa.invoke({prompt})
    print(type(x))
    return x

@app.get("/GM/{Category}/{Budget}")
async def get_stats(Category : int, Budget : int):
    print(calculate(Category, Budget))
    return json.dumps(Calculate(Category, Budget))




run(app, host="0.0.0.0", port= 8000)

