from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class LICHHOCTHOIGIAN(BaseModel):
    ma_lh: int | None = None
    thoi_gian: str | None = None
    phong: str | None = None
    ma_gv: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_lichhoc_thoigian/")
async def list_records():
    try:
        cursor.execute("select * from lh_thoi_gian")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_lichhoc_thoigian/")
async def create_records(newRecord: LICHHOCTHOIGIAN):
    try:
        cursor.execute("insert into lh_thoi_gian(ma_lh, thoi_gian, phong, ma_gv)\
                        values ({}, \"{}\", \"{}\", \"{}\");".format(newRecord.ma_lh, newRecord.thoi_gian, newRecord.phong, newRecord.ma_gv))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_lichhoc_thoigian/")
async def update_record(newRecord: LICHHOCTHOIGIAN):
    try:
        cursor.execute("update lh_thoi_gian set phong = \"{}\", ma_gv = \"{}\" \
                        where ma_lh = {} and thoi_gian = \"{}\"".format(newRecord.phong, 
                                                                        newRecord.ma_gv,
                                                                        newRecord.ma_lh, 
                                                                        newRecord.thoi_gian))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_lichhoc_thoigian/{ma_lh}/{thoi_gian}")
async def delete_record(ma_lh: int, thoi_gian: str):
    try:
        cursor.execute("select * from lh_thoi_gian where ma_lh = {} and thoi_gian = \"{}\"".format(ma_lh, thoi_gian))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from lh_thoi_gian where ma_lh = {} and thoi_gian = \"{}\"".format(ma_lh, thoi_gian))
        connect.commit()
        
        return {"message": f"Record with ID {ma_lh, thoi_gian} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e