from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from datetime import date
import bcrypt

from fastapi.middleware.cors import CORSMiddleware

class GIANGVIEN(BaseModel):
    ma_gv: str | None = None
    ho_ten: str | None = None
    gioi_tinh: str | None = None
    luong: float | None = None
    ngsinh: date | None = None
    sdt: str | None = None
    email: str | None = None
    dia_chi: str | None = None
    ng_bat_dau: date | None = None
    ng_ket_thuc: date | None = None
    hoc_ham: str | None = None
    hoc_vi: str | None = None
    ma_bm: str | None = None
    password: str | None = None
    quyen: int | None = None


class NGANH(BaseModel):
    ma_nganh: str | None = None
    ten_nganh: str | None = None


class PHONG(BaseModel):
    phong: str | None = None
    suc_chua: int | None = None
    mo_ta: str | None = None


class SINHVIEN(BaseModel):
    ma_sv: str | None = None
    ho_ten: str | None = None
    gioi_tinh: str | None = None
    ngsinh: date | None = None
    sdt: str | None = None
    email: str | None = None
    gpa: float | None = None
    ma_nganh: str | None = None
    nam_bat_dau: int | None = None
    lop: str | None = None
    pass_word: str | None = None


class HOCPHAN(BaseModel):
    ma_hp: str | None = None
    ten_hp: str | None = None
    so_tin: int | None = None
    mo_ta: str | None = None


class GIANGVIENHOCPHAN(BaseModel):
    ma_gv: str | None = None
    ma_hp: str | None = None


class CHUONGTRINH(BaseModel):
    ma_ct: str | None = None
    ma_nganh: str | None = None


class HOCPHANTIENQUYET(BaseModel):
    ma_hp: str | None = None
    hp_tien_quyet: str | None = None


class CHUONGTRINHHOC(BaseModel):
    ma_ct: str | None = None
    ma_nganh: str | None = None
    ma_hp: str | None = None
    nam: int | None = None
    ki: int | None = None


class LICHHOC(BaseModel):
    ma_lh: int | None = None
    ma_hp: str | None = None
    ma_lop: int | None = None
    nam: int | None = None
    ki: int | None = None


class LICHHOCGIAOVIEN(BaseModel):
    ma_lh: int | None = None
    ma_gv: str | None = None


class LICHHOCTHOIGIAN(BaseModel):
    ma_lh: int | None = None
    thoi_gian: str | None = None
    phong: str | None = None
    ma_gv: str | None = None


class DANGKY(BaseModel):
    ma_lh: int | None = None
    ma_sv: str | None = None
    diem_tx: float | None = None
    he_so_tx: float | None = None
    diem_gk: float | None = None
    he_so_gk: float | None = None
    diem_ck: float | None = None
    he_so_ck: float | None = None


class USER(BaseModel):
    username: str | None = None
    pass_word: str | None = None
    email: str | None = None
    access_level: str | None = None


app = FastAPI()


host = "127.0.0.1"
user = "root"
password = ""
database = "csdl_web"

connect = mysql.connector.connect(host = host, user = user, password = password, database = database)
cursor = connect.cursor(dictionary=True)


# GET: get all table records
@app.get("/get_giangvien/")
async def list_records():
    try:
        cursor.execute("select * from giang_vien")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_giangvien/")
async def create_records(newRecord: GIANGVIEN):
    try:
        cursor.execute("insert into giang_vien(ma_gv, ho_ten, gioi_tinh, luong, ngsinh, sdt, email,\
                        dia_chi, ng_bat_dau, ng_ket_thuc, hoc_ham, hoc_vi, ma_bm, password, quyen)\
                        values (\"{}\", \"{}\", \"{}\", {}, \"{}\", \"{}\", \"{}\", \"{}\", \"{}\",\
                        \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", {});".format(newRecord.ma_gv, 
                                                                             newRecord.ho_ten, 
                                                                             newRecord.gioi_tinh, 
                                                                             newRecord.luong, 
                                                                             newRecord.ngsinh, 
                                                                             newRecord.sdt, 
                                                                             newRecord.email, 
                                                                             newRecord.dia_chi, 
                                                                             newRecord.ng_bat_dau, 
                                                                             newRecord.ng_ket_thuc, 
                                                                             newRecord.hoc_ham, 
                                                                             newRecord.hoc_vi, 
                                                                             newRecord.ma_bm, 
                                                                             newRecord.password, 
                                                                             newRecord.quyen))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_giangvien/")
async def update_record(newRecord: GIANGVIEN):
    try:
        cursor.execute("update giang_vien set ho_ten = \"{}\", gioi_tinh = \"{}\", luong = {}, ngsinh = \"{}\", sdt = \"{}\",\
                        email = \"{}\", dia_chi = \"{}\", ng_bat_dau = \"{}\", ng_ket_thuc = \"{}\", hoc_ham = \"{}\", hoc_vi = \"{}\",\
                        ma_bm = \"{}\", password = \"{}\", quyen = {} where ma_gv = \"{}\"".format(newRecord.ho_ten, 
                                                                                                   newRecord.gioi_tinh, 
                                                                                                   newRecord.luong, 
                                                                                                   newRecord.ngsinh, 
                                                                                                   newRecord.sdt, 
                                                                                                   newRecord.email, 
                                                                                                   newRecord.dia_chi, 
                                                                                                   newRecord.ng_bat_dau, 
                                                                                                   newRecord.ng_ket_thuc, 
                                                                                                   newRecord.hoc_ham, 
                                                                                                   newRecord.hoc_vi, 
                                                                                                   newRecord.ma_bm, 
                                                                                                   newRecord.password, 
                                                                                                   newRecord.quyen, 
                                                                                                   newRecord.ma_gv))
        
        cursor.fetchall()
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
            return e
    
# DELETE: delete record
@app.delete("/delete_giangvien/{ma_gv}")
async def delete_record(ma_gv: str):
    try:
        cursor.execute("select * from giang_vien where ma_gv = \"{}\"".format(ma_gv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from giang_vien where ma_gv = \"{}\"".format(ma_gv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_gv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e
    

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
    

# GET: get all table records
@app.get("/get_sinhvien/")
async def list_records():
    try:
        cursor.execute("select * from sinh_vien")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_sinhvien/")
async def create_records(newRecord: SINHVIEN):
    try:
        cursor.execute("insert into sinh_vien(ma_sv, ho_ten, gioi_tinh, ngsinh, sdt, email, gpa, ma_nganh, nam_bat_dau, lop, pass_word)\
                        values (\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", {}, \"{}\", {}, \"{}\", \"{}\");".format(newRecord.ma_sv, 
                                                                                                                         newRecord.ho_ten, 
                                                                                                                         newRecord.gioi_tinh, 
                                                                                                                         newRecord.ngsinh, 
                                                                                                                         newRecord.sdt, 
                                                                                                                         newRecord.email, 
                                                                                                                         newRecord.gpa, 
                                                                                                                         newRecord.ma_nganh, 
                                                                                                                         newRecord.nam_bat_dau, 
                                                                                                                         newRecord.lop, 
                                                                                                                         newRecord.pass_word))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_sinhvien/")
async def update_record(newRecord: SINHVIEN):
    try:
        cursor.execute("update sinh_vien set ho_ten = \"{}\", gioi_tinh = \"{}\", ngsinh = \"{}\",\
                        sdt = \"{}\", email = \"{}\", gpa = {}, ma_nganh = \"{}\", nam_bat_dau = {},\
                        lop = \"{}\", pass_word = \"{}\" where ma_sv = \"{}\"".format(newRecord.ho_ten, 
                                                                                      newRecord.gioi_tinh, 
                                                                                      newRecord.ngsinh, 
                                                                                      newRecord.sdt, 
                                                                                      newRecord.email, 
                                                                                      newRecord.gpa, 
                                                                                      newRecord.ma_nganh, 
                                                                                      newRecord.nam_bat_dau, 
                                                                                      newRecord.lop, 
                                                                                      newRecord.pass_word, 
                                                                                      newRecord.ma_sv))
        
        cursor.fetchall()
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
            return e
    
# DELETE: delete record
@app.delete("/delete_sinhvien/{ma_sv}")
async def delete_record(ma_sv: str):
    try:
        cursor.execute("select * from sinh_vien where ma_sv = \"{}\"".format(ma_sv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from sinh_vien where ma_sv = \"{}\"".format(ma_sv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_sv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e
    

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
    

# GET: get all table records
@app.get("/get_dangky/")
async def list_records():
    try:
        cursor.execute("select * from dang_ky")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_dangky")
async def create_records(newRecord: DANGKY):
    try:
        cursor.execute("insert into dang_ky(ma_lh, ma_sv, diem_tx, he_so_tx, diem_gk, he_so_gk, diem_ck, he_so_ck)\
                        values ({}, \"{}\", {}, {}, {}, {}, {}, {});".format(newRecord.ma_lh, 
                                                                             newRecord.ma_sv, 
                                                                             newRecord.diem_tx,
                                                                             newRecord.he_so_tx, 
                                                                             newRecord.diem_gk, 
                                                                             newRecord.he_so_gk, 
                                                                             newRecord.diem_ck, 
                                                                             newRecord.he_so_ck))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_dangky/")
async def update_record(newRecord: DANGKY):
    try:
        cursor.execute("update dang_ky set diem_tx = {}, he_so_tx = {}, diem_gk = {}, he_so_gk = {},\
                        diem_ck = {}, he_so_ck = {} where ma_lh = {} and ma_sv = \"{}\"".format(newRecord.diem_tx, 
                                                                                                newRecord.he_so_tx, 
                                                                                                newRecord.diem_gk,
                                                                                                newRecord.he_so_gk, 
                                                                                                newRecord.diem_ck, 
                                                                                                newRecord.he_so_ck, 
                                                                                                newRecord.ma_lh, 
                                                                                                newRecord.ma_sv))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_dangky/{ma_lh}/{ma_sv}")
async def delete_record(ma_lh: int, ma_sv: str):
    try:
        cursor.execute("select * from dang_ky where ma_lh = {} and ma_sv = \"{}\"".format(ma_lh, ma_sv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from dang_ky where ma_lh = {} and ma_sv = \"{}\"".format(ma_lh, ma_sv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_lh, ma_sv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e
    

# POST: create a new record for a table
@app.post("/post_user")
async def create_records(newRecord: USER):

    try:
        cursor.execute("insert into user(username, pass_word, email, access_level)\
                        values (%s, %s, %s, %s)", (newRecord.username, 
                                                                        bcrypt.hashpw(newRecord.pass_word.encode('utf8'), bcrypt.gensalt()),
                                                                        newRecord.email, 
                                                                        newRecord.access_level))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
    

# Cập nhật các URL cho phù hợp với URL của ứng dụng frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)