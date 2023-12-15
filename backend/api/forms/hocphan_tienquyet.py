from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class HOCPHANTIENQUYET(BaseModel):
    ma_hp: str | None = None
    hp_tien_quyet: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_hocphan_tienquyet/")
async def list_records():
    try:
        cursor.execute("select * from hp_tien_quyet")
        return cursor.fetchall()
    except Exception as e:
        return e


# POST: create a new record for a table
@app.post("/post_hocphan_tienquyet/")
async def create_records(newRecord: HOCPHANTIENQUYET):
    try:
        cursor.execute("insert into hp_tien_quyet(ma_hp, hp_tien_quyet)\
                        values (\"{}\", \"{}\");".format(newRecord.ma_hp, newRecord.hp_tien_quyet))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_hocphan_tienquyet/")
async def update_record(newRecord: HOCPHANTIENQUYET):
    try:
        cursor.execute("update hp_tien_quyet set ma_hp = \"{}\",\
                        hp_tien_quyet = \"{}\" where ma_hp = \"{}\" and hp_tien_quyet = \"{}\"".format(newRecord.ma_hp, 
                                                                                                       newRecord.hp_tien_quyet, 
                                                                                                       newRecord.ma_hp, 
                                                                                                       newRecord.hp_tien_quyet))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_hocphan_tienquyet/{ma_hp}/{hp_tien_quyet}")
async def delete_record(ma_hp: str, hp_tien_quyet: str):
    try:
        cursor.execute("select * from hp_tien_quyet where ma_hp = \"{}\" and hp_tien_quyet = \"{}\"".format(ma_hp, hp_tien_quyet))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from hp_tien_quyet where ma_hp = \"{}\" and hp_tien_quyet = \"{}\"".format(ma_hp, hp_tien_quyet))
        connect.commit()
        
        return {"message": f"Record with ID {ma_hp, hp_tien_quyet} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e