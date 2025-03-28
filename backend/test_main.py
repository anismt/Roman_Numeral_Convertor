from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_valid_input():
    response = client.get("/romannumeral?query=10")
    assert response.status_code == 200
    assert response.json() == {"input": "10", "output": "X"}

def test_invalid_input():
    response = client.get("/romannumeral?query=0")
    assert response.status_code == 400
    assert response.text == "Invalid input. Must be between 1 and 3999."
