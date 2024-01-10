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
    dia_chi: str | None = None
    ng_bat_dau: date | None = None
    ng_ket_thuc: date | None = None


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
    ma_nganh: str | None = None
    nam_bat_dau: int | None = None
    lop: str | None = None


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


class HOCKI(BaseModel):
    ma_hk: int | None = None
    ng_bat_dau: date | None = None
    ng_ket_thuc: date | None = None


class LICHHOC(BaseModel):
    ma_lh: int | None = None
    ma_hp: str | None = None
    ma_lop: int | None = None
    so_luong: int | None = None
    thoi_gian: dict | None = None
    ma_hk: int | None = None
    he_so_tx: float | None = None
    he_so_gk: float | None = None
    he_so_ck: float | None = None


class LICHHOCGIAOVIEN(BaseModel):
    ma_lh: int | None = None
    ma_gv: str | None = None


class DANGKY(BaseModel):
    ma_lh: int | None = None
    ma_sv: str | None = None
    diem_tx: float | None = None
    # he_so_tx: float | None = None
    diem_gk: float | None = None
    # he_so_gk: float | None = None
    diem_ck: float | None = None
    # he_so_ck: float | None = None


class SINHVIENHOCPHAN(BaseModel):
    ma_hp: str | None = None
    ma_sv: str | None = None
    so_lan_hoc: str | None = None


class USER(BaseModel):
    username: str | None = None
    pass_word: bytes | None = None
    email: str | None = None
    access_level: str | None = None


class DOTDKI(BaseModel):
    dot: int | None = None
    ma_hk: int | None = None
    ng_bat_dau: date | None = None
    ng_ket_thuc: date | None = None


class COEFFICIENT(BaseModel):
    ma_lh: int | None = None
    he_so_tx: float | None = None
    he_so_gk: float | None = None
    he_so_ck: float | None = None


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
        cursor.execute("""insert into giang_vien(ma_gv, ho_ten, gioi_tinh, luong, ngsinh, sdt, dia_chi, ng_bat_dau, ng_ket_thuc)
                          values (%s, %s, %s, %s, %s, %s, %s, %s, %s)""", (newRecord.ma_gv, 
                                                                             newRecord.ho_ten, 
                                                                             newRecord.gioi_tinh, 
                                                                             newRecord.luong, 
                                                                             newRecord.ngsinh, 
                                                                             newRecord.sdt, 
                                                                             newRecord.dia_chi, 
                                                                             newRecord.ng_bat_dau, 
                                                                             newRecord.ng_ket_thuc, 
                                                                             ))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_giangvien/")
async def update_record(newRecord: GIANGVIEN):
    try:
        cursor.execute("""update giang_vien set ho_ten = %s, gioi_tinh = %s, luong = %s, 
                          ngsinh = %s, sdt = %s, dia_chi = %s, ng_bat_dau = %s, ng_ket_thuc = %s
                          where ma_gv = %s""", (
                                                newRecord.ho_ten, 
                                                newRecord.gioi_tinh, 
                                                newRecord.luong, 
                                                newRecord.ngsinh, 
                                                newRecord.sdt, 
                                                newRecord.dia_chi, 
                                                newRecord.ng_bat_dau, 
                                                newRecord.ng_ket_thuc, 
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
        cursor.execute("select * from giang_vien where ma_gv = %s", (ma_gv,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from giang_vien where ma_gv = %s", (ma_gv,))
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
        cursor.execute("""insert into nganh(ma_nganh, ten_nganh)
                          values (%s, %s)""", (newRecord.ma_nganh, newRecord.ten_nganh))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_nganh/")
async def update_record(newRecord: NGANH):
    try:
        cursor.execute("""update nganh set ten_nganh = %s
                          where ma_nganh = %s""", (newRecord.ten_nganh, newRecord.ma_nganh))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_nganh/{ma_nganh}")
async def delete_record(ma_nganh: str):
    try:
        cursor.execute("select * from nganh where ma_nganh = %s", (ma_nganh,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from nganh where ma_nganh = %s", (ma_nganh,))
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
        cursor.execute("""insert into phong(phong, suc_chua, mo_ta)
                          values (%s, %s, %s)""", (newRecord.phong, newRecord.suc_chua, newRecord.mo_ta))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_phong/")
async def update_record(newRecord: PHONG):
    try:
        cursor.execute("""update phong set suc_chua = %s, mo_ta = %s 
                          where phong = %s""", (newRecord.suc_chua, 
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
        cursor.execute("select * from phong where phong = %s", (phong,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from phong where phong = %s", (phong,))
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
        cursor.execute("""insert into sinh_vien(ma_sv, ho_ten, gioi_tinh, ngsinh, sdt, ma_nganh, nam_bat_dau, lop)
                          values (%s, %s, %s, %s, %s, %s, %s, %s)""",  (newRecord.ma_sv, 
                                                                        newRecord.ho_ten, 
                                                                        newRecord.gioi_tinh, 
                                                                        newRecord.ngsinh, 
                                                                        newRecord.sdt, 
                                                                        newRecord.ma_nganh, 
                                                                        newRecord.nam_bat_dau, 
                                                                        newRecord.lop, 
                                                                        ))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_sinhvien/")
async def update_record(newRecord: SINHVIEN):
    try:
        cursor.execute("""update sinh_vien set ho_ten = %s, gioi_tinh = %s, ngsinh = %s,
                          sdt = %s, ma_nganh = %s, nam_bat_dau = %s, lop = %s
                          where ma_sv = %s""", (newRecord.ho_ten, 
                                                newRecord.gioi_tinh, 
                                                newRecord.ngsinh, 
                                                newRecord.sdt, 
                                                newRecord.ma_nganh, 
                                                newRecord.nam_bat_dau, 
                                                newRecord.lop, 
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
        cursor.execute("select * from sinh_vien where ma_sv = %s", (ma_sv,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from sinh_vien where ma_sv = %s", (ma_sv,))
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
        cursor.execute("""insert into hoc_phan(ma_hp, ten_hp, so_tin, mo_ta)
                        values (%s, %s, %s, %s)""", (newRecord.ma_hp, 
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
        cursor.execute("""update hoc_phan set ten_hp = %s, so_tin = %s, mo_ta = %s 
                          where ma_hp = %s""", (newRecord.ten_hp, 
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
        cursor.execute("select * from hoc_phan where ma_hp = %s", (ma_hp,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from hoc_phan where ma_hp = %s", (ma_hp,))
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
        cursor.execute("""insert into gv_hp(ma_gv, ma_hp)
                          values (%s, %s)""", (newRecord.ma_gv, 
                                               newRecord.ma_hp))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_gvien_hphan/")
async def update_record(newRecord: GIANGVIENHOCPHAN):
    try:
        cursor.execute("""update gv_hp set ma_gv = %s, ma_hp = %s 
                          where ma_gv = %s and ma_hp = %s""", (newRecord.ma_gv, 
                                                                newRecord.ma_hp, 
                                                                newRecord.ma_gv, 
                                                                newRecord.ma_hp))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_gvien_hphan/{ma_gv}_{ma_hp}")
async def delete_record(ma_gv: str, ma_hp: str):
    try:
        cursor.execute("select * from gv_hp where ma_gv = %s and ma_hp = %s", (ma_gv, ma_hp))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from gv_hp where ma_gv = %s and ma_hp = %s", (ma_gv, ma_hp))
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
        cursor.execute("""insert into chuong_trinh(ma_ct, ma_nganh)
                          values (%s, %s)""", (newRecord.ma_ct, newRecord.ma_nganh))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_chuongtrinh/")
async def update_record(newRecord: CHUONGTRINH):
    try:
        cursor.execute("""update chuong_trinh set ma_ct = %s, ma_nganh = %s 
                          where ma_ct = %s and ma_nganh = %s""", (newRecord.ma_ct, 
                                                                    newRecord.ma_nganh, 
                                                                    newRecord.ma_ct, 
                                                                    newRecord.ma_nganh))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_chuongtrinh/{ma_ct}_{ma_nganh}")
async def delete_record(ma_ct: str, ma_nganh: str):
    try:
        cursor.execute("select * from chuong_trinh where ma_ct = %s and ma_nganh = %s", (ma_ct, ma_nganh))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from chuong_trinh where ma_ct = %s and ma_nganh = %s", (ma_ct, ma_nganh))
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
        cursor.execute("""insert into hp_tien_quyet(ma_hp, hp_tien_quyet)
                          values (%s, %s)""", (newRecord.ma_hp, newRecord.hp_tien_quyet))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_hocphan_tienquyet/")
async def update_record(newRecord: HOCPHANTIENQUYET):
    try:
        cursor.execute("""update hp_tien_quyet set ma_hp = %s, hp_tien_quyet = %s 
                          where ma_hp = %s and hp_tien_quyet = %s""", (newRecord.ma_hp, 
                                                                        newRecord.hp_tien_quyet, 
                                                                        newRecord.ma_hp, 
                                                                        newRecord.hp_tien_quyet))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_hocphan_tienquyet/{ma_hp}_{hp_tien_quyet}")
async def delete_record(ma_hp: str, hp_tien_quyet: str):
    try:
        cursor.execute("select * from hp_tien_quyet where ma_hp = %s and hp_tien_quyet = %s", (ma_hp, hp_tien_quyet))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from hp_tien_quyet where ma_hp = %s and hp_tien_quyet = %s", (ma_hp, hp_tien_quyet))
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
        cursor.execute("""insert into chuong_trinh_hoc(ma_ct, ma_nganh, ma_hp, nam, ki)
                          values (%s, %s, %s, %s, %s)""", (newRecord.ma_ct, 
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
        cursor.execute("""update chuong_trinh_hoc set nam = %s, ki = %s 
                        where ma_ct = %s and ma_nganh = %s and ma_hp = %s""", (newRecord.nam, 
                                                                                newRecord.ki, 
                                                                                newRecord.ma_ct, 
                                                                                newRecord.ma_nganh, 
                                                                                newRecord.ma_hp))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_chuongtrinhhoc/{ma_ct}_{ma_nganh}_{ma_hp}")
async def delete_record(ma_ct: str, ma_nganh: str, ma_hp: str):
    try:
        cursor.execute("""select * from chuong_trinh_hoc where ma_ct = %s and 
                          ma_nganh = %s and ma_hp = %s""", (ma_ct, ma_nganh, ma_hp))
        deleted_record = cursor.fetchall()

        cursor.execute("""delete from chuong_trinh_hoc where ma_ct = %s and 
                          ma_nganh = %s and ma_hp = %s""", (ma_ct, ma_nganh, ma_hp))
        connect.commit()
        
        return {"message": f"Record with ID {ma_ct, ma_nganh, ma_hp} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e
    

# GET: get all table records
@app.get("/get_hocki/")
async def list_records():
    try:
        cursor.execute("select * from hoc_ki")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_hocki/")
async def create_records(newRecord: HOCKI):
    try:
        cursor.execute("""insert into hoc_ki(ma_hk, ng_bat_dau, ng_ket_thuc)
                          values (%s, %s, %s)""", (newRecord.ma_hk,
                                                    newRecord.ng_bat_dau, 
                                                    newRecord.ng_ket_thuc))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_hocki/")
async def update_record(newRecord: HOCKI):
    try:
        cursor.execute("""update hoc_ki set ng_bat_dau = %s, ng_ket_thuc = %s
                          where ma_hk = %s""", (newRecord.ng_bat_dau, 
                                                newRecord.ng_ket_thuc, 
                                                newRecord.ma_hk, 
                                                ))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_hocki/{ma_hk}")
async def delete_record(ma_hk: int):
    try:
        cursor.execute("select * from hoc_ki where ma_hk = %s", (ma_hk,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from hoc_ki where ma_hk = %s", (ma_hk,))
        connect.commit()
        
        return {"message": f"Record with ID {ma_hk} has been deleted", "deleted": deleted_record}
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
        cursor.execute("""insert into lich_hoc(ma_lh, ma_hp, ma_lop, so_luong, thoi_gian, ma_hk, he_so_tx, he_so_gk, he_so_ck)
                          values (%s, %s, %s, %s, %s, %s, %s, %s, %s)""", (newRecord.ma_lh, 
                                                                newRecord.ma_hp, 
                                                                newRecord.ma_lop, 
                                                                newRecord.so_luong,
                                                                newRecord.thoi_gian, 
                                                                newRecord.ma_hk,
                                                                newRecord.he_so_tx,
                                                                newRecord.he_so_gk,
                                                                newRecord.he_so_ck))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_lichhoc/")
async def update_record(newRecord: LICHHOC):
    try:
        cursor.execute("""update lich_hoc set ma_hp = %s, ma_lop = %s, so_luong = %s, 
                          thoi_gian = %s, ma_hk = %s, he_so_tx = %s, he_so_gk = %s, he_so_ck = %s where ma_lh = %s""", (newRecord.ma_hp, 
                                                                            newRecord.ma_lop, 
                                                                            newRecord.so_luong, 
                                                                            newRecord.thoi_gian,
                                                                            newRecord.ma_hk, 
                                                                            newRecord.he_so_tx,
                                                                            newRecord.he_so_gk,
                                                                            newRecord.he_so_ck,
                                                                            newRecord.ma_lh))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# # PUT: update record infomation
# @app.put("/put_coefficient/")
# async def update_record(coeffiecient: COEFFICIENT):
#     try:
#         cursor.execute("""update lich_hoc set he_so_tx = %s, he_so_gk = %s, he_so_ck = %s where ma_lh = %s""", (
#                                                                             coeffiecient.he_so_tx,
#                                                                             coeffiecient.he_so_gk,
#                                                                             coeffiecient.he_so_ck,
#                                                                             coeffiecient.ma_lh))
        
#         connect.commit()
#         return {"message": "Record updated successfully"}
#     except Exception as e:
#         return e


# DELETE: delete record
@app.delete("/delete_lichhoc/{ma_lh}")
async def delete_record(ma_lh: int):
    try:
        cursor.execute("select * from lich_hoc where ma_lh = %s", (ma_lh,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from lich_hoc where ma_lh = %s", (ma_lh,))
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
        cursor.execute("""insert into lh_gv(ma_lh, ma_gv)
                          values (%s. %s)""", (newRecord.ma_lh, newRecord.ma_gv))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_lichhoc_gvien/")
async def update_record(newRecord: LICHHOCGIAOVIEN):
    try:
        cursor.execute("""update lh_gv set ma_lh = %s,ma_gv = %s 
                          where ma_lh = %s and ma_gv = %s""", (newRecord.ma_lh, 
                                                                newRecord.ma_gv, 
                                                                newRecord.ma_lh, 
                                                                newRecord.ma_gv))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_lichhoc_gvien/{ma_lh}_{ma_gv}")
async def delete_record(ma_lh: int, ma_gv: str):
    try:
        cursor.execute("select * from lh_gv where ma_lh = %s and ma_gv = %s", (ma_lh, ma_gv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from lh_gv where ma_lh = %s and ma_gv = %s", (ma_lh, ma_gv))
        connect.commit()
        
        return {"message": f"Record with ID {ma_lh, ma_gv} has been deleted", "deleted": deleted_record}
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

# # POST: create a new record for a table
# @app.post("/post_dangky")
# async def create_records(newRecord: DANGKY):
#     try:
#         cursor.execute("""insert into dang_ky(ma_lh, ma_sv, diem_tx, diem_gk, diem_ck)
#                           values (%s, %s, %s, %s, %s)""", (newRecord.ma_lh, 
#                                                             newRecord.ma_sv, 
#                                                             newRecord.diem_tx,
#                                                             newRecord.diem_gk, 
#                                                             newRecord.diem_ck))
        
#         connect.commit()
#         return {"message": "Record created successfully", "Record": newRecord}
#     except Exception as e:
#         return e
    
# # PUT: update record infomation
# @app.put("/put_dangky/")
# async def update_record(newRecord: DANGKY):
#     try:
#         cursor.execute("""update dang_ky set diem_tx = %s, diem_gk = %s,
#                           diem_ck = %s where ma_lh = %s and ma_sv = %s""", (newRecord.diem_tx, 
#                                                                             newRecord.diem_gk,
#                                                                             newRecord.diem_ck, 
#                                                                             newRecord.ma_lh, 
#                                                                             newRecord.ma_sv))
        
#         connect.commit()
#         return {"message": "Record updated successfully", "Record": newRecord}
#     except Exception as e:
#         return e
    
# # DELETE: delete record
# @app.delete("/delete_dangky/{ma_lh}_{ma_sv}")
# async def delete_record(ma_lh: int, ma_sv: str):
#     try:
#         cursor.execute("select * from dang_ky where ma_lh = %s and ma_sv = %s", (ma_lh, ma_sv))
#         deleted_record = cursor.fetchall()

#         cursor.execute("delete from dang_ky where ma_lh = %s and ma_sv = %s", (ma_lh, ma_sv))
#         connect.commit()
        
#         return {"message": f"Record with ID {ma_lh, ma_sv} has been deleted", "deleted": deleted_record}
#     except Exception as e:
#         return e
    

# GET: get all table records
@app.get("/get_sinhvien_hocphan/")
async def list_records():
    try:
        cursor.execute("select * from sv_hp")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_sinhvien_hocphan/")
async def create_records(newRecord: SINHVIENHOCPHAN):
    try:
        cursor.execute("""insert into sv_hp(ma_hp, ma_sv, so_lan_hoc)
                          values (%s, %s, %s)""", (newRecord.ma_hp, newRecord.ma_sv, newRecord.so_lan_hoc))
        
        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e

# PUT: update record infomation
@app.put("/put_sinhvien_hocphan/")
async def update_record(newRecord: SINHVIENHOCPHAN):
    try:
        cursor.execute("""update nganh set so_lan_hoc = %s
                          where ma_hp = %s and ma_sv = %s""", (newRecord.so_lan_hoc, newRecord.ma_hp, newRecord.ma_sv))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e

# DELETE: delete record
@app.delete("/delete_sinhvien_hocphan/{ma_hp}_{ma_sv}")
async def delete_record(ma_hp: str, ma_sv: str):
    try:
        cursor.execute("select * from sv_hp where ma_hp = %s and ma_sv = %s", (ma_hp, ma_sv))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from sv_hp where ma_hp = %s and ma_sv = %s", (ma_hp, ma_sv))
        connect.commit()

        return {"message": f"Record with ID {ma_hp, ma_sv} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e
    

# GET: get all table records
@app.get("/get_user/")
async def list_records():
    try:
        cursor.execute("select * from user")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_user")
async def create_records(newRecord: USER):

    try:
        cursor.execute("""insert into user(username, pass_word, email, access_level)
                          values (%s, %s, %s, %s)""", (newRecord.username, 
                                                    bcrypt.hashpw(newRecord.pass_word.encode('utf8'), bcrypt.gensalt()),
                                                    newRecord.email, 
                                                    newRecord.access_level))

        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_user/")
async def update_record(newRecord: USER):
    try:
        cursor.execute("""update user set pass_word = %s, email = %s, access_level = %s
                          where username = %s""", (
                                                    bcrypt.hashpw(newRecord.pass_word.encode('utf8'), bcrypt.gensalt()),
                                                    newRecord.email,
                                                    newRecord.access_level,
                                                    newRecord.username
                                                  ))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_user/{username}")
async def delete_record(username: str):
    try:
        cursor.execute("select * from user where username = %s", (username,))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from user where username = %s", (username,))
        connect.commit()
        
        return {"message": f"Record with ID {username} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e
    

# GET: get all table records
@app.get("/get_dotdki/")
async def list_records():
    try:
        cursor.execute("select * from dot_dki")
        return cursor.fetchall()
    except Exception as e:
        return e

# POST: create a new record for a table
@app.post("/post_dotdki")
async def create_records(newRecord: DOTDKI):

    try:
        cursor.execute("""insert into dot_dki(dot, ma_hk, ng_bat_dau, ng_ket_thuc)
                          values (%s, %s, %s, %s)""", (newRecord.dot, 
                                                        newRecord.ma_hk,
                                                        newRecord.ng_bat_dau, 
                                                        newRecord.ng_ket_thuc))

        connect.commit()
        return {"message": "Record created successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# PUT: update record infomation
@app.put("/put_dotdki/")
async def update_record(newRecord: DOTDKI):
    try:
        cursor.execute("""update dot_dki set ng_bat_dau = %s, ng_ket_thuc = %s
                          where dot = %s and ma_hk = %s""", (
                                                            newRecord.ng_bat_dau, 
                                                            newRecord.ng_ket_thuc,
                                                            newRecord.dot,
                                                            newRecord.ma_hk
                                                            ))
        
        connect.commit()
        return {"message": "Record updated successfully", "Record": newRecord}
    except Exception as e:
        return e
    
# DELETE: delete record
@app.delete("/delete_dotdki/{dot}_{ma_hk}")
async def delete_record(dot: int, ma_hk: int):
    try:
        cursor.execute("select * from dot_dki where dot = %s and ma_hk = %s", (dot, ma_hk))
        deleted_record = cursor.fetchall()

        cursor.execute("delete from dot_dki where dot = %s and ma_hk = %s", (dot, ma_hk))
        connect.commit()
        
        return {"message": f"Record with ID {dot, ma_hk} has been deleted", "deleted": deleted_record}
    except Exception as e:
        return e
    

origins = origins = ["http://localhost:5173"]


# Cập nhật các URL cho phù hợp với URL của ứng dụng frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)