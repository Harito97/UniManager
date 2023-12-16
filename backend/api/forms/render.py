from pydantic import BaseModel
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
import mysql.connector

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")

# templates = Jinja2Templates(directory="")

host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor()


class User(BaseModel):
    username: str
    password: str


@app.post("/login")
def login(user: User, request: Request):
    cursor.execute("select ma_sv, pass_word from sinh_vien")
    data = cursor.fetchall()

    for account in data:
        if user.username == account[0] and user.password == account[1]:
            return True
    return False


    

# Cập nhật các URL cho phù hợp với URL của ứng dụng frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)