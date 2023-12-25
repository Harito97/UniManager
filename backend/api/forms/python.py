from fastapi import FastAPI
from starlette.testclient import TestClient

app = FastAPI()

app.counter = 0


@app.get("/increment")
async def increment():
    a = "21002500"
    app.counter = a


@app.get("/status")
def read_status():
    return app.counter


client = TestClient(app)

print(client.get("/status").content.decode('utf-8'))
client.get("/increment")
print(client.get("/status").content)
client.get("/increment")
print(client.get("/status").content)
"""
b'0'
b'1'
b'2'
"""