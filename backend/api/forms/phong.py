from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date

class PHONG(BaseModel):
    phong: str | None = None
    suc_chua: int | None = None
    mo_ta: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_phong/")
async def list_records():
    try:
        cursor.execute("select * from phong")
        return cursor.fetchall()
    except Exception as e:
        return e


# POST: create a new record for a table
@app.post("/post_phong/")
async def create_records(newRecord: PHONG):
    try:
        cursor.execute("insert into phong(phong, suc_chua, mo_ta)\
                        values (\"{}\", {}, \"{}\");".format(newRecord.phong, newRecord.suc_chua, newRecord.mo_ta))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_phong/")
async def update_record(newRecord: PHONG):
    try:
        cursor.execute("update phong set suc_chua = {},\
                        mo_ta = \"{}\" where phong = \"{}\"".format(newRecord.suc_chua, 
                                                                    newRecord.mo_ta, 
                                                                    newRecord.phong))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_phong/{phong}")
async def delete_record(phong: str):
    try:
        cursor.execute("select * from phong where phong = \"{}\"".format(phong))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from phong where phong = \"{}\"".format(phong))
        connect.commit()
        
        return {"message": f"Record with ID {phong} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e