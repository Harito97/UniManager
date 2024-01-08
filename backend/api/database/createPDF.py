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

# data = [         {  "id": 1, 
#                     "name": "Đơn xét trợ cấp xã hội", 
#                     "description": "Dùng cho sinh viên xin xét trợ cấp xã hội",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "192KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 2, 
#                     "name": "Đơn xét hỗ trợ chi phí học tập", 
#                     "description": "Dùng cho sinh viên dân tộc thiểu số hộ nghèo, cận nghèo theo quy định của Thủ tướng Chính phủ thi đỗ vào đại học chính quy",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "174KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 3, 
#                     "name": "Đơn xác nhận vay vốn ở địa phương", 
#                     "description": "Dùng cho sinh viên vay vốn ở địa phương",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "298KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},
                
#                  {  "id": 4, 
#                     "name": "Mẫu đánh giá điểm rèn luyện", 
#                     "description": "Dùng cho sinh viên tự đánh giá điểm rèn luyện cuối mỗi học kỳ",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "288KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 5, 
#                     "name": "Đơn xin rút hồ sơ", 
#                     "description": "Dùng cho sinh viên rút hồ sơ khi có quyết định thôi học hoặc hết thời gian đào tạo",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "206KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 6, 
#                     "name": "Đơn xin thôi học", 
#                     "description": "Dùng cho sinh viên xin thôi học vì lí do cá nhân, đi du học...",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "205KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 7, 
#                     "name": "Đơn xin nghỉ học (bảo lưu)", 
#                     "description": "Dùng cho sinh viên xin nghỉ học (bảo lưu) học kì hay năm học (sinh viên lưu ý cần có bảng điểm tích lũy học tập từ 2.0 trở lên hoặc các lí do cá nhân theo quy định của quy chế đào tạo)",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "197KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 8, 
#                     "name": "Đơn xin", 
#                     "description": "Dùng cho sinh viên xin nghỉ học (bảo lưu) học kì hay năm học (sinh viên lưu ý cần có bảng điểm tích lũy học tập từ 2.0 trở lên hoặc các lí do cá nhân theo quy định của quy chế đào tạo)",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "197KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 8, 
#                     "name": "Đơn xin tiếp tục vào học", 
#                     "description": "Dùng cho sinh viên sau khi hết thời gian nghỉ học bảo lưu",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "196KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 9, 
#                     "name": "Đơn xin chuyển trường", 
#                     "description": "Dùng cho sinh viên để xin chuyển sang trường khác (SV lưu ý trước khi làm đơn cần phải có xác nhận đồng ý của Trường nơi sinh viên sẽ đến học)",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "210KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 10, 
#                     "name": "Đơn đề nghị ", 
#                     "description": "Dùng cho sinh viên có thắc mắc, đề nghị về các vấn đề như học bổng, học phí, điểm rèn luyện,...",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "198KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 11, 
#                     "name": "Quy chế đào tạo", 
#                     "description": "Ban hành kèm theo quyết định của ĐHQGHN và áp dụng cho sinh viên hệ đại học chính quy",
#                     "classify": "Quy định, quy chế",
#                     "size": "819KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 12, 
#                     "name": "Quy chế Công tác sinh viên", 
#                     "description": "Ban hành kèm theo quyết định của ĐHQGHN và áp dụng cho sinh viên hệ đại học chính quy",
#                     "classify": "Quy định, quy chế",
#                     "size": "751KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 13, 
#                     "name": "Sơ yếu lí lịch", 
#                     "description": "Dùng cho sinh viên xin học bổng, việc làm...",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "210KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 14, 
#                     "name": "Giấy xác nhận sinh viên _ Tiếng Việt", 
#                     "description": "Dùng cho sinh viên xác nhận nghĩa vụ quân sự, báo cáo địa phương, thi học kì khi mất thẻ SV,...",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "41KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 15, 
#                     "name": "Giấy xác nhận sinh viên _ Tiếng Anh", 
#                     "description": "Dùng cho sinh viên để xin học bổng, visa đi nước ngoài,...",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "50KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 16, 
#                     "name": "Giấy xác nhận điểm rèn luyện cá nhân", 
#                     "description": "Dùng xác nhận điểm rèn luyện cho sinh viên để xin học bổng",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "40KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},

#                  {  "id": 17, 
#                     "name": "Mẫu đăng ký  làm lại Thẻ sinh viên tích hợp thẻ ngân hàng BIDV", 
#                     "description": "Dùng cho sinh viên làm lại thẻ sinh viên tích hợp thẻ ngân hàng BIDV chi nhánh Thanh Xuân",
#                     "classify": "Các biểu mẫu dành cho sinh viên",
#                     "size": "141KB",
#                     "dateLoaing": "01/11/2020",
#                     "download": "Download"},
#                  ]

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



