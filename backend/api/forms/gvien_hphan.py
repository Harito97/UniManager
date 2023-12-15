from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class GIANGVIENHOCPHAN(BaseModel):
    ma_gv: str | None = None
    ma_hp: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_gvien_hphan/")
async def list_records():
    try:
        cursor.execute("select * from gv_hp")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_gvien_hphan/")
async def create_records(newRecord: GIANGVIENHOCPHAN):
    try:
        cursor.execute("insert into gv_hp(ma_gv, ma_hp)\
                        values (\"{}\", \"{}\");".format(newRecord.ma_gv, newRecord.ma_hp))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_gvien_hphan/")
async def update_record(newRecord: GIANGVIENHOCPHAN):
    try:
        cursor.execute("update gv_hp set ma_gv = \"{}\",\
                        ma_hp = \"{}\" where ma_gv = \"{}\" and ma_hp = \"{}\"".format(newRecord.ma_gv, 
                                                                                       newRecord.ma_hp, 
                                                                                       newRecord.ma_gv, 
                                                                                       newRecord.ma_hp))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_gvien_hphan/{ma_gv}/{ma_hp}")
async def delete_record(ma_gv: str, ma_hp: str):
    try:
        cursor.execute("select * from gv_hp where ma_gv = \"{}\" and ma_hp = \"{}\"".format(ma_gv, ma_hp))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from gv_hp where ma_gv = \"{}\" and ma_hp = \"{}\"".format(ma_gv, ma_hp))
        connect.commit()
        
        return {"message": f"Record with ID {ma_gv, ma_hp} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e