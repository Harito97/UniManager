from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class SINHVIEN(BaseModel):
    ma_sv: str | None = None
    ho_ten: str | None = None
    gioi_tinh: str | None = None
    ngsinh: date | None = None
    sdt: str | None = None
    email: str | None = None
    gpa: float | None = None
    ma_nganh: str | None = None
    nam_bat_dau: int | None = None
    lop: str | None = None
    pass_word: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_sinhvien/")
async def list_records():
    try:
        cursor.execute("select * from sinh_vien")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_sinhvien/")
async def create_records(newRecord: SINHVIEN):
    try:
        cursor.execute("insert into sinh_vien(ma_sv, ho_ten, gioi_tinh, ngsinh, sdt, email, gpa, ma_nganh, nam_bat_dau, lop, pass_word)\
                        values (\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", {}, \"{}\", {}, \"{}\", \"{}\");".format(newRecord.ma_sv, 
                                                                                                                         newRecord.ho_ten, 
                                                                                                                         newRecord.gioi_tinh, 
                                                                                                                         newRecord.ngsinh, 
                                                                                                                         newRecord.sdt, 
                                                                                                                         newRecord.email, 
                                                                                                                         newRecord.gpa, 
                                                                                                                         newRecord.ma_nganh, 
                                                                                                                         newRecord.nam_bat_dau, 
                                                                                                                         newRecord.lop, 
                                                                                                                         newRecord.pass_word))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_sinhvien/")
async def update_record(newRecord: SINHVIEN):
    try:
        cursor.execute("update sinh_vien set ho_ten = \"{}\", gioi_tinh = \"{}\", ngsinh = \"{}\",\
                        sdt = \"{}\", email = \"{}\", gpa = {}, ma_nganh = \"{}\", nam_bat_dau = {},\
                        lop = \"{}\", pass_word = \"{}\" where ma_sv = \"{}\"".format(newRecord.ho_ten, 
                                                                                      newRecord.gioi_tinh, 
                                                                                      newRecord.ngsinh, 
                                                                                      newRecord.sdt, 
                                                                                      newRecord.email, 
                                                                                      newRecord.gpa, 
                                                                                      newRecord.ma_nganh, 
                                                                                      newRecord.nam_bat_dau, 
                                                                                      newRecord.lop, 
                                                                                      newRecord.pass_word, 
                                                                                      newRecord.ma_sv))
        
        cursor.fetchall()
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
            return e
    
# DELETE: delete record
@app.delete("/delete_sinhvien/{ma_sv}")
async def delete_record(ma_sv: str):
    try:
        cursor.execute("select * from sinh_vien where ma_sv = \"{}\"".format(ma_sv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from sinh_vien where ma_sv = \"{}\"".format(ma_sv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_sv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e