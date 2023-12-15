from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class LICHHOC(BaseModel):
    ma_lh: int | None = None
    ma_hp: str | None = None
    ma_lop: int | None = None
    nam: int | None = None
    ki: int | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_lichhoc/")
async def list_records():
    try:
        cursor.execute("select * from lich_hoc")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_lichhoc/")
async def create_records(newRecord: LICHHOC):
    try:
        cursor.execute("insert into lich_hoc(ma_lh, ma_hp, ma_lop, nam, ki)\
                        values ({}, \"{}\", {}, {}, {});".format(newRecord.ma_lh, 
                                                                 newRecord.ma_hp, 
                                                                 newRecord.ma_lop, 
                                                                 newRecord.nam, 
                                                                 newRecord.ki))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_lichhoc/")
async def update_record(newRecord: LICHHOC):
    try:
        cursor.execute("update lich_hoc set ma_hp = \"{}\", ma_lop = {}, \
                        nam = {}, ki = {} where ma_lh = \"{}\"".format(newRecord.ma_hp, 
                                                                       newRecord.ma_lop, 
                                                                       newRecord.nam, 
                                                                       newRecord.ki, 
                                                                       newRecord.ma_lh))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_lichhoc/{ma_lh}")
async def delete_record(ma_lh: int):
    try:
        cursor.execute("select * from lich_hoc where ma_lh = \"{}\"".format(ma_lh))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from lich_hoc where ma_lh = \"{}\"".format(ma_lh))
        connect.commit()
        
        return {"message": f"Record with ID {ma_lh} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e