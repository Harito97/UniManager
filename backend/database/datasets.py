# from connector import *
import pandas as pd
from database_model import *
import numpy as np

# df = pd.read_excel("TKB-HKI-2023-2024.xlsx", engine="openpyxl")
# danh_sach_hoc_phan = []
# hoc_phan_dict = dict()
# for x, y, z in zip(df["Mã \nhọc phần"][1:], df["Học phần"][1:], df["Số\nTC"].fillna(2)[1:]):
#     if x not in hoc_phan_dict:
#         hoc_phan_dict[x] = 1
#         danh_sach_hoc_phan.append((x, y, z))
# print(danh_sach_hoc_phan)
# print(df["Số\nTC"].fillna(2).to_string())
# print(len(danh_sach_hoc_phan))

# try:
#     for element in danh_sach_hoc_phan:
#         values = (element[0], element[1], element[2])
#         cursor.execute("""
#                        INSERT INTO hoc_phan (ma_hp, ten_hp, so_tin)
#                        VALUES(%s, %s, %s)
#                        """, values)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

danh_sach_nganh = [
    ('QHT01', 'Toán học'),
    ('QHT02', 'Toán tin'),
    ('QHT98', 'Khoa học máy tính và thông tin (*)(**)'),
    ('QHT93', 'Khoa học dữ liệu (*)'),
    ('QHT03', 'Vật lý học'),
    ('QHT04', 'Khoa học vật liệu'),
    ('QHT05', 'Công nghệ kỹ thuật hạt nhân'),
    ('QHT94', 'Kỹ thuật điện tử và tin học'),
    ('QHT06', 'Hóa học'),
    ('QHT41', 'Hóa học(***)'),
    ('QHT42', 'Công nghệ kỹ thuật hóa học(**)'),
    ('QHT43', 'Hóa dược(**)'),
    ('QHT08', 'Sinh học'),
    ('QHT44', 'Công nghệ sinh học(**)'),
    ('QHT10', 'Địa lý tự nhiên'),
    ('QHT91', 'Khoa học thông tin địa không gian(*)'),
    ('QHT12', 'Quản lý đất đai'),
    ('QHT95', 'Quản lý phát triển đô thị và bất động sản'),
    ('QHT13', 'Khoa học môi trường'),
    ('QHT46', 'Công nghệ kỹ thuật môi trường(**)'),
    ('QHT17', 'Hải dương học'),
    ('QHT92', 'Tài nguyên và môi trường nước(*)'),
    ('QHT18', 'Địa chất học'),
    ('QHT20', 'Quản lý tài nguyên và môi trường'),
    ('QHT97', 'Công nghệ quan trắc và giám sát tài nguyên môi trường(*)')
]

with open('danh_sach_nganh.csv', 'w', encoding='utf8') as file1:
    file1.write('ma_nganh,ten_nganh\n')
    for item in danh_sach_nganh:
        ma_nganh,ten_nganh = item
        file1.write(f"{ma_nganh},{ten_nganh}\n")

# with open('hoc_phan_tien_quyet.csv', 'w') as file2:
#     file2.write("Ma_HP,HP_Tien_quyet\n")
#     for item in danh_sach_hoc_phan_tien_quyet:
#         ma_hp, hp_tien_quyet = item
#         file2.write(f"{ma_hp},{hp_tien_quyet}\n")
# try:
#     for element in danh_sach_nganh:
#         values = (element[0], element[1])
#         cursor.execute("""
#                     INSERT into nganh
#                     VALUES (%s, %s)
#                     """, values)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

danh_sach_phong = [
    [(f'T3-P{i}', 80, f"Tòa T3 - Phòng số {i}") for i in range(1, 11)],
    [(f'T4-P{i}', 80, f"Tòa T4 - Phòng số {i}") for i in range(1, 11)],
    [(f'T5-P{i}', 120, f"Tòa T5 - Phòng số {i}") for i in range(1, 21)],
    [(f'T2-P{i}', 80, f"Tòa T2 - Phòng số {i}") for i in range(1, 11)],
    [(f'T1-P{i}', 80, f"Tòa T1 - Phòng số {i}") for i in range(1, 11)]
]

with open('danh_sach_phong.csv', 'w', encoding='utf8') as file:
    file.write('phong,suc_chua,mo_ta\n')
    for item in danh_sach_phong:
        phong,suc_chua,mo_ta = item[0], item[1], item[2]
        file.write(f'{phong},{suc_chua},{mo_ta}\n')
# try:
#     for row in danh_sach_phong:
#         for element in row:
#             values = (element[0], element[1], element[2])
#             cursor.execute("""
#                            INSERT INTO phong
#                            VALUES (%s, %s, %s)
#                            """, values)
#             conn.commit()
# except Exception as e:
#     print(f"Error: {e}") 

danh_sach_hoc_phan_tien_quyet = [
    ("PHI1006", ""),
    ("PEC1008", "PHI1006"),
    ("PHI1002", ""),
    ("HIS1001", ""),
    ("POL1001", ""),
    ("FLF1107", ""),
    ("FLF1307", ""),
    ("FLF1407", ""),
    ("INM1000", ""),
    ("HIS1056", ""),
    ("GEO1050", ""),
    ("THL1057", ""),
    ("MAT1060", ""),
    ("PHY1070", ""),
    ("PHY1020", ""),
    ("PHY1100", ""),
    ("PHY1103", ""),
    ("MAT2400", ""),
    ("MAT2501", ""),
    ("MAT2502", "MAT2501"),
    ("MAT2503", "MAT2502"),
    ("MAT2503", "MAT2400"),
    ("MAT2403", "MAT2501"),
    ("MAT2403", "AMT2400"),
    ("MAT2034", "MAT2502"),
    ("MAT2034", "MAT2403"),
    ("MAT2034", "MAT3372"),
    ("MAT2323", "MAT2502"),
    ("MAT2323", "MAT2316"),
    ("MAT2323", "MAT2317"),
    ("MAT2323", "MAT2318"),
    ("MAT2323", "MAT2319"),
    ("MAT2407", "MAT2502"),
    ("MAT2315", "MAT3514"),
    ("MAT2315", "MAT2323"),
    ("MAT2315", "MAT2506"),
    ("MAT2315", "MAT2034"),
    ("MAT2506", ""),
    ("MAT2316", "INM1000"),
    ("MAT2317", "INM1000"),
    ("MAT2318", "INM1000"),
    ("MAT2319", "INM1000"),
    ("MAT3500", "MAT2400"),
    ("MAT3500", "MAT2501"),
    ("MAT3557", ""),
    ("MAT3372", "MAT2316"),
    ("MAT3372", "MAT2317"),
    ("MAT3372", "MAT3218"),
    ("MAT3372", "MAT2319"),
    ("MAT3514", "MAT3372"),
    ("MAT3514", "MAT3500"),
    ("MAT3507", "MAT2316"),
    ("MAT3507", "MAT2317"),
    ("MAT3507", "MAT2318"),
    ("MAT3507", "MAT2319"),
    ("MAT2278", "MAT3507"),
    ("MAT2278", "MAT3372"),
    ("MAT3148", "MAT3514"),
    ("MAT3148", "MAT3557"),
    ("MAT3379", "MAT2323"),
    ("MAT3379", "MAT2400"),
    ("MAT3379", "MAT2316"),
    ("MAT3379", "MAT2317"),
    ("MAT3379", "MAT2318"),
    ("MAT3379", "MAT2319"),
    ("MAT3533", "MAT2034"),
    ("MAT3533", "MAT3514"),
    ("MAT3533", "MAT2323"),
    ("MAT3533", "MAT2400"),
    ("MAT3380", "MAT3514"),
    ("MAT3380", "MAT2323"),
    ("MAT3381", "MAT3372"),
    ("MAT3381", "MAT3507"),
    ("MAT3381", "MAt2506"),
    ("MAT3382", "MAT3514"),
    ("MAT3383", "MAT3372"),
    ("MAT3383", "MAT3500"),
    ("MAT3384", "MAT3533"),
    ("MAT3385", "MAT3372"),
    ("MAT3504", "MAT3514"),
    ("MAT3508", "MAT3372"),
    ("MAT3508", "MAT3507"),
    ("MAT3534", "MAT3507"),
    ("MAT3534", "MAT2323"),
    ("MAT3386", "MAT2323"),
    ("MAT3387", "MAT2323"),
    ("MAT3388", "MAT3507"),
    ("MAT3388", "MAT2323"),
    ("MAT3389", "MAT2323"),
    ("MAT3390", "MAT3533"),
    ("MAT3391", "MAT3372"),
    ("MAT3391", "MAT3500"),
    ("MAT3392", "MAT3507"),
    ("MAT3392", "MAT2323"),
    ("MAT3393", "MAT3533"),
    ("MAT3394", "MAT2403"),
    ("MAT3562", "MAT3533"),
    ("MAT3395", "MAT2323"),
    ("MAT3535", "MAT3514"),
    ("MAT3399", "MAT3533"),
    ("MAT4083", ""),
    ("MAT3397", "MAT3533"),
    ("MAT3398", "MAT3533")
]

with open('hoc_phan_tien_quyet.csv', 'w') as file2:
    file2.write("Ma_HP,HP_Tien_quyet\n")
    for item in danh_sach_hoc_phan_tien_quyet:
        ma_hp, hp_tien_quyet = item
        file2.write(f"{ma_hp},{hp_tien_quyet}\n")
        

