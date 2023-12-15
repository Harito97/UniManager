from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class NGANH(BaseModel):
    ma_nganh: str | None = None
    ten_nganh: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_nganh/")
async def list_records():
    try:
        cursor.execute("select * from nganh")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_nganh/")
async def create_records(newRecord: NGANH):
    try:
        cursor.execute("insert into nganh(ma_nganh, ten_nganh)\
                        values (\"{}\", \"{}\");".format(newRecord.ma_nganh, newRecord.ten_nganh))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_nganh/")
async def update_record(newRecord: NGANH):
    try:
        cursor.execute("update nganh set ten_nganh = \"{}\" \
                        where ma_nganh = \"{}\"".format(newRecord.ten_nganh, newRecord.ma_nganh))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_nganh/{ma_nganh}")
async def delete_record(ma_nganh: str):
    try:
        cursor.execute("select * from nganh where ma_nganh = \"{}\"".format(ma_nganh))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from nganh where ma_nganh = \"{}\"".format(ma_nganh))
        connect.commit()

        return {"message": f"Record with ID {ma_nganh} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e