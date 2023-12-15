from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class CHUONGTRINHHOC(BaseModel):
    ma_ct: str | None = None
    ma_nganh: str | None = None
    ma_hp: str | None = None
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
@app.get("/get_chuongtrinhhoc/")
async def list_records():
    try:
        cursor.execute("select * from chuong_trinh_hoc")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_chuongtrinhhoc/")
async def create_records(newRecord: CHUONGTRINHHOC):
    try:
        cursor.execute("insert into chuong_trinh_hoc(ma_ct, ma_nganh, ma_hp, nam, ki)\
                        values (\"{}\", \"{}\", \"{}\", {}, {});".format(newRecord.ma_ct, 
                                                                         newRecord.ma_nganh, 
                                                                         newRecord.ma_hp, 
                                                                         newRecord.nam, 
                                                                         newRecord.ki))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_chuongtrinhhoc/")
async def update_record(newRecord: CHUONGTRINHHOC):
    try:
        cursor.execute("update chuong_trinh_hoc set nam = {}, ki = {} where ma_ct = \"{}\" and \
                        ma_nganh = \"{}\" and ma_hp = \"{}\"".format(newRecord.nam, 
                                                                  newRecord.ki, 
                                                                  newRecord.ma_ct, 
                                                                  newRecord.ma_nganh, 
                                                                  newRecord.ma_hp))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_chuongtrinhhoc/{ma_ct}/{ma_nganh}/{ma_hp}")
async def delete_record(ma_ct: str, ma_nganh: str, ma_hp: str):
    try:
        cursor.execute("select * from chuong_trinh_hoc where ma_ct = \"{}\" and \
                        ma_nganh = \"{}\" and ma_hp = \"{}\"".format(ma_ct, ma_nganh, ma_hp))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from chuong_trinh_hoc where ma_ct = \"{}\" and \
                        ma_nganh = \"{}\" and ma_hp = \"{}\"".format(ma_ct, ma_nganh, ma_hp))
        connect.commit()
        
        return {"message": f"Record with ID {ma_ct, ma_nganh, ma_hp} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e