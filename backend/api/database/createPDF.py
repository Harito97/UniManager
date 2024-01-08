import mysql.connector
import base64

host = "localhost"
user = "root"
database = "csdl_web"


try:
    conn = mysql.connector.connect(
        host=host,
        user=user,
        database=database
    )

    cursor = conn.cursor(dictionary=True)
    db_status = True

except Exception as e:
    print("Lỗi: ", e)

statement = """create table form(id int not null primary key, 
                                 name varchar(50) not null, 
                                 file LONGBLOB not null)"""
cursor.execute(statement)

cursor.execute("set global max_allowed_packet = 10485760;")
conn.commit()

list_file = ["Donxettrocapxahoi.pdf", 
             "Donxethotrochiphihoctap.pdf", 
             "Giayxacnhanvayvon.pdf", 
             "Maudanhgiadiemrenluyen.pdf", 
             "Donruthoso.pdf", 
             "Donxinthoihoc.pdf", 
             "Donxinnghihoc.pdf", 
             "Dontieptuchoc.pdf",
             "Donxinchuyentruong.pdf",
             "Dondenghi.pdf",
             "Quychedaotao.pdf",
             "Quychecongtacsinhvien.pdf",
             "Soyeulilich.pdf",
             "GiayxacnhansinhvienTV.docx",
             "GiayxacnhansinhvienTA.docx",
             "Giayxacnhandiemrenluyencanhan.docx",
             "Maudangkylamlaithesv.docx"]

# Chuyển các file pdf và file docx và thư mục F: và chạy code này để tạo database

list_file_data = []
# Đọc nội dung file PDF
for file in list_file:
    with open(rf"F:\{file}", "rb") as pdf_file:
        file_data = pdf_file.read()
        list_file_data.append(base64.b64encode(file_data))

# pdf_base64 = base64.b64encode(file_data)

# Chuẩn bị câu lệnh SQL
for i in range(1, len(list_file_data)+1):
    insert_query = "INSERT INTO form (id, name, file) VALUES (%s, %s, %s)"
    # Thực thi câu lệnh SQL
    cursor.execute(insert_query, (i, list_file[i-1], list_file_data[i-1]))
    conn.commit()



