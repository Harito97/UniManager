import random
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from fastapi import FastAPI, Request, Response, Depends, HTTPException, status
from fastapi.responses import FileResponse
import mysql.connector
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import uvicorn
import bcrypt
import jwt
import string
import secrets
import json
import base64
import os
import glob

app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")

# templates = Jinja2Templates(directory="")

host = "localhost"
user = "root"
database = "csdl_web"
ALGORITHM = 'HS256'
SECRET_KEY = '3662c8e331272168e4eadb96ab89f9f7551a6df8856fe2d07092cec36c32b5b0'
ACCESS_TOKEN_EXPIRE_MINUTES = 30
db_status = False

try:
    conn = mysql.connector.connect(
        host=host,
        user=user,
        database=database
    )

    cursor = conn.cursor(dictionary=True)
    db_status = True

except Exception as e:
    print("Lỗi: ", e)


class UserInfo(BaseModel):
    username: str
    password: str


class ForgotPassword(BaseModel):
    username: str


class User(BaseModel):
    username: str


class UserSemester(BaseModel):
    username: str
    ma_hk: int


class Class(BaseModel):
    ma_lh: int


class DANGKY(BaseModel):
    ma_lh: int | None = None


class COEFFICIENT(BaseModel):
    ma_lh: int | None = None
    he_so_tx: float | None = None
    he_so_gk: float | None = None
    he_so_ck: float | None = None


class ID(BaseModel):
    id: int | None = None


class AVATAR(BaseModel):
    avatar: str | None = None


class UPDATEINFO(BaseModel):
    sdt: str | None = None
    email: str | None = None


class UPDATEPASSWORD(BaseModel):
    current_pass: str | None = None
    new_pass: str | None = None


class CONTENT(BaseModel):
    email: str | None = None
    title: str | None = None
    content: str | None = None


year_current = datetime.now().year


def getTime():
    if datetime(year_current, 8, 1) <= datetime.now() <= datetime(year_current, 12, 31):
        return {"semester": "1", "year": str(year_current)}
    elif datetime(year_current, 1, 1) <= datetime.now() <= datetime(year_current, 2, 15):
        return {"semester": "1", "year": str(year_current-1)}
    else:
        return {"semester": "2", "year": str(year_current-1)}


def subject(data):
    max_he4_dict = {}

    for item in data:
        ma_hp = item["ma_hp"]
        he4 = item["he4"]

        if ma_hp not in max_he4_dict or he4 > max_he4_dict[ma_hp]["he4"]:
            max_he4_dict[ma_hp] = {"ma_hp": ma_hp,
                                   "he4": he4, "so_tin": item["so_tin"]}

    result = list(max_he4_dict.values())
    return result


def generate_random_password(length=8):
    # Chuỗi ký tự cho mật khẩu
    characters = string.ascii_letters + string.digits

    # Tạo mật khẩu ngẫu nhiên
    password = ''.join(secrets.choice(characters) for _ in range(length))

    return password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode("utf-8"), bytes(hashed_password))


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str


class UserInfor(BaseModel):
    username: str
    access_level: str


class UserInDB(UserInfor):
    pass_word: bytes


def get_user(username: str):
    cursor.execute(
        "select * from user where username = \"{}\"".format(username))
    data = cursor.fetchall()
    if len(data) > 0:
        user_dict = data[0]
        return UserInDB(**user_dict)


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.pass_word):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except Exception as e:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    # if current_user.disabled:
    #     raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", response_model=UserInfor)
async def read_users_me(
    current_user: Annotated[UserInfor, Depends(get_current_active_user)]
):
    return current_user

# @app.get("/")
# async def verifyUser(request: Request):
#     if "token" in request.cookies:
#         token = request.cookies["token"]
#         decoded = jwt.decode(token, SECRET_KEY, algorithms=[
#                              ALGORITHM])
#         return {"Status": True, "decoded": decoded}
#     else:
#         return {"Status": False, "Error": "Bạn chưa đăng nhập"}


# @app.post("/login")
# async def login(user: UserInfo, response: Response):
#     if not db_status:
#         return {"Status": False, "Error": "Không thể kết nối với CSDL"}
#     try:
#         cursor.execute(
#             "select * from user where username = \"{}\"".format(user.username))
#         data = cursor.fetchall()
#         if (len(data) > 0):
#             pwd_bytes = user.password.encode('utf-8')
#             check_pwd = bcrypt.checkpw(pwd_bytes, bytes(data[0]["pass_word"]))
#             if (check_pwd):
#                 print({"username": data[0]["username"],
#                       "access_level": data[0]["access_level"]})
#                 token = jwt.encode({"username": data[0]["username"], "access_level": data[0]
#                                    ["access_level"]}, SECRET_KEY, algorithm=ALGORITHM)
#                 response.set_cookie(key="token", value=token, httponly=True)
#                 return {"Status": True, "level": data[0]["access_level"]}
#             else:
#                 return {"Status": False, "Error": "Mật khẩu không chính xác"}
#         else:
#             return {"Status": False, "Error": f"Không tồn tại username {user.username}"}
#     except Exception as e:
#         return {"Error": e}


