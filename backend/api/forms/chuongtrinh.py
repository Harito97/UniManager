from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class CHUONGTRINH(BaseModel):
    ma_ct: str | None = None
    ma_nganh: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_chuongtrinh/")
async def list_records():
    try:
        cursor.execute("select * from chuong_trinh")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_chuongtrinh/")
async def create_records(newRecord: CHUONGTRINH):
    try:
        cursor.execute("insert into chuong_trinh(ma_ct, ma_nganh)\
                        values (\"{}\", \"{}\");".format(newRecord.ma_ct, newRecord.ma_nganh))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_chuongtrinh/")
async def update_record(newRecord: CHUONGTRINH):
    try:
        cursor.execute("update chuong_trinh set ma_ct = \"{}\",\
                        ma_nganh = \"{}\" where ma_ct = \"{}\" and ma_nganh = \"{}\"".format(newRecord.ma_ct, 
                                                                                             newRecord.ma_nganh, 
                                                                                             newRecord.ma_ct, 
                                                                                             newRecord.ma_nganh))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_chuongtrinh/{ma_ct}/{ma_nganh}")
async def delete_record(ma_ct: str, ma_nganh: str):
    try:
        cursor.execute("select * from chuong_trinh where ma_ct = \"{}\" and ma_nganh = \"{}\"".format(ma_ct, ma_nganh))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from chuong_trinh where ma_ct = \"{}\" and ma_nganh = \"{}\"".format(ma_ct, ma_nganh))
        connect.commit()
        
        return {"message": f"Record with ID {ma_ct, ma_nganh} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e