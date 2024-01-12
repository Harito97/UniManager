from pydantic import BaseModel

class TaiKhoan(BaseModel):
    id: str
    mat_khau: bytes
    quyen: int

class SinhVien(BaseModel):
    id: str
    ten: str
    gioi_tinh: str
    ngay_sinh: str
    nien_khoa: str
    ct_hoc: str
    gpa: float

class ChuongTrinhHoc(BaseModel):
    id: str
    ten: str
    mo_ta: str

class GiangVien(BaseModel):
    id: str
    ten: str
    gioi_tinh: str
    ngay_sinh: str

class LoaiPhong(BaseModel):
    id: str
    mo_ta: str

class PhongHoc(BaseModel):
    id: str
    id_loai_phong: str
    so_cho: int

class HocPhan(BaseModel):
    id: str
    ten: str
    so_tin: int
    mo_ta: str

class MonHoc(BaseModel):
    id: str
    id_hoc_phan: str
    ky_hoc: str
    so_sv: int
    he_so_tx: float
    he_so_gk: float
    he_so_ck: float

class CaHoc(BaseModel):
    id_hoc_phan: str
    tinh_chat: str
    so_ca: int

class HPTQ(BaseModel):
    id_hp: str
    id_hp_tq: str

class CTH_HP(BaseModel):
    id_cth: str
    id_hp: str
    hk_dx: str

class HP_LP(BaseModel):
    id_hp: str
    id_lp: str
    
class GV_HP(BaseModel):
    id_gv: str
    id_hp: str

class GV_MH(BaseModel):
    id_gv: str
    id_mh: str

class SV_HP(BaseModel):
    id_sv: str
    id_hp: str
    diem_tx: float
    diem_gk: float
    diem_ck: float

class SV_MH(BaseModel):
    id_sv: str
    id_mh: str

class TKB(BaseModel):
    id_mh: str
    id_ph: str
    _time: str
    id_gv: str
    _tinh_chat: int