@app.post("/forgot_password")
async def forgotPassword(request: ForgotPassword):
    # Truy vấn cơ sở dữ liệu để lấy thông tin người dùng dựa trên username (tùy thuộc vào cách bạn cài đặt)
    # Sau đó, bạn có thể tạo mật khẩu mới và lưu vào cơ sở dữ liệu
    # Sau khi tạo mật khẩu mới, gửi email chứa mật khẩu mới đến người dùng
    cursor.execute(f"""
                        select 
                            case 
                                when {request.username} in (select ma_sv from sinh_vien) then (select ho_ten from sinh_vien where ma_sv = {request.username})
                                else (select ho_ten from giang_vien where ma_gv = {request.username})
                            end as ho_ten,
                            email from user where username = {request.username}
                   """)

    data = cursor.fetchall()

    if len(data) == 0:
        return False

    ho_ten, email = data[0]['ho_ten'], data[0]['email']
    pass_word = generate_random_password()

    cursor.execute(f"UPDATE user SET pass_word = %s WHERE username = %s",
                   (bcrypt.hashpw(pass_word.encode(), bcrypt.gensalt()), request.username))
    conn.commit()

    # Cấu hình kết nối cho FastMail
    conf = ConnectionConfig(
        MAIL_USERNAME="imlda1053@gmail.com",
        MAIL_PASSWORD="",
        MAIL_FROM="imlda1053@gmail.com",
        MAIL_PORT=587,
        MAIL_SERVER="smtp.gmail.com",
        MAIL_STARTTLS=True,
        MAIL_SSL_TLS=False,
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


@app.get("/semester_year_current")
async def getCurrent(request: Request):
    cursor.execute("""select ma_hk 
                   from hoc_ki
                   where ng_bat_dau <= NOW() and ng_ket_thuc >= NOW()""")
    data = cursor.fetchall()
    if len(data) == 0:
        return {"Status": False}
    else:
        return {"Status": True, "current": data[0]}


@app.get("/current_registration")
async def currentPeriod():
    cursor.execute("""select dot, ma_hk 
                   from dot_dki
                   where ng_bat_dau <= NOW() and ng_ket_thuc >= NOW()""")

    data = cursor.fetchall()
    if len(data) == 0:
        return {"Status": False}
    else:
        return {"Status": True, "current": data[0]}


@app.get("/overview")
async def sendOverView(current_user: Annotated[UserInfor, Depends(get_current_active_user)]):

    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    cursor.execute(f"""select sum(hp.so_tin) as tin
                   from hoc_phan hp, lich_hoc lh, dang_ky dk
                   where dk.diem_ck is not null and ma_sv = {current_user.username} and dk.ma_lh = lh.ma_lh and lh.ma_hp = hp.ma_hp""")

    tong_so_tin = cursor.fetchall()[0]["tin"]

    cursor.execute(f"""select sum(subquery.so_tin) as so_tin from (select distinct(lh.ma_hp), hp.so_tin
                   from hoc_phan hp, lich_hoc lh, dang_ky dk
                   where dk.diem_ck is not null and ma_sv = {current_user.username} and dk.ma_lh = lh.ma_lh and lh.ma_hp = hp.ma_hp and 
                         dk.diem_tx * lh.he_so_tx + dk.diem_gk * lh.he_so_gk + dk.diem_ck * lh.he_so_ck >= 4) as subquery
                   """)

    tong_so_tin_tich_luy = cursor.fetchall()[0]["so_tin"]

    cursor.execute(f"""
                    with dk as (
                        select dk.ma_lh, dk.diem_tx * lh.he_so_tx + dk.diem_gk * lh.he_so_gk + dk.diem_ck * lh.he_so_ck as total_score
                        from dang_ky dk, lich_hoc lh
                        where ma_sv = {current_user.username} and lh.ma_lh = dk.ma_lh
                    )

                    select subquery.ma_hp, subquery.he4, subquery.so_tin
                    from (
                        select 
                            hp.ma_hp as ma_hp,
                            hp.so_tin as so_tin,
                            case
                                when dk.total_score < 4.0 then 0
                                when dk.total_score <= 4.9 then 1
                                when dk.total_score <= 5.4 then 1.5
                                when dk.total_score <= 6.4 then 2
                                when dk.total_score <= 6.9 then 2.5
                                when dk.total_score <= 7.9 then 3
                                when dk.total_score <= 8.4 then 3.5
                                when dk.total_score <= 8.9 then 3.7
                                else 4
                            end as he4
                        from
                            hoc_phan hp, dk, hoc_ki hk, lich_hoc lh, dang_ky
                        where dang_ky.diem_ck is not null and dk.total_score >= 4 and lh.ma_hp = hp.ma_hp and dang_ky.ma_lh = lh.ma_lh and dk.ma_lh = dang_ky.ma_lh
                        group by lh.ma_lh
                    ) as subquery;""")

    data = subject(cursor.fetchall())

    numerator = 0
    denominator = 0

    for element in data:
        numerator += element["he4"]*element["so_tin"]
        denominator += element["so_tin"]

    try:
        gpa = round(numerator/denominator, 2)
    except Exception as e:
        gpa = 0.0

    if tong_so_tin is None:
        tong_so_tin = 0
    if tong_so_tin_tich_luy is None:
        tong_so_tin_tich_luy = 0
    # đang làm dở

    return {"tong_so_tin": tong_so_tin, "tong_so_tin_tich_luy": tong_so_tin_tich_luy, "gpa": gpa}


@app.get("/grade")
async def sendGrade(current_user: Annotated[UserInfor, Depends(get_current_active_user)]):

    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    current_year = datetime.now().year

    cursor.execute(
        f"select nam_bat_dau from sinh_vien where ma_sv = {current_user.username}")
    nam_bat_dau = cursor.fetchall()[0]["nam_bat_dau"]

    data_component_grade = []

    for year in range(nam_bat_dau, current_year+1):

        data_year = []

        for semester in range(1, 3):

            statement = f"""
                            select lh.ma_hp, 1 as "so_lan_hoc", lh.he_so_ck, dk.diem_ck, lh.he_so_gk, dk.diem_gk, lh.he_so_tx, dk.diem_tx
                            from hoc_phan hp, lich_hoc lh, dang_ky dk, hoc_ki hk
                            where dk.diem_ck is not null and lh.ma_hp = hp.ma_hp and dk.ma_lh = lh.ma_lh and lh.ma_hk = hk.ma_hk and dk.ma_sv = {current_user.username} and 
                                hk.ma_hk in (select hk.ma_hk WHERE (select RIGHT(cast(hk.ma_hk as char), 1)) = \"{semester}\" and  
                                (select concat("20", LEFT(cast(hk.ma_hk as char), 2))) = \"{year}\")
                            group by lh.ma_lh;
                        """

            cursor.execute(statement)
            data = cursor.fetchall()
            data_year.append(data)

        data_component_grade.append(data_year)

    counter = {}  # Dùng để theo dõi số lần xuất hiện của mỗi môn học

    for year in data_component_grade:
        for semester in year:
            for object in semester:
                if object["ma_hp"] not in counter:
                    counter[object["ma_hp"]] = 1
                else:
                    counter[object["ma_hp"]] += 1
                object["so_lan_hoc"] = counter[object["ma_hp"]]

    data_expand = []

    for year in data_component_grade:
        list_semesters = []
        for semester in year:
            list_objects = []
            for object in semester:
                list_objects.append([{"type": "Thi cuối kì", "he_so": object["he_so_ck"], "lan": object["so_lan_hoc"], "diem": object["diem_ck"]},
                                     {"type": "Giữa kì", "he_so": object["he_so_gk"],
                                         "lan": object["so_lan_hoc"], "diem": object["diem_gk"]},
                                     {"type": "Thường xuyên", "he_so": object["he_so_tx"], "lan": object["so_lan_hoc"], "diem": object["diem_tx"]}])
            list_semesters.append(list_objects)
        data_expand.append(list_semesters)

    data_sum_grade = []

    for year in range(nam_bat_dau, current_year+1):

        data_year = []

        for semester in range(1, 3):

            statement = f"""
                            with dk as (
                            select dk.ma_lh, dk.diem_tx * lh.he_so_tx + dk.diem_gk * lh.he_so_gk + dk.diem_ck * lh.he_so_ck as total_score
                            from dang_ky dk, lich_hoc lh
                            where ma_sv = {current_user.username} and dk.ma_lh = lh.ma_lh
                            )
                            select 
                                lh.ma_hp,
                                hp.ten_hp,
                                hp.so_tin,
                                dk.total_score as he10,
                                case
                                    when dk.total_score < 4.0 then 'F'
                                    when dk.total_score <= 4.9 then 'D'
                                    when dk.total_score <= 5.4 then 'D+'
                                    when dk.total_score <= 6.4 then 'C'
                                    when dk.total_score <= 6.9 then 'C+'
                                    when dk.total_score <= 7.9 then 'B'
                                    when dk.total_score <= 8.4 then 'B+'
                                    when dk.total_score <= 8.9 then 'A'
                                    else 'A+'
                                end as diem,
                                case
                                    when dk.total_score < 4.0 then 0
                                    when dk.total_score <= 4.9 then 1
                                    when dk.total_score <= 5.4 then 1.5
                                    when dk.total_score <= 6.4 then 2
                                    when dk.total_score <= 6.9 then 2.5
                                    when dk.total_score <= 7.9 then 3
                                    when dk.total_score <= 8.4 then 3.5
                                    when dk.total_score <= 8.9 then 3.7
                                    else 4
                                end as he4
                            from
                                hoc_phan hp, lich_hoc lh, dk, hoc_ki hk, dang_ky
                            where dang_ky.diem_ck is not null and lh.ma_hp = hp.ma_hp and dang_ky.ma_lh = lh.ma_lh and lh.ma_hk = hk.ma_hk and dang_ky.ma_lh = dk.ma_lh and dang_ky.ma_sv = {current_user.username} and
                                hk.ma_hk in (select hk.ma_hk WHERE (select RIGHT(cast(hk.ma_hk as char), 1)) = \"{semester}\" and  
                                (select concat("20", LEFT(cast(hk.ma_hk as char), 2))) = \"{year}\");
                        """

            cursor.execute(statement)
            data_semester = cursor.fetchall()

            for element in data_semester:
                element['he10'] = round(element['he10'], 1)

            data_year.append(data_semester)

        data_sum_grade.append(data_year)

    nam = 0

    for year in data_sum_grade:
        ki = 0
        for semester in year:
            mon = 0
            for object in semester:
                object["expand"] = data_expand[nam][ki][mon]
                mon += 1
            ki += 1
        nam += 1

    data = []

    for year in range(nam_bat_dau, current_year+1):
        for semester in range(1, 3):
            if len(data_sum_grade[year-2021][semester-1]) == 0:
                break
            data.append({"ki": semester, "nam": year,
                        "data": data_sum_grade[year-nam_bat_dau][semester-1]})

    return {"data": data}


@app.get("/subject_learned/{ma_hk}")
async def sendSubjectLearned(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int):

    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    statement = f"""
                    select 
                        lh.ma_lh as "ma_lh",
                        lh.ma_hp as "ma_hp"
                    from 
                        lich_hoc lh, dang_ky dk
                    where dk.ma_sv = {current_user.username} and dk.ma_lh = lh.ma_lh and lh.ma_hk != {ma_hk}

                """
    cursor.execute(statement)
    data = cursor.fetchall()
    return {"subjectLearned": data}


@app.get("/subject_all/{ma_hk}")
async def sendSubject(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    statement = f"""
                    select
                        lh.ma_lh as "ma_lh",
                        hp.ten_hp as "ten_hp",
                        lh.ma_hp as "ma_hp",
                        lh.ma_lop as "ma_lop",
                        hp.so_tin as "so_tin",
                        lh.so_luong as "so_sv",
                        (
                            select count(*) 
                            from dang_ky dk 
                            where dk.ma_lh = lh.ma_lh
                        ) as "da_dk",
                        group_concat(gv.ho_ten) as "ten_gv",
                        lh.thoi_gian as "lich_hoc",
                        case
                            when lh.ma_hp in (select lh.ma_hp from lich_hoc lh, dang_ky dk where dk.ma_sv = {current_user.username} and dk.ma_lh = lh.ma_lh) then true
                            else false
                        end as "disabled"
                    from
                        lich_hoc lh
                        inner join hoc_phan hp on lh.ma_hp = hp.ma_hp
                        inner join lh_gv on lh.ma_lh = lh_gv.ma_lh
                        inner join giang_vien gv on lh_gv.ma_gv = gv.ma_gv
                    where lh.ma_hk = {ma_hk} 
                    group by lh.ma_lh, hp.ten_hp, lh.ma_hp, lh.ma_lop, hp.so_tin, lh.so_luong, lh.thoi_gian
                    order by
                        hp.ten_hp;
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    for subject in data:
        # unicode_data = subject["lich_hoc"].decode('utf-8')
        subject["lich_hoc"] = json.loads(subject["lich_hoc"])
        subject["ten_gv"] = [gv for gv in subject["ten_gv"].split(",")]

    return {"dataAll": data}


@app.get("/subject_major/{ma_hk}")
async def sendSubjectMajor(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int):

    statement = f"""
                    select
                        lh.ma_lh as "ma_lh",
                        hp.ten_hp as "ten_hp",
                        lh.ma_hp as "ma_hp",
                        lh.ma_lop as "ma_lop",
                        hp.so_tin as "so_tin",
                        lh.so_luong as "so_sv",
                        (
                            select count(*) 
                            from dang_ky dk 
                            where dk.ma_lh = lh.ma_lh
                        ) as "da_dk",
                        group_concat(gv.ho_ten) as "ten_gv",
                        lh.thoi_gian as "lich_hoc",
                        case
                            when lh.ma_hp in (select lh.ma_hp from lich_hoc lh, dang_ky dk where dk.ma_sv = {current_user.username} and dk.ma_lh = lh.ma_lh) then true
                            else false
                        end as "da_hoc"
                    from
                        lich_hoc lh
                        inner join hoc_phan hp on lh.ma_hp = hp.ma_hp
                        inner join lh_gv on lh.ma_lh = lh_gv.ma_lh
                        inner join giang_vien gv on lh_gv.ma_gv = gv.ma_gv
                        inner join chuong_trinh_hoc cth on cth.ma_hp = lh.ma_hp
                        inner join sinh_vien sv on sv.ma_nganh = cth.ma_nganh
                    where sv.ma_sv = {current_user.username} and lh.ma_hk = {ma_hk}
                    group by lh.ma_lh, hp.ten_hp, lh.ma_hp, lh.ma_lop, hp.so_tin, lh.so_luong, lh.thoi_gian
                    order by
                        hp.ten_hp;
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    for subject in data:
        subject["lich_hoc"] = json.loads(subject["lich_hoc"])
        subject["ten_gv"] = [gv for gv in subject["ten_gv"].split(",")]

    return {"dataMajor": data}


@app.get("/registered_subject/{ma_hk}")
async def registeredSubject(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int):

    statement = f"""
                    select  
                        lh.ma_lh as "ma_lh",
                        hp.ten_hp as "ten_hp",
                        hp.so_tin as "so_tin",
                        lh.ma_hp as "ma_hp",
                        lh.ma_lop as "ma_lop",
                        group_concat(gv.ho_ten) as "ten_gv",
                        lh.thoi_gian as "lich_hoc",
                        (select count(*) from dang_ky dk2, lich_hoc lh2 where dk2.ma_lh = lh2.ma_lh and lh2.ma_hp = lh.ma_hp and dk2.ma_sv = "21002500") as "lan"

                    from 
                        lich_hoc lh
                        inner join hoc_phan hp on hp.ma_hp = lh.ma_hp
                        inner join lh_gv on lh.ma_lh = lh_gv.ma_lh
                        inner join giang_vien gv on lh_gv.ma_gv = gv.ma_gv
                        inner join dang_ky dk on dk.ma_lh = lh.ma_lh

                    where dk.ma_sv = {current_user.username} and dk.diem_tx is null and lh.ma_hk = {ma_hk}
                    group by hp.ten_hp, hp.so_tin, lh.ma_hp, lh.ma_lop, lh.thoi_gian
                    order by 
                        hp.ten_hp asc;
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    for subject in data:
        # unicode_data = subject["lich_hoc"]
        subject["lich_hoc"] = json.loads(subject["lich_hoc"])
        subject["ten_gv"] = [gv for gv in subject["ten_gv"].split(",")]

    return {"subjectRegister": data}


@app.get("/teaching_schedule/{ma_hk}")
async def sendSchedule(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int):
    if current_user.access_level != "GV":
        return {"detail": "You are not authorized to access this."}

    statement = f"""
                    select 
                        lh.ma_lh as "ma_lh",
                        hp.ten_hp as "ten_hp",
                        lh.ma_hp as "ma_hp",
                        lh.ma_lop as "ma_lop",
                        lh.ma_hk as "ma_hk",
                        (
                            select count(*) 
                            from dang_ky dk 
                            where dk.ma_lh = lh.ma_lh
                        ) as "da_dk",
                        lh.thoi_gian as "lich_hoc"
                    
                    from 
                        lich_hoc lh
                        inner join hoc_phan hp on hp.ma_hp = lh.ma_hp
                        inner join lh_gv on lh.ma_lh = lh_gv.ma_lh
                        inner join giang_vien gv on lh_gv.ma_gv = gv.ma_gv
                    where gv.ma_gv = {current_user.username} and lh.ma_hk = {ma_hk}
                    group by lh.ma_hp
                    order by hp.ten_hp;
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    for subject in data:
        unicode_data = subject["lich_hoc"]
        subject["lich_hoc"] = json.loads(unicode_data)

    return {"schedule": data}


@app.get("/student_class/{ma_lh}")
async def sendStudentClass(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_lh: int):

    if current_user.access_level == "SV":
        return {"detail": "You are not authorized to access this."}

    statement = f"""
                    select 
                        dk.ma_sv as "ma_sv",
                        sv.ho_ten as "ho_ten",
                        dk.diem_tx as "diem_tx",
                        dk.diem_gk as "diem_gk",
                        dk.diem_ck as "diem_ck"
                    from 
                        lich_hoc lh
                        inner join dang_ky dk on dk.ma_lh = lh.ma_lh
                        inner join hoc_phan hp on hp.ma_hp = lh.ma_hp
                        inner join sinh_vien sv on dk.ma_sv = sv.ma_sv
                    where dk.ma_lh = {ma_lh}
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    return {"studentClass": data}


@app.get("/coefficient_subject/{ma_lh}")
async def sendCoefficient(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_lh: int):

    if current_user.access_level == "SV":
        return {"detail": "You are not authorized to access this."}

    statement = f"""
                    select 
                        lh.he_so_tx as "he_so_tx",
                        lh.he_so_gk as "he_so_gk",
                        lh.he_so_ck as "he_so_ck"
                    from 
                        lich_hoc lh
                    where lh.ma_lh = {ma_lh}
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    return {"coefficient": data[0]}


@app.get("/guide")
async def sendGuide():

    # ma_hk = str(getTime()["year"])[-2:] + str(getTime()["semester"])

    cursor.execute(
        f"select dot as dot, ma_hk as ma_hk, date_format(ng_bat_dau, '%d-%m-%Y') as time_start, date_format(ng_ket_thuc, '%d-%m-%Y') as time_end from dot_dki where ng_bat_dau >= NOW() OR (ng_bat_dau < NOW() AND ng_ket_thuc >= NOW())")
    data = cursor.fetchall()

    return {"guide": data}


# POST: create a new record for a table
@app.post("/post_dangky")
async def create_records(current_user: Annotated[UserInfor, Depends(get_current_active_user)], newRecord: DANGKY):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    try:
        cursor.execute("""insert into dang_ky(ma_lh, ma_sv, diem_tx, diem_gk, diem_ck)
                          values (%s, %s, NULL, NULL, NULL)""", (newRecord.ma_lh,
                                                                 current_user.username))

        conn.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e


# DELETE: delete record
@app.delete("/delete_dangky/{ma_lh}")
async def delete_record(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_lh: int):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    try:
        cursor.execute(
            "select * from dang_ky where ma_lh = %s and ma_sv = %s", (ma_lh, current_user.username))
        deleted_record = cursor.fetchall()

        cursor.execute(
            "delete from dang_ky where ma_lh = %s and ma_sv = %s", (ma_lh, current_user.username))
        conn.commit()

        return {"message": f"Record with ID {ma_lh, current_user.username} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e


# PUT: update record infomation
@app.put("/put_coefficient/")
async def update_record(current_user: Annotated[UserInfor, Depends(get_current_active_user)], coeffiecient: COEFFICIENT):
    if current_user.access_level == "SV":
        return {"detail": "You are not authorized to access this."}

    try:
        cursor.execute("""update lich_hoc set he_so_tx = %s, he_so_gk = %s, he_so_ck = %s where ma_lh = %s""", (
            coeffiecient.he_so_tx,
            coeffiecient.he_so_gk,
            coeffiecient.he_so_ck,
            coeffiecient.ma_lh))

        conn.commit()
        return {"message": "Record updated successfully", "Status": True}
    except Exception as e:
        print(e)
        return {"Status": False}


class StudentGrade(BaseModel):
    ma_lh: int | None = None
    ma_sv: str | None = None
    diem_tx: float | None = None
    # he_so_tx: float | None = None
    diem_gk: float | None = None
    # he_so_gk: float | None = None
    diem_ck: float | None = None
    # he_so_ck: float | None = None

# PUT: update record infomation


@app.put("/put_dangky/")
async def update_record(current_user: Annotated[UserInfor, Depends(get_current_active_user)], newRecord: StudentGrade):
    if current_user.access_level == "SV":
        return {"detail": "You are not authorized to access this."}

    # try:
    cursor.execute("""update dang_ky set diem_tx = %s, diem_gk = %s,
                        diem_ck = %s where ma_lh = %s and ma_sv = %s""", (newRecord.diem_tx,
                                                                          newRecord.diem_gk,
                                                                          newRecord.diem_ck,
                                                                          newRecord.ma_lh,
                                                                          newRecord.ma_sv))

    conn.commit()
    return {"message": "Record updated successfully", "Status": True}
    # except Exception as e:
    #     return {"Status": False}


@app.post("/download")
async def download(id: ID):

    cursor.execute(f"select name, file from form where id = {id.id}")
    result = cursor.fetchall()

    file_data = result[0]["file"]

    ten = result[0]['name'].split(".")

    if os.path.exists(rf"D:\{result[0]['name']}"):
        file_list = glob.glob(f'D:\\{ten[0]}*')
        temp_file_path = f"D:\{ten[0]} ({str(len(file_list))}).{ten[1]}"
    else:
        temp_file_path = f"D:\{result[0]['name']}"

    with open(temp_file_path, "wb") as temp_file:
        temp_file.write(base64.b64decode(file_data))

# TODO: Sửa lại ma_hk


@app.get("/schedule_exam")
async def sendScheduleExam(current_user: Annotated[UserInfor, Depends(get_current_active_user)]):

    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    statement = f"""
                    select lh.ma_hk, lh.ma_hp, hp.ten_hp, lh.ma_lop, lh.lich_thi
                    from 
                        lich_hoc lh
                        inner join hoc_ki hk on hk.ma_hk = lh.ma_hk
                        inner join hoc_phan hp on hp.ma_hp = lh.ma_hp
                        inner join dang_ky dk on dk.ma_lh = lh.ma_lh
                    where 
                        lh.ma_hk = {int(getTime()["year"][-2:] + getTime()["semester"])} 
                        and dk.ma_sv = {current_user.username} 
                        and dk.diem_tx is null
                    
                """
    cursor.execute(statement)
    data = cursor.fetchall()
    return_data = []

    for schedule in data:
        try:
            unicode_data = schedule["lich_thi"]
            schedule["lich_thi"] = json.loads(unicode_data)
            return_data.append(schedule)
        except Exception as e:
            pass

    return {"exam": return_data}


@app.get("/info_student")
async def sendInfoStudent(current_user: Annotated[UserInfor, Depends(get_current_active_user)]):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    statement = f"""
                    select
                        sv.ho_ten, sv.gioi_tinh, date_format(sv.ngsinh, '%d/%m/%Y') as ngsinh, sv.sdt, user.email, nganh.ten_nganh as nganh, sv.lop, user.avatar
                    from 
                        sinh_vien sv
                        inner join user on user.username = sv.ma_sv
                        inner join nganh on nganh.ma_nganh = sv.ma_nganh
                    where 
                        sv.ma_sv = {current_user.username}
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    return {"info": data[0]}


# @app.post("/get_avatar")
# async def sendInfoStudent(user: User):

#     statement = f"""
#                     select
#                         user.avatar
#                     from
#                         sinh_vien sv
#                         inner join user on user.username = sv.ma_sv
#                     where
#                         sv.ma_sv = {user.username}
#                 """

#     cursor.execute(statement)
#     data = cursor.fetchall()

#     return {"avatar": data[0]["avatar"]}


# PUT: update record infomation
@app.put("/put_image")
async def update_record(current_user: Annotated[UserInfor, Depends(get_current_active_user)], image: AVATAR):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    try:
        cursor.execute("""update user set avatar = %s
                          where username = %s""", (
            image.avatar,
            current_user.username
        ))

        conn.commit()
        return {"message": "Record updated successfully", "Record": image}
    except Exception as e:
        return e


# DELETE: delete record
@app.delete("/delete_avatar")
async def delete_record(current_user: Annotated[UserInfor, Depends(get_current_active_user)],):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}
    try:
        cursor.execute(
            "update user set avatar = null where username = %s", (current_user.username,))
        conn.commit()

        return {"message": f"Record image with ID {current_user.username} has been deleted"}
    except Exception as e:
        return e


@app.put("/put_info_student")
async def updateInfoStudent(current_user: Annotated[UserInfor, Depends(get_current_active_user)], record: UPDATEINFO):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}
    try:

        cursor.execute(
            f"update sinh_vien set sdt = \"{record.sdt}\" where ma_sv = {current_user.username};")
        conn.commit()
        cursor.execute(
            f"update user set email = \"{record.email}\" where username = {current_user.username};")
        conn.commit()

        return {"message": "Record updated successfully", "Status": True}

    except Exception as e:
        return {"Status": False, "message": e}


@app.put("/change_pass")
async def changePassWord(current_user: Annotated[UserInfor, Depends(get_current_active_user)], info: UPDATEPASSWORD):
    try:
        cursor.execute(
            f"select pass_word from user where username = {current_user.username}")
        data = cursor.fetchall()
        if (len(data) > 0):
            pwd_bytes = info.current_pass.encode('utf-8')
            check_pwd = bcrypt.checkpw(pwd_bytes, bytes(data[0]["pass_word"]))
            if check_pwd:
                cursor.execute(f"update user set pass_word = %s where username = {current_user.username}", (
                    bcrypt.hashpw(info.new_pass.encode('utf8'), bcrypt.gensalt()), ))
                conn.commit()
                return {"Status": True, "message": "Update password successfully"}
            else:
                return {"Status": False, "message": "Mật khẩu cũ không trùng khớp"}
        else:
            return {"Status": False, "message": "Tài khoản không tồn tại"}

    except Exception as e:
        return {"Error": e}


@app.get("/get_info_subject_register/{ma_hk}")
async def getInfoSubjectRegister(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk:  int):
    statement1 = f"""
                    select 
                        {ma_hk % 10} as ki,
                        {f"20{ma_hk // 10}"} as nh,
                        {f"20{ma_hk // 10 + 1}"} as nhs,
                        day(curdate()) as ngay,
                        month(curdate()) as thang,
                        year(curdate()) as nam,
                        sv.ho_ten as ho_ten,
                        date_format(sv.ngsinh, '%d/%m/%Y') as ngsinh,
                        sv.ma_sv as ma_sv,
                        (select concat(sv.lop, ' ', nganh.ten_nganh)) as lop

                    from 
                        sinh_vien sv 
                        inner join nganh on nganh.ma_nganh = sv.ma_nganh
                        inner join dang_ky dk on dk.ma_sv = sv.ma_sv
                        inner join lich_hoc lh on lh.ma_lh = dk.ma_lh

                    where 
                        lh.ma_hk = {ma_hk} and dk.ma_sv = {current_user.username}

                    group by
                        sv.ma_sv

                """

    cursor.execute(statement1)
    data1 = cursor.fetchall()

    statement2 = f"""
                    select 
                        row_number() over() as stt,
                        lh.ma_hp as ma_hp,
                        hp.ten_hp as ten_hp,
                        hp.so_tin as so_tin,
                        lh.ma_lop as ma_lop,
                        lh.thoi_gian as lich_hoc

                    from 
                        lich_hoc lh
                        inner join hoc_phan hp on hp.ma_hp = lh.ma_hp
                        inner join hoc_ki hk on hk.ma_hk = lh.ma_hk
                        inner join dang_ky dk on dk.ma_lh = lh.ma_lh
                        inner join sinh_vien sv on sv.ma_sv = dk.ma_sv

                    where 
                        lh.ma_hk = {ma_hk} and dk.ma_sv = {current_user.username} and dk.diem_tx is null

                """

    cursor.execute(statement2)
    data2 = cursor.fetchall()

    for subject in data2:
        unicode_data = subject["lich_hoc"]
        subject["lich_hoc"] = json.loads(unicode_data)

    data1[0]["items"] = data2

    return {"info_subject_register": data1}


@app.get("/get_total_student")
async def getTotalStudent():
    cursor.execute(
        "SELECT COUNT(username) AS totalStudent FROM user WHERE access_level ='SV'")
    data = cursor.fetchall()
    return data[0]


@app.get("/get_total_teacher")
async def getTotalTeacher():
    cursor.execute(
        "SELECT COUNT(username) AS totalTeacher FROM user WHERE access_level ='GV'")
    data = cursor.fetchall()
    return data[0]


@app.get("/get_all_semester")
async def getSemesterFormat():
    cursor.execute(
        "SELECT ma_hk FROM hoc_ki WHERE NOT ng_bat_dau > NOW() ORDER BY ng_bat_dau DESC;")
    data = cursor.fetchall()
    return [{"value": item["ma_hk"], "label": f'Học kì {item["ma_hk"] % 10} năm học 20{item["ma_hk"] // 10} - 20{item["ma_hk"]//10 + 1}'} for item in data]


@app.get("/get_semester")
async def getSemester():
    cursor.execute("SELECT * FROM hoc_ki ORDER BY ma_hk DESC")
    return cursor.fetchall()


@app.get("/get_regis")
async def getRegis():
    cursor.execute("SELECT * FROM dot_dki ORDER BY ma_hk DESC")
    return cursor.fetchall()


@app.delete("/delete_regis/{ma_hk}_{dot}")
async def delRegis(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int, dot: int):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}

    cursor.execute("DELETE FROM dot_dki WHERE dot = %s AND ma_hk = %s",
                   (dot, ma_hk))
    conn.commit()


@app.delete("/delete_semester/{ma_hk}")
async def delSemes(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}

    try:
        cursor.execute(f"DELETE FROM hoc_ki WHERE ma_hk = {ma_hk}")
        conn.commit()
        return True
    except Exception as e:
        return False


class Semes(BaseModel):
    ma_hk: int
    ng_bat_dau: str
    ng_ket_thuc: str


class Regis(BaseModel):
    dot: int
    ma_hk: int
    ng_bat_dau: str
    ng_ket_thuc: str


@app.post("/add_semes")
async def addSemes(current_user: Annotated[UserInfor, Depends(get_current_active_user)], semes: Semes):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}
    try:
        cursor.execute(f"INSERT INTO hoc_ki VALUES(%s, %s, %s)",
                       (semes.ma_hk, semes.ng_bat_dau, semes.ng_ket_thuc))
        conn.commit()
        return True
    except Exception as e:
        return False


@app.post("/add_regis")
async def addRegis(current_user: Annotated[UserInfor, Depends(get_current_active_user)], semes: Regis):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}
    try:
        cursor.execute(f"INSERT INTO dot_dki VALUES(%s, %s, %s, %s)",
                       (semes.dot, semes.ma_hk, semes.ng_bat_dau, semes.ng_ket_thuc))
        conn.commit()
        return True
    except Exception as e:
        return False


@app.post("/send_report")
async def send_report(current_user: Annotated[UserInfor, Depends(get_current_active_user)], report: CONTENT):
    if current_user.access_level != "SV":
        return {"detail": "You are not authorized to access this."}

    cursor.execute(
        f"INSERT INTO report VALUES(NULL, %s, %s, %s, %s)", (current_user.username, report.email, report.title, report.content))
    conn.commit()


@app.put("/reset_pass")
async def reset(current_user: Annotated[UserInfor, Depends(get_current_active_user)], user: User):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}

    password = generate_random_password()
    cursor.execute(f"UPDATE user SET pass_word = %s WHERE username = %s",
                   (bcrypt.hashpw(password.encode(), bcrypt.gensalt()), user.username))
    conn.commit()
    return {"new_pass": password}


@app.get("/get_all_user")
async def get_all_user(current_user: Annotated[UserInfor, Depends(get_current_active_user)]):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}

    cursor.execute(
        "SELECT username, access_level FROM user WHERE access_level != \'AD\'")
    return cursor.fetchall()


@app.delete("/delete_user/{username}_{access_level}")
async def delete_user(current_user: Annotated[UserInfor, Depends(get_current_active_user)], username: str, access_level: str):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}

    if (access_level == "SV"):
        cursor.execute(f"DELETE FROM report WHERE ma_sv = {username}")
        cursor.execute(f"DELETE FROM dang_ky WHERE ma_sv = {username}")
        cursor.execute(f"DELETE FROM sinh_vien WHERE ma_sv = {username}")
    elif (access_level == "GV"):
        cursor.execute(f"DELETE FROM lh_gv WHERE ma_gv = {username}")
        cursor.execute(f"DELETE FROM gv_hp WHERE ma_gv = {username}")
        cursor.execute(f"DELETE FROM giang_vien WHERE ma_gv = {username}")
    cursor.execute(f"DELETE FROM user WHERE username = {username}")
    conn.commit()


class NewStudent(BaseModel):
    username: str
    ho_ten: str
    gioi_tinh: str
    ngsinh: str
    sdt: str
    ma_nganh: str
    nam_bat_dau: int
    lop: str
    email: str


class NewTeacher(BaseModel):
    username: str
    ho_ten: str
    gioi_tinh: str
    luong: str
    ngsinh: str
    sdt: str
    dia_chi: str
    ng_bat_dau: str
    email: str


@app.get("/get_all_major")
async def get_all_major(current_user: Annotated[UserInfor, Depends(get_current_active_user)]):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}
    cursor.execute("SELECT ma_nganh AS value, ten_nganh AS label FROM nganh")
    return cursor.fetchall()


@app.post("/add_new_sv")
async def add_new_user(current_user: Annotated[UserInfor, Depends(get_current_active_user)], user: NewStudent):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}
    try:
        cursor.execute("INSERT INTO user VALUES(%s, %s, %s, %s, NULL)",
                       (user.username, bcrypt.hashpw(user.username.encode(), bcrypt.gensalt()), user.email, "SV"))
        cursor.execute("INSERT INTO sinh_vien VALUES(%s, %s, %s, %s, %s, %s, %s, %s)",
                       (user.username, user.ho_ten, user.gioi_tinh, user.ngsinh, user.sdt, user.ma_nganh, user.nam_bat_dau, user.lop))
        conn.commit()
        return True
    except Exception as e:
        return False


@app.post("/add_new_gv")
async def add_new_user(current_user: Annotated[UserInfor, Depends(get_current_active_user)], user: NewTeacher):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}
    try:
        cursor.execute("INSERT INTO user VALUES(%s, %s, %s, %s, NULL)",
                       (user.username, bcrypt.hashpw(user.username.encode(), bcrypt.gensalt()), user.email, "GV"))
        cursor.execute("INSERT INTO giang_vien VALUES(%s, %s, %s, %s, %s, %s, %s, %s, NULL)",
                       (user.username, user.ho_ten, user.gioi_tinh, user.luong, user.ngsinh, user.sdt, user.dia_chi, user.ng_bat_dau))
        conn.commit()
        return True
    except Exception as e:
        print(e)


@app.get("/all_schedule/{ma_hk}")
async def sendSchedule(current_user: Annotated[UserInfor, Depends(get_current_active_user)], ma_hk: int):
    if current_user.access_level != "AD":
        return {"detail": "You are not authorized to access this."}
    statement = f"""
                    select 
                        lh.ma_lh as "ma_lh",
                        hp.ten_hp as "ten_hp",
                        lh.ma_hp as "ma_hp",
                        lh.ma_lop as "ma_lop",
                        lh.ma_hk as "ma_hk",
                        group_concat(gv.ho_ten) as "ten_gv",
                        (
                            select count(*) 
                            from dang_ky dk 
                            where dk.ma_lh = lh.ma_lh
                        ) as "da_dk",
                        lh.thoi_gian as "lich_hoc"
                    
                    from 
                        lich_hoc lh
                        inner join hoc_phan hp on hp.ma_hp = lh.ma_hp
                        inner join lh_gv on lh.ma_lh = lh_gv.ma_lh
                        inner join giang_vien gv on lh_gv.ma_gv = gv.ma_gv
                    where lh.ma_hk = {ma_hk}
                    group by lh.ma_hp
                    order by hp.ten_hp;
                """

    cursor.execute(statement)
    data = cursor.fetchall()

    for subject in data:
        # unicode_data = subject["lich_hoc"].decode('utf-8')
        subject["lich_hoc"] = json.loads(subject["lich_hoc"])
        subject["ten_gv"] = [gv for gv in subject["ten_gv"].split(",")]

    return {"schedule": data}


# @app.post("/send_support")
# async def sendSupport(content: CONTENT):

#     cursor.execute(f"select pass_word from user where username = {content.username}")
#     data = cursor.fetchall()

#     # Cấu hình kết nối cho FastMail
#     conf = ConnectionConfig(
#         MAIL_USERNAME=content.email,
#         MAIL_PASSWORD="your_password_email",
#         MAIL_FROM=content.email,
#         MAIL_PORT=587,
#         MAIL_SERVER="smtp.gmail.com",
#         MAIL_STARTTLS=True,
#         MAIL_SSL_TLS=False,
#         USE_CREDENTIALS=True,
#         VALIDATE_CERTS=True,
#         MAIL_FROM_NAME=content.email,
#     )

#     # Khởi tạo FastMail
#     fastMail = FastMail(conf)

#     # Gửi email
#     message = MessageSchema(
#         subject=content.title,
#         recipients=["nguyenvanthang_t66@hus.edu.vn"],
#         body=content.content,
#         subtype=MessageType.html,
#     )
#     await fastMail.send_message(message)

#     return {"message": "Send email support successful!"}


origins = ["http://localhost:5173",
           "http://localhost:8000",
           "http://localhost:8001"]


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
