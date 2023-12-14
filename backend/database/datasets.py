from connector import *
import random
from database_model import *


# print(element for element in danh_sach_hoc_phan if element[2] == "nan")
# try:
#     for element in danh_sach_hoc_phan:
#         values = (element[0], element[1], element[2])
#         cursor.execute("""
#                     INSERT INTO hoc_phan (ma_hp, ten_hp, so_tin)
#                     values (%s, %s, %s)
#                     ON DUPLICATE KEY UPDATE ma_hp = ma_hp;
#                     """, values)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

giang_vien_samples = [
    giang_vien(
        ma_gv=f'GV{i}',
        ho_ten=f'Giang Vien {i}',
        gioi_tinh='Nam' if i % 2 == 0 else 'Nu',
        luong=5000.0 + i * 1000,
        ngsinh=f'1990-0{i}-01',
        sdt=f'01234567{i}',
        email=f'gv{i}@example.com',
        dia_chi=f'{i} ABC Street, XYZ City',
        ng_bat_dau=f'2022-0{i}-01',
        ng_ket_thuc=f'2023-0{i}-01',
        hoc_ham='Giao su' if i % 2 == 0 else 'Pho giao su',
        hoc_vi='Tien si',
        ma_bm=f'BM{i}',
        password=f'password{i}',
        quyen=i % 2
    ) for i in range(1,6)
]

nganh_samples = [
    nganh(ma_nganh=f'N{i}', ten_nganh=f'Nganh {i}') for i in range(1,6)
]

lh_gv_samples = [
    lh_gv(ma_lh=i, ma_gv=f'GV{i}') for i in range(1,6)
]

hoc_phan_samples = {
    hoc_phan(ma_hp=f"HP{i}",ten_hp=f"HP{i}",so_tin=3,mo_ta="") for i in range(1,6)
}

gv_hp_samples = {
    gv_hp(ma_gv=f"GV{i}", ma_hp=f"HP{i}") for i in range(1,6)
    
}

chuong_trinh_samples = {
    chuong_trinh(ma_ct=f"CT{i}", ma_nganh=f"Nganh{i}") for i in range(1,6)
}

lich_hoc_samples = {
    lich_hoc(ma_lh=i, ma_hp=f"HP{i}", ma_lop=i, nam=i, ki=1) for i in range(1,6)
}

lh_thoi_gian_samples = {
    lh_thoi_gian(ma_lh=i, thoi_gian="T2", phong=i, ma_gv=f"GV{i}") for i in range(1,6)
}

phong_samples = {
    phong(phong=f"Phong{i}", suc_chua=100, mo_ta="") for i in range(1,6)
}

hp_tien_quyet_samples = {
    hp_tien_quyet(ma_hp=f"HP{i}", hp_tien_quyet="")
}

ct_hoc_samples = {
    ct_hoc(ma_ct=f"CT{i}", ma_nganh=f"Nganh{i}",ma_hp=f"HP{i}",nam=i, ki=1) for i in range(1,6)
}

dang_ki_samples = {
    dang_ky(ma_lh=i,ma_sv=f"SV{i}",diem_tx=10*random.random(), he_so_tx=0.2, diem_gk=10*random.random(), he_so_gk=0.2, diem_ck=10*random.random(), he_so_ck=0.6) for i in range(1,6)
}

sinh_vien_samples = {
    sinh_vien(ma_sv=f"SV{i}", ho_ten=f"Sinh vien so {i}", gioi_tinh='Nam' if i % 2 == 0 else 'Nu', ngsinh=f'2003-0{i}-01',sdt=f'01234567{i}', email=f'sv{i}@example.com', gpa=4*random.random(), ma_nganh=f"Nganh{i}",nam_bat_dau=random.choice([1,2,3,4]),lop=f"Lop{i}",password="")
}
try:
    for sample in giang_vien_samples:
        values = (sample.ma_gv, sample.ho_ten, sample.gioi_tinh, sample.luong, sample.ngsinh, sample.sdt, sample.email, sample.dia_chi, sample.ng_bat_dau, sample.ng_ket_thuc, sample.hoc_ham, sample.hoc_vi, sample.ma_bm, sample.password, sample.quyen)
        cursor.execute("""
                    INSERT INTO giang_vien
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, values)
        conn.commit()
except Exception as e:
    print(f"Error: {e}")

try:
    for sample in nganh_samples:
        values = (sample.ma_nganh, sample.ten_nganh)
        cursor.execute("""
                       INSERT INTO nganh
                       VALUES (%s, %s)
                       """, values)
        conn.commit()
except Exception as e:
    print(f"Error{e}")
    
try:
    for sample in 