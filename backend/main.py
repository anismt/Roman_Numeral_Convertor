from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)

import logging
logging.basicConfig(level=logging.INFO)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse

app = FastAPI()

# Allow React frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with actual domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def to_roman(num: int) -> str:
    if num < 1 or num > 3999:
        return None
    roman_map = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")
    ]
    result = ""
    for value, symbol in roman_map:
        while num >= value:
            result += symbol
            num -= value
    return result

@app.get("/romannumeral")
async def convert(query: int):
    if query < 1 or query > 3999:
        return JSONResponse(status_code=400, content="Invalid input. Must be between 1 and 3999.")
    return {"input": str(query), "output": to_roman(query)}
