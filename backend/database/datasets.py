from connector import *
import pandas as pd
from database_model import *
import numpy as np

df = pd.read_excel("TKB-HKI-2023-2024.xlsx", engine="openpyxl")
danh_sach_hoc_phan = []
hoc_phan_dict = dict()
for x, y, z in zip(df["Mã \nhọc phần"][1:], df["Học phần"][1:], df["Số\nTC"].fillna(2)[1:]):
    if x not in hoc_phan_dict:
        hoc_phan_dict[x] = 1
        danh_sach_hoc_phan.append((x, y, z))
# print(danh_sach_hoc_phan)
# print(df["Số\nTC"].fillna(2).to_string())
# print(len(danh_sach_hoc_phan))

try:
    for element in danh_sach_hoc_phan:
        values = (element[0], element[1], element[2])
        cursor.execute("""
                       INSERT INTO hoc_phan (ma_hp, ten_hp, so_tin)
                       VALUES(%s, %s, %s)
                       """, values)
        conn.commit()
except Exception as e:
    print(f"Error: {e}")

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