from connector import *
import pandas as pd
from database_model import *
import random
from datetime import datetime, timedelta
import bcrypt
import csv

# Danh sach hoc phan
df = pd.read_excel("./backend/database/TKB-HKI-2023-2024.xlsx", engine="openpyxl")
danh_sach_hoc_phan = []
hoc_phan_dict = dict()
for x, y, z in zip(df["Mã \nhọc phần"][1:], df["Học phần"][1:], df["Số\nTC"].fillna(2)[1:]):
    if x not in hoc_phan_dict:
        hoc_phan_dict[x] = 1
        danh_sach_hoc_phan.append((x, y, z))
        
with open('./backend/database/danh_sach_hoc_phan.csv', 'w', encoding='utf-8') as file_a:
    file_a.write('ma_hp,ten_hp,so_tin\n')
    for element in danh_sach_hoc_phan:
        ma_hp, ten_hp, so_tin = element[0], element[1], str(element[2])
        file_a.write(f"{ma_hp},{ten_hp},{so_tin}\n")

# Nhap vao database
# try:
#     for element in danh_sach_hoc_phan:
#         cursor.execute("""
#                        INSERT INTO hoc_phan (ma_hp, ten_hp, so_tin)
#                        VALUES(%s, %s, %s)
#                        """, element)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

# Danh sach nganh
danh_sach_nganh = [
    ('QHT01', 'Toán học'),
    ('QHT02', 'Toán tin'),
    ('QHT98', 'Khoa học máy tính và thông tin (*)(**)'),
    ('QHT93', 'Khoa học dữ liệu (*)')
]

# Nhap vao database
# try:
#     for element in danh_sach_nganh:
#         cursor.execute("""
#                     INSERT into nganh
#                     VALUES (%s, %s)
#                     """, element)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

# Danh sach phong
danh_sach_phong = []
for i in range(1, 6):
    for k in range(1, 16):
        if k < 10: danh_sach_phong.append((f'{i}0{k}-T{i}',80,f'Phòng {i}0{k} tòa T{i}'))
        else: danh_sach_phong.append((f'{i}{k}-T{i}',80,f'Phòng {i}{k} tòa T{i}'))

with open('./backend/database/danh_sach_phong.csv', 'w', encoding='utf-8') as file_a:
    file_a.write('phong,suc_chua,mo_ta\n')
    for element in danh_sach_phong:
        phong, suc_chua, mo_ta = element
        file_a.write(f'{phong},{suc_chua},{mo_ta}\n')

# Nhap vao database
# try:
#     for row in danh_sach_phong:
#         for element in row:
#             cursor.execute("""
#                            INSERT INTO phong
#                            VALUES (%s, %s, %s)
#                            """, element)
#             conn.commit()
# except Exception as e:
#     print(f"Error: {e}") 

# Danh sach hoc phan tien quyet
danh_sach_hoc_phan_tien_quyet = [
    ("PEC1008", "PHI1006"),
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
    ("MAT2316", "INM1000"),
    ("MAT2317", "INM1000"),
    ("MAT2318", "INM1000"),
    ("MAT2319", "INM1000"),
    ("MAT3500", "MAT2400"),
    ("MAT3500", "MAT2501"),
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
    ("MAT3397", "MAT3533"),
    ("MAT3398", "MAT3533")
]

with open('./backend/database/hoc_phan_tien_quyet.csv', 'w', encoding='utf-8') as file_a:
    file_a.write('ma_hp,hp_tien_quyet\n')
    for element in danh_sach_hoc_phan_tien_quyet:
        ma_hp, hp_tien_quyet = element
        file_a.write(f'{ma_hp},{hp_tien_quyet}\n')
        
# Nhap vao database
# try:
#     for element in danh_sach_hoc_phan_tien_quyet:
#         cursor.execute("""
#                        INSERT INTO hp_tien_quyet
#                        VALUES (%s, %s)
#                        """, element)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

# Danh sach chuong trinh
danh_sach_chuong_trinh = [
    ('KCT_01', 'QHT01'),
    ('KCT_02', 'QHT02'),
    ('KCT_98', 'QHT98'),
    ('KCT_93', 'QHT93') 
]

with open('./backend/database/danh_sach_chuong_trinh.csv', 'w', encoding='utf-8') as file_a:
    file_a.write('ma_ct,ma_nganh\n')
    for element in danh_sach_chuong_trinh:
        ma_ct, ma_nganh = element
        file_a.write(f'{ma_ct},{ma_nganh}\n')

# Nhap vao database        
# try:
#     for element in danh_sach_chuong_trinh:
#         cursor.execute("""
#                        INSERT INTO chuong_trinh
#                        VALUES (%s, %s)
#                        """, element)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")
    
# Danh sach chuong trinh hoc
df2 = pd.read_csv("./backend/database/danh_sach_chuong_trinh_hoc.csv")
danh_sach_chuong_trinh_hoc = [(a1, a2, a3, a4, a5) for a1, a2, a3, a4, a5 in zip(df2["ma_chuong_trinh"], df2["ma_nganh"], df2["ma_hp"], df2["nam"], df2["ki"])]

# Nhap vao database
# try:
#     for element in danh_sach_chuong_trinh:
#         cursor.execute("""
#                        INSERT INTO chuong_trinh_hoc
#                        values (%s, %s, %s, %s, %s)
#                        """, element)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

def generate_names(count):
    first_names = ["Nguyen", "Tran", "Le", "Pham", "Hoang", "Vo", "Ngo", "Do", "Luong", "Truong", "Dang", "Mai", "Bui"]
    middle_names = ["Van", "Thi", "Minh", "Duc", "Thi", "Quang", "Van", "Thi", "Van", "Thi", "Van", "Van", "Van"]
    last_names = ["An", "Bao", "Chau", "Dung", "Lan", "Hieu", "Anh", "Cuong", "Diep", "Duong", "Ha", "Hung", "Huong",
                  "Khoi", "Lien", "Minh", "Ngoc", "Phuc", "Quyen", "Son", "Thu", "Thang", "Uyen", "Xuan", "Yen", "Mai",
                  "Nhan", "Oanh", "Phuong", "Quang", "Lan Anh", "Thanh", "Trang", "Tuan", "Thao", "Anh", "Binh", "Cam",
                  "Dinh", "Ha", "Hieu", "Long", "Mai", "Nam", "Nga", "Quoc", "Thuy", "Thanh", "Truc"]

    student_names = []
    for _ in range(count):
        full_name = f"{random.choice(first_names)} {random.choice(middle_names)} {random.choice(last_names)}"
        student_names.append(full_name)

    return student_names
# Danh sach ten giang vien
danh_sach_ten_giang_vien = generate_names(100)
# Danh sach ten sinh vien
danh_sach_ten_sinh_vien = generate_names(200)

def generate_hanoi_addresses(count):
    streets = ["Hang Bai", "Trang Tien", "Ngo Quyen", "Dien Bien Phu", "Phan Boi Chau", "Ba Trieu", "Le Duan", "Hoang Dieu",
               "Ton Duc Thang", "Ly Thuong Kiet", "Cau Go", "Hang Cot", "Hang Vai", "Hang Be", "Hang Trong", "Hang Ma",
               "Hang Bong", "Hang Gai", "Hang Dong", "Hang Hom", "Hang Da", "Hang Buom", "Hang Khay", "Hang Khoai",
               "Hang Duong", "Hang Tre", "Hang Non", "Hang Thiec", "Hang Ca", "Hang Can", "Hang Chieu", "Hang Bac",
               "Hang Bo", "Hang Luoc", "Hang Quat", "Hang Kho", "Hang Chao", "Hang Dong", "Hang Duong", "Hang Trong",
               "Hang Ngang", "Hang Dao", "Hang Than", "Hang Ruoi", "Hang Voi", "Hang Go", "Hang Son"]

    districts = ["Hoan Kiem", "Ba Dinh", "Hai Ba Trung", "Dong Da", "Cau Giay", "Thanh Xuan", "Tay Ho", "Ha Dong", "Nam Tu Liem"]

    hanoi_addresses = []
    for _ in range(count):
        address = f"{random.choice(streets)}, {random.choice(districts)}, Hanoi"
        hanoi_addresses.append(address)

    return hanoi_addresses

# Danh sach dia chi
danh_sach_dia_chi_giang_vien = generate_hanoi_addresses(100)

def generate_random_phone_number():
    phone_number = "0" + str(random.randint(9, 9))  # Random first digit
    phone_number += "".join([str(random.randint(0, 9)) for _ in range(8)])  # Random remaining 9 digits
    return phone_number

# Danh sach sdt
danh_sach_sdt_giang_vien = [generate_random_phone_number() for _ in range(100)]
danh_sach_sdt_sinh_vien = [generate_random_phone_number() for _ in range(200)]

def generate_random_dates(start_date, end_date, count):
    date_list = []
    for _ in range(count):
        random_days = random.randint(0, (end_date - start_date).days)
        random_date = start_date + timedelta(days=random_days)
        date_list.append(random_date.strftime('%Y-%m-%d'))
    return date_list

start_date1 = datetime(2001, 1, 1)
end_date1 = datetime(2003, 12, 31)

danh_sach_ngsinh_sinh_vien = generate_random_dates(start_date1, end_date1, 200)

start_date2 = datetime(1960, 1, 1)
end_date2 = datetime(1980, 12, 31)

danh_sach_ngsinh_giang_vien = generate_random_dates(start_date2, end_date2, 100)

# Danh sach giang vien
danh_sach_giang_vien = [
    (f'{10000000 + i + 1}', danh_sach_ten_giang_vien[i], 'Nam' if i % 2 == 0 else 'Nu', round(random.random(), 2) * 100000, danh_sach_ngsinh_giang_vien[i], danh_sach_sdt_giang_vien[i], danh_sach_dia_chi_giang_vien[i], '2001/01/01', '2030/01/01') for i in range(0, 100)
]
danh_sach_ma_giang_vien = [f'{10000000 + i + 1}' for i in range(0, 100)]
with open('./backend/database/danh_sach_giang_vien.csv', 'w', encoding='utf-8') as file_a:
    file_a.write('ma_gv,ho_ten,gioi_tinh,luong,ngsinh,sdt,dia_chi,ng_bat_dau,ng_ket_thuc\n')
    for element in danh_sach_giang_vien:
        ma_gv, ho_ten, gioi_tinh, luong, ngsinh, sdt, dia_chi, ng_bat_dau, ng_ket_thuc = element
        file_a.write(f'{ma_gv},{ho_ten},{gioi_tinh},{luong},{ngsinh},{sdt},{dia_chi},{ng_bat_dau},{ng_ket_thuc}\n')
# Nhap vao database
# try:
#     for element in danh_sach_giang_vien:
#         cursor.execute("""
#                        INSERT INTO giang_vien
#                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
#                        """, element)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

# Danh sach sinh vien
danh_sach_sinh_vien = [
    (f'{21000000 + i + 1}', danh_sach_ten_sinh_vien[i], 'Nu' if i % 2 == 0 else 'Nam', danh_sach_ngsinh_sinh_vien[i], danh_sach_sdt_sinh_vien[i], random.choice(danh_sach_nganh)[0], 2021, f'K66A{i % 4 + 1}') for i in range(0, 200)
]

with open('./backend/database/danh_sach_sinh_vien.csv','w',encoding='utf-8') as file_a:
    file_a.write('ma_sv,ho_ten,gioi_tinh,ngsinh,sdt,ma_nganh,nam_bat_dau,lop\n')
    for element in danh_sach_sinh_vien:
        ma_sv, ho_ten, gioi_tinh, ngsinh, sdt, ma_nganh, nam_bat_dau, lop = element
        file_a.write(f'{ma_sv},{ho_ten},{gioi_tinh},{ngsinh},{sdt},{ma_nganh},{nam_bat_dau},{lop}\n')
        
# Nhap vao database
# try:
#     for element in danh_sach_sinh_vien:
#         cursor.execute("""
#                        INSERT INTO sinh_vien
#                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
#                        """, element)
#         conn.commit()
# except Exception as e:
#     print(f"Error: {e}")

password = "123456"
pwdBytes = password.encode('utf-8')
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(pwdBytes, salt)

danh_sach_user = [("admin101", hashed,"admin101@gmail.com","AD")]

# existing_username = dict()
# for element in danh_sach_giang_vien:
#     username = element[1].replace(" ", "").lower()
#     if username not in existing_username:
#         existing_username[username] = 1
#         pass_word = bcrypt.hashpw(element[0].encode('utf8'),bcrypt.gensalt())
#         email = username + "@gmail.com"
#         access_level = "GV"
#         danh_sach_user.append((username, pass_word, email, access_level))
#     else:
#         existing_username[username] += 1
#         new_username = username + str(existing_username[username])
#         pass_word = bcrypt.hashpw(element[0].encode('utf8'),bcrypt.gensalt())
#         email = new_username + "@gmail.com"
#         access_level = "GV"
#         danh_sach_user.append((new_username, pass_word, email, access_level))
        
# for element in danh_sach_sinh_vien:
#     username = element[1].replace(" ", "").lower()
#     if username not in existing_username:
#         existing_username[username] = 1
#         pass_word = bcrypt.hashpw(element[0].encode('utf8'),bcrypt.gensalt())
#         email = username + "@gmail.com"
#         access_level = "SV"
#         danh_sach_user.append((username, pass_word, email, access_level))
#     else:
#         existing_username[username] += 1
#         new_username = username + str(existing_username[username])
#         pass_word = bcrypt.hashpw(element[0].encode('utf8'),bcrypt.gensalt())
#         email = new_username + "@gmail.com"
#         access_level = "SV"
#         danh_sach_user.append((new_username, pass_word, email, access_level))

# with open('./backend/database/danh_sach_user.csv', 'w', encoding='utf-8') as file_a:
#     file_a.write('username,pass_word,email,access_level\n')
#     for element in danh_sach_user:
#         username, pass_word, email, access_level = element
#         file_a.write(f'{username},{pass_word},{email},{access_level}\n')
        
danh_sach_ma_hoc_phan = [(ma_hp, ma_lop) for ma_lop, ma_hp in zip(df["Mã \nhọc phần"][1:],df['Mã lớp \n học phần'][1:])]
danh_sach_thu_tiet = [(thu, tiet) for thu, tiet in zip(df["Thứ"][1:],df["Tiết"][1:])]

danh_sach_lich_hoc = []
for i in range(len(danh_sach_ma_hoc_phan)):
    ma_lh = f'LH-{i}'
    ma_hp = danh_sach_ma_hoc_phan[i][0]
    ma_lop = danh_sach_ma_hoc_phan[i][1]
    so_luong = 80
    thoi_gian = {"Thu": f"{danh_sach_thu_tiet[i][0]}", "Tiet": f'{danh_sach_thu_tiet[i][1]}'}
    ma_hk = 'I'
    danh_sach_lich_hoc.append((ma_lh, ma_hp, ma_lop, so_luong, thoi_gian, ma_hk))

# with open('./backend/database/danh_sach_lich_hoc.csv', 'w', encoding='utf-8', newline='') as file_a:
#     writer = csv.writer(file_a)
#     writer.writerow(['ma_lh', 'ma_hp', 'ma_lop', 'so_luong', 'thoi_gian', 'ma_hk'])
#     for element in danh_sach_lich_hoc:
#         writer.writerow(element)
        
danh_sach_lh_gv = [(ma_hp, ma_gv) for ma_hp, ma_gv in zip(hoc_phan_dict.keys(), danh_sach_ma_giang_vien)]

with open('./backend/database/danh_sach_gv_hp.csv', 'w', encoding='utf-8', newline='') as file_a:
    writer = csv.writer(file_a)
    writer.writerow(['ma_hp','ma_gv'])
    for element in danh_sach_lh_gv:
        writer.writerow(element)