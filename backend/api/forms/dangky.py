from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class DANGKY(BaseModel):
    ma_lh: int | None = None
    ma_sv: str | None = None
    diem_tx: float | None = None
    he_so_tx: float | None = None
    diem_gk: float | None = None
    he_so_gk: float | None = None
    diem_ck: float | None = None
    he_so_ck: float | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_dangky/")
async def list_records():
    try:
        cursor.execute("select * from dang_ky")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_dangky")
async def create_records(newRecord: DANGKY):
    try:
        cursor.execute("insert into dang_ky(ma_lh, ma_sv, diem_tx, he_so_tx, diem_gk, he_so_gk, diem_ck, he_so_ck)\
                        values ({}, \"{}\", {}, {}, {}, {}, {}, {});".format(newRecord.ma_lh, 
                                                                             newRecord.ma_sv, 
                                                                             newRecord.diem_tx,
                                                                             newRecord.he_so_tx, 
                                                                             newRecord.diem_gk, 
                                                                             newRecord.he_so_gk, 
                                                                             newRecord.diem_ck, 
                                                                             newRecord.he_so_ck))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_dangky/")
async def update_record(newRecord: DANGKY):
    try:
        cursor.execute("update dang_ky set diem_tx = {}, he_so_tx = {}, diem_gk = {}, he_so_gk = {},\
                        diem_ck = {}, he_so_ck = {} where ma_lh = {} and ma_sv = \"{}\"".format(newRecord.diem_tx, 
                                                                                                newRecord.he_so_tx, 
                                                                                                newRecord.diem_gk,
                                                                                                newRecord.he_so_gk, 
                                                                                                newRecord.diem_ck, 
                                                                                                newRecord.he_so_ck, 
                                                                                                newRecord.ma_lh, 
                                                                                                newRecord.ma_sv))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_dangky/{ma_lh}/{ma_sv}")
async def delete_record(ma_lh: int, ma_sv: str):
    try:
        cursor.execute("select * from dang_ky where ma_lh = {} and ma_sv = \"{}\"".format(ma_lh, ma_sv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from dang_ky where ma_lh = {} and ma_sv = \"{}\"".format(ma_lh, ma_sv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_lh, ma_sv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e