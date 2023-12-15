from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class LICHHOCGIAOVIEN(BaseModel):
    ma_lh: int | None = None
    ma_gv: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_lichhoc_gvien/")
async def list_records():
    try:
        cursor.execute("select * from lh_gv")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_lichhoc_gvien/")
async def create_records(newRecord: LICHHOCGIAOVIEN):
    try:
        cursor.execute("insert into lh_gv(ma_lh, ma_gv)\
                        values ({}, \"{}\");".format(newRecord.ma_lh, newRecord.ma_gv))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_lichhoc_gvien/")
async def update_record(newRecord: LICHHOCGIAOVIEN):
    try:
        cursor.execute("update lh_gv set ma_lh = {},\
                        ma_gv = \"{}\" where ma_lh = {} and ma_gv = \"{}\"".format(newRecord.ma_lh, 
                                                                                   newRecord.ma_gv, 
                                                                                   newRecord.ma_lh, 
                                                                                   newRecord.ma_gv))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_lichhoc_gvien/{ma_lh}/{ma_gv}")
async def delete_record(ma_lh: int, ma_gv: str):
    try:
        cursor.execute("select * from lh_gv where ma_lh = {} and ma_gv = \"{}\"".format(ma_lh, ma_gv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from lh_gv where ma_lh = {} and ma_gv = \"{}\"".format(ma_lh, ma_gv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_lh, ma_gv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e