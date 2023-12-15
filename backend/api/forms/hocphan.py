from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class HOCPHAN(BaseModel):
    ma_hp: str | None = None
    ten_hp: str | None = None
    so_tin: int | None = None
    mo_ta: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_hocphan/")
async def list_records():
    try:
        cursor.execute("select * from hoc_phan")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_hocphan/")
async def create_records(newRecord: HOCPHAN):
    try:
        cursor.execute("insert into hoc_phan(ma_hp, ten_hp, so_tin, mo_ta)\
                        values (\"{}\", \"{}\", {}, \"{}\");".format(newRecord.ma_hp, 
                                                                     newRecord.ten_hp, 
                                                                     newRecord.so_tin, 
                                                                     newRecord.mo_ta))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_hocphan/")
async def update_record(newRecord: HOCPHAN):
    try:
        cursor.execute("update hoc_phan set ten_hp = \"{}\",\
                        so_tin = {}, mo_ta = \"{}\" where ma_hp = \"{}\"".format(newRecord.ten_hp, 
                                                                                 newRecord.so_tin, 
                                                                                 newRecord.mo_ta, 
                                                                                 newRecord.ma_hp))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_hocphan/{ma_hp}")
async def delete_record(ma_hp: str):
    try:
        cursor.execute("select * from hoc_phan where ma_hp = \"{}\"".format(ma_hp))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from hoc_phan where ma_hp = \"{}\"".format(ma_hp))
        connect.commit()
        
        return {"message": f"Record with ID {ma_hp} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e