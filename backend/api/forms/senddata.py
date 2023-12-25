from pydantic import BaseModel
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
import mysql.connector

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Cookie
import datetime
import uvicorn
import jwt
from jwt.exceptions import DecodeError
from starlette.testclient import TestClient


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"
SECURITY_ALGORITHM = 'HS256'
SECRET_KEY = 'super-secret-key'

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)

app.counter = "2100250"


@app.get("/increment")
def increment():
    app.counter += 1


@app.get("/status")
def read_status():
    return app.counter


# Định nghĩa biến toàn cục
@app.middleware("http")
async def add_global_variable(request: Request, call_next):
    token = request.cookies.get("token")
    if token is not None:
        token_bytes = token.encode("utf-8")  # Chuyển đổi token thành bytes
        try:
            decoded = jwt.decode(token_bytes, SECRET_KEY, algorithms=[SECURITY_ALGORITHM])
            request.state.token = decoded.get("username")
            app.counter = 21002500
        except:
            request.state.token = None
    else:
        request.state.token = None
    response = await call_next(request)
    return response


# Sử dụng biến toàn cục trong API
@app.get("/my_cookie")
async def my_cookie(request: Request):
    username = request.state.token
    return username


@app.post("/overview")
async def sendOverView(request: Request):

    client = TestClient(app)
    client.get("/my_cookie", headers={"Cookie": "token=21002500"})
    user = str(client.get("/status").content.decode('utf-8'))

    cursor.execute(f"""select sum(hp.so_tin) as tin
                   from hoc_phan hp, lich_hoc lh, dang_ky dk
                   where ma_sv = {user} and dk.ma_lh = lh.ma_lh and lh.ma_hp = hp.ma_hp""")
    
    tong_so_tin = cursor.fetchall()[0]["tin"]

    cursor.execute(f"""select sum(hp.so_tin) as tin
                   from hoc_phan hp, lich_hoc lh, dang_ky dk
                   where ma_sv = '21002500' and dk.ma_lh = lh.ma_lh and lh.ma_hp = hp.ma_hp and 
                         dk.diem_tx * dk.he_so_tx + dk.diem_gk * dk.he_so_gk + dk.diem_ck * dk.he_so_ck >= 4""")

    tong_so_tin_tich_luy = cursor.fetchall()[0]["tin"]

    cursor.execute(f"""select gpa from sinh_vien where ma_sv = '21002500'""")
    gpa = cursor.fetchall()[0]["gpa"]

    return {"tong_so_tin": tong_so_tin, "tong_so_tin_tich_luy": tong_so_tin_tich_luy, "gpa": gpa}


@app.post("/grade")
async def sendGrade(request: Request):

    # logged_in = request.cookies.get("logged_in")
    # username = request.cookies.get("username")

    columns = [
        {
            "title": "Mã môn học",
            "dataIndex": "ma_hp",
            "key": "ma_hp",
        },
        {
            "title": "Môn học",
            "dataIndex": "ten_hp",
            "key": "ten_hp",
        },
        {
            "title": "Số tín chỉ",
            "dataIndex": "so_tin",
            "key": "so_tin",
        },
        {
            "title": "Điểm hệ 10",
            "dataIndex": "he10",
            "key": "he10",
        },
        {
            "title": "Điểm chữ",
            "dataIndex": "diem",
            "key": "diem",
        },
        {
            "title": "Điểm hệ 4",
            "dataIndex": "he4",
            "key": "he4",
        },
    ]

    expand_columns = [
        {
            "title": "STT",
            "dataIndex": "stt",
            "key": "stt",
        },
        {
            "title": "Bản chất kỳ thi",
            "dataIndex": "type",
            "key": "type",
        },
        {
            "title": "Hệ số",
            "dataIndex": "he_so",
            "key": "he_so",
        },
        {
            "title": "Lần thi",
            "dataIndex": "lan",
            "key": "lan",
        },
        {
            "title": "Điểm",
            "dataIndex": "diem",
            "key": "diem",
        },
    ]

    current_year = datetime.datetime.now().year

    # username = request.cookies.get("username")

    cursor.execute("select nam_bat_dau from sinh_vien where ma_sv = '21002510'")
    nam_bat_dau = cursor.fetchall()[0]["nam_bat_dau"]

    data_component_grade = []

    for year in range(nam_bat_dau, current_year+1):

        data_year = []
        
        for semester in range(1, 3):


            statement = f"""
                            select sv_hp.so_lan_hoc, dk.he_so_ck, dk.diem_ck, dk.he_so_gk, dk.diem_gk, dk.he_so_tx, dk.diem_tx
                            from hoc_phan hp, lich_hoc lh, dang_ky dk, sv_hp, hoc_ki hk
                            where lh.ma_hp = hp.ma_hp and dk.ma_lh = lh.ma_lh and lh.ma_hk = hk.ma_hk and 
                                hk.ma_hk in (select hk.ma_hk WHERE (select RIGHT(cast(hk.ma_hk as char), 1)) = \"{semester}\" and  
                                (select concat("20", LEFT(cast(hk.ma_hk as char), 2))) = \"{year}\");
                        """
            
            cursor.execute(statement)
            data = cursor.fetchall()
            data_year.append(data)

        data_component_grade.append(data_year)

    data_expand = []

    for year in data_component_grade:
        list_semesters = []
        for semester in year:
            list_objects = []
            for object in semester:
                list_objects.append([{"stt": 1, "type": "Thi cuối kì", "he_so": object["he_so_ck"], "lan": object["so_lan_hoc"], "diem": object["diem_ck"]},
                                {"stt": 2, "type": "Giữa kì", "he_so": object["he_so_gk"], "lan": object["so_lan_hoc"], "diem": object["diem_gk"]},
                                {"stt": 3, "type": "Thường xuyên", "he_so": object["he_so_tx"], "lan": object["so_lan_hoc"], "diem": object["diem_tx"]}])
            list_semesters.append(list_objects)
        data_expand.append(list_semesters)


    data_sum_grade = []

    for year in range(nam_bat_dau, current_year+1):

        data_year = []
        
        for semester in range(1, 3):

            statement = f"""
                            with dk as (
                            select *, diem_tx * he_so_tx + diem_gk * he_so_gk + diem_ck * he_so_ck as total_score
                            from dang_ky 
                            where ma_sv = '21002500'
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
                                hoc_phan hp, lich_hoc lh, dk, hoc_ki hk
                            where lh.ma_hp = hp.ma_hp and dk.ma_lh = lh.ma_lh and lh.ma_hk = hk.ma_hk and 
                                hk.ma_hk in (select hk.ma_hk WHERE (select RIGHT(cast(hk.ma_hk as char), 1)) = \"{semester}\" and  
                                (select concat("20", LEFT(cast(hk.ma_hk as char), 2))) = \"{year}\");
                        """

            cursor.execute(statement)
            data_semester = cursor.fetchall()

            for element in data_semester:
                element['he10'] = round(element['he10'],1)

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
        for semester in range(1,3):
            data.append({"ki": semester, "nam": year, "data": data_sum_grade[year-2021][semester-1]})

    return {"columns": columns, "expand_columns": expand_columns, "data": data}


@app.post("/register_subject")
async def sendSubject():
    statement = f"""
                    select 
                        lh.ma_lh as "ma_lh"
                        hp.ten_hp as "ten_hp", 
                        hp.ma_hp as "ma_hp,
                        lh.ma_lop as "ma_lop",
                        hp.so_tin as "so_tin", 
                        lh.so_luong as "so_sv",  
                        case
                            when hp.ma_hp in (select lh.ma_hp from lich_hoc lh, dang_ky dk where dk.ma_sv = '21002500' and dk.ma_lh = lh.ma_lh) then 1
                            else 0
                        end as "Đã ĐK",
                        gv.ho_ten as "Giáo viên",
                        json_objectagg(lh_tg.thoi_gian) as "Lịch học"

                    from hoc_phan hp, lich_hoc lh, lh_thoi_gian lh_tg, dang_ky dk, giang_vien gv

                    where hp.ma_hp = lh.ma_hp and lh.ma_lh = lh_tg.ma_lh and gv.ma_gv = lh_tg.ma_gv
                    
                    group by hp.ten_hp
                    order by hp.ten_hp;

                """


@app.post("/register_subject")
async def sendSubjectMajor():
    return 0


# Cập nhật các URL cho phù hợp với URL của ứng dụng frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)


# if __name__ == "__main__":
#     uvicorn.run("senddata:app", port=8001)