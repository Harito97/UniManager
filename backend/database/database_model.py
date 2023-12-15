from pydantic import BaseModel

class giang_vien(BaseModel):
    ma_gv: str
    ho_ten: str
    gioi_tinh: str
    luong: float
    ngsinh: str
    sdt: str
    email: str
    dia_chi: str
    ng_bat_dau: str
    ng_ket_thuc: str
    hoc_ham: str
    hoc_vi: str
    ma_bm: str
    password: str
    quyen: int
    
class nganh(BaseModel):
    ma_nganh: str
    ten_nganh: str

class lh_gv(BaseModel):
    ma_lh: int
    ma_gv: str
    
class gv_hp(BaseModel):
    ma_gv: str
    ma_hp: str
    
class hoc_phan(BaseModel):
    ma_hp: str
    ten_hp: str
    so_tin: int
    mo_ta: str
    
class chuong_trinh(BaseModel):
    ma_ct: str
    ma_nganh: str
    
class lich_hoc(BaseModel):
    ma_lh: int
    ma_hp: str
    ma_lop: int
    nam: int
    ki: int
    
class lh_thoi_gian(BaseModel):
    ma_lh: int
    thoi_gian: str
    phong: str
    ma_gv: str
    
class phong(BaseModel):
    phong: str
    suc_chua: int
    mo_ta: str

class hp_tien_quyet(BaseModel):
    ma_hp: str
    hp_tien_quyet: str
    
class ct_hoc(BaseModel):
    ma_ct: str
    ma_nganh: str
    ma_hp: str
    nam: int
    ki: int
    
class dang_ky(BaseModel):
    ma_lh: str
    ma_sv: str
    diem_tx: float
    he_so_tx: float
    diem_gk: float
    he_so_gk: float
    diem_ck: float
    he_so_ck: float
    
class sinh_vien(BaseModel):
    ma_sv: str
    ho_ten: str
    gioi_tinh: str
    ngsinh: str
    sdt: str
    email: str
    gpa: float
    ma_nganh: str
    nam_bat_dau: int
    lop: str
    password: str