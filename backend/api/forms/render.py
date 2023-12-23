from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
import mysql.connector

from fastapi.middleware.cors import CORSMiddleware
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi import Cookie
import uvicorn


app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")

# templates = Jinja2Templates(directory="")

host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


class User(BaseModel):
    username: str
    password: str


class ForgotPassword(BaseModel):
    username: str


@app.post("/login")
async def login(user: User, response: Response):

    cursor.execute(f"select access_level from user where username = \"{user.username}\" and pass_word = \"{user.password}\"")
    data = cursor.fetchall()

    if len(data) == 1:
        # response = RedirectResponse(url="http://localhost:5173/student")
        response.set_cookie(key="logged_in", value="true")
        response.set_cookie(key="username", value=user.username)
        return {'message':'successful'}
    else:
        raise HTTPException(status_code=401, detail="Đăng nhập không hợp lệ")


@app.post("/forgot_password")
async def forgot_password(request: ForgotPassword):
    # Truy vấn cơ sở dữ liệu để lấy thông tin người dùng dựa trên username (tùy thuộc vào cách bạn cài đặt)
    # Sau đó, bạn có thể tạo mật khẩu mới và lưu vào cơ sở dữ liệu
    # Sau khi tạo mật khẩu mới, gửi email chứa mật khẩu mới đến người dùng

    cursor.execute(f"""
                        select 
                            case 
                                when {request.username} in (select ma_sv from sinh_vien) then (select ho_ten from sinh_vien where ma_sv = {request.username})
                                else (select ho_ten from giang_vien where ma_gv = {request.username})
                            end as ho_ten,
                            email, pass_word from user where username = {request.username}
                   """)

    data = cursor.fetchall()

    ho_ten, email, pass_word = data[0]['ho_ten'], data[0]['email'], data[0]['pass_word']

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
    email_content = f"""
                        <html>
                        <head>
                            <style>
                            body {{
                                font-family: Arial, sans-serif;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #f2f2f2;
                            }}
                            .message {{
                                margin-bottom: 20px;
                                padding: 10px;
                                background-color: #fff;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }}
                            </style>
                        </head>
                        <body>
                            <div class="container">
                            <div class="message">
                                <h2>Dear {ho_ten},</h2>
                                <p>Your password is: {pass_word}</p>
                                <p>Please do not disclose login information to others!</p>
                            </div>
                            </div>
                        </body>
                        </html>
                    """

    # Gửi email
    message = MessageSchema(
        subject="Retrieve Your Higher Education Portal Login Password",
        recipients=[email],
        body=email_content,
        subtype=MessageType.html,
    )
    await fastMail.send_message(message)

    return True


origins = origins = [  
    "*"
]



# Cập nhật các URL cho phù hợp với URL của ứng dụng frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# if __name__ == "__main__":
#     uvicorn.run("render:app", port=8000)