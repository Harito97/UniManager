from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class GIANGVIEN(BaseModel):
    ma_gv: str | None = None
    ho_ten: str | None = None
    gioi_tinh: str | None = None
    luong: float | None = None
    ngsinh: date | None = None
    sdt: str | None = None
    email: str | None = None
    dia_chi: str | None = None
    ng_bat_dau: date | None = None
    ng_ket_thuc: date | None = None
    hoc_ham: str | None = None
    hoc_vi: str | None = None
    ma_bm: str | None = None
    password: str | None = None
    quyen: int | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_giangvien/")
async def list_records():
    try:
        cursor.execute("select * from giang_vien")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_giangvien/")
async def create_records(newRecord: GIANGVIEN):
    try:
        cursor.execute("insert into giang_vien(ma_gv, ho_ten, gioi_tinh, luong, ngsinh, sdt, email,\
                        dia_chi, ng_bat_dau, ng_ket_thuc, hoc_ham, hoc_vi, ma_bm, password, quyen)\
                        values (\"{}\", \"{}\", \"{}\", {}, \"{}\", \"{}\", \"{}\", \"{}\", \"{}\",\
                        \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", {});".format(newRecord.ma_gv, 
                                                                             newRecord.ho_ten, 
                                                                             newRecord.gioi_tinh, 
                                                                             newRecord.luong, 
                                                                             newRecord.ngsinh, 
                                                                             newRecord.sdt, 
                                                                             newRecord.email, 
                                                                             newRecord.dia_chi, 
                                                                             newRecord.ng_bat_dau, 
                                                                             newRecord.ng_ket_thuc, 
                                                                             newRecord.hoc_ham, 
                                                                             newRecord.hoc_vi, 
                                                                             newRecord.ma_bm, 
                                                                             newRecord.password, 
                                                                             newRecord.quyen))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_giangvien/")
async def update_record(newRecord: GIANGVIEN):
    try:
        cursor.execute("update giang_vien set ho_ten = \"{}\", gioi_tinh = \"{}\", luong = {}, ngsinh = \"{}\", sdt = \"{}\",\
                        email = \"{}\", dia_chi = \"{}\", ng_bat_dau = \"{}\", ng_ket_thuc = \"{}\", hoc_ham = \"{}\", hoc_vi = \"{}\",\
                        ma_bm = \"{}\", password = \"{}\", quyen = {} where ma_gv = \"{}\"".format(newRecord.ho_ten, 
                                                                                                   newRecord.gioi_tinh, 
                                                                                                   newRecord.luong, 
                                                                                                   newRecord.ngsinh, 
                                                                                                   newRecord.sdt, 
                                                                                                   newRecord.email, 
                                                                                                   newRecord.dia_chi, 
                                                                                                   newRecord.ng_bat_dau, 
                                                                                                   newRecord.ng_ket_thuc, 
                                                                                                   newRecord.hoc_ham, 
                                                                                                   newRecord.hoc_vi, 
                                                                                                   newRecord.ma_bm, 
                                                                                                   newRecord.password, 
                                                                                                   newRecord.quyen, 
                                                                                                   newRecord.ma_gv))
        
        cursor.fetchall()
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
            return e
    
# DELETE: delete record
@app.delete("/delete_giangvien/{ma_gv}")
async def delete_record(ma_gv: str):
    try:
        cursor.execute("select * from giang_vien where ma_gv = \"{}\"".format(ma_gv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from giang_vien where ma_gv = \"{}\"".format(ma_gv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_gv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e