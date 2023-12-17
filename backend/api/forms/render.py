from pydantic import BaseModel
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
import mysql.connector

from fastapi.middleware.cors import CORSMiddleware
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

from typing import Dict


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


class ForgotPassword(BaseModel):
    username: str


@app.post("/login")
def login(user: User, request: Request):
    cursor.execute("select ma_sv, pass_word from sinh_vien")
    data = cursor.fetchall()

    for account in data:
        if user.username == account[0] and user.password == account[1]:
            return True
    return False


@app.post("/forgot_password")
async def forgot_password(request: ForgotPassword):
    # Truy vấn cơ sở dữ liệu để lấy thông tin người dùng dựa trên username (tùy thuộc vào cách bạn cài đặt)
    # Sau đó, bạn có thể tạo mật khẩu mới và lưu vào cơ sở dữ liệu
    # Sau khi tạo mật khẩu mới, gửi email chứa mật khẩu mới đến người dùng

    cursor.execute("select ho_ten, email, pass_word from sinh_vien where ma_sv = " + request.username)
    data = cursor.fetchall()

    if len(data) == 0:
        return False

    # Cấu hình kết nối cho FastMail
    conf = ConnectionConfig(
        MAIL_USERNAME="nguyenvanthang_t66@hus.edu.vn",
        MAIL_PASSWORD="dpsa liaw qhep rnef",
        MAIL_FROM="nguyenvanthang_t66@hus.edu.vn",
        MAIL_PORT=587,
        MAIL_SERVER="smtp.gmail.com",
        MAIL_STARTTLS = True,
        MAIL_SSL_TLS = False,
        USE_CREDENTIALS=True,
        VALIDATE_CERTS=True,
        MAIL_FROM_NAME="Phong Dao Tao DHKHTN",
    )

    # Khởi tạo FastMail
    fastMail = FastMail(conf)

    # Tạo nội dung email
    email_content = f"Dear {data[0][0]}. Your password is: {data[0][2]} <br> Please do not disclose login information to others!"

    # Gửi email
    message = MessageSchema(
        subject="Retrieve Your Higher Education Portal Login Password",
        recipients=[data[0][1]],
        body=email_content,
        subtype=MessageType.html,
    )
    await fastMail.send_message(message)

    return True


    

# Cập nhật các URL cho phù hợp với URL của ứng dụng frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)