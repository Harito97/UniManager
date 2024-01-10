use csdl_web;

insert into giang_vien(ma_gv, ho_ten, gioi_tinh, luong, ngsinh, sdt, dia_chi, ng_bat_dau, ng_ket_thuc) 
values 
("21002100", "Nguyễn Văn A", "Nam", 2000.0, "2003-02-01", "0123456799", "Hà Nội", "2020-02-01", "2030-02-01"), 
 
("21002110", "Nguyễn Văn B", "Nữ", 2100.0, "2002-03-02", "0123442229", "Đà Nẵng", "2020-03-02", "2030-03-02"),
 
("21002120", "Nguyễn Văn C", "Nam", 2200.0, "2003-04-03", "0123799333", "Vũng Tàu", "2020-04-03", "2030-04-03"),
 
("21002130", "Nguyễn Văn D", "Nam", 2500.0, "2003-05-04", "0123139333", "TP HCM", "2020-05-04", "2030-05-04"),

("21002140", "Nguyễn Văn E", "Nữ", 3200.0, "2003-06-05", "0119303333", "Hà Nội", "2020-06-05", "2030-06-05"),

("21002150", "Nguyễn Văn F", "Nữ", 3100.0, "2003-07-06", "0113303333", "Hà Nội", "2020-07-06", "2030-07-06"),

("21002160", "Nguyễn Văn G", "Nữ", 3100.0, "2003-07-06", "0113303333", "Hà Nội", "2020-07-06", "2030-07-06");



insert into nganh(ma_nganh, ten_nganh) 
VALUES 
("MAT", "Khoa học dữ liệu"),
("PHI", "Lý luận"),
("PHY", "Vật lý học"),
("HIS", "Văn hóa"),
("GEO", "Khoa học trái đất"),
("INM", "Tin học"),
("CMT", "Hóa học");

insert into phong(phong, suc_chua, mo_ta)
values 
("401T5", 100, "Phòng học lý thuyết"),
("102T4", 70, "Phòng thực hành y sinh"),
("201T5", 50, "Phòng thực hành máy tính"),
("501T3", 60, "Phòng học lý thuyết"),
("301T5", 80, "Phòng thực hành vật lý"),
("502T3", 65, "Phòng thực hành hóa học"),
("105T3", 150, "Phòng thực hành y sinh");



insert into sinh_vien(ma_sv, ho_ten, gioi_tinh, ngsinh, sdt, ma_nganh, nam_bat_dau, lop) 
values 
("21002500", "Nguyễn Văn AB", "Nam", "2003-02-01", "0123456799", "MAT", "2020", "A5"), 
 
("21002510", "Nguyễn Văn BC", "Nữ", "2002-03-02", "0123424229", "PHY", "2021", "A4"),
 
("21002520", "Nguyễn Văn CD", "Nam", "2001-04-03", "0129320429",  "PHI", "2022", "A4"),
 
("21002530", "Nguyễn Văn DE", "Nam", "2000-05-04", "0129320495", "MAT", "2019", "A5"),

("21002540", "Nguyễn Văn EF", "Nữ", "1999-06-05", "0129322529", "GEO", "2018", "A4"),

("21002550", "Nguyễn Văn FG", "Nữ", "1998-06-05", "0129322539", "INM", "2018", "A4"),

("21002550", "Nguyễn Văn GH", "Nữ", "1998-06-05", "0129322539", "INM", "2018", "A4");



insert into hoc_phan(ma_hp, ten_hp, so_tin, mo_ta)
values
("MAT3514", "Cấu trúc dữ liệu và giải thuật", 4, "Dạy lập trình"),
("MAT3507", "Cơ sở dữ liệu", 4, "Dạy cơ sở dữ liệu"),
("PHY1103", "Điện quang", 3, "Dạy vật lý về quang"),
("HIS1001", "Lịch sử Đảng Cộng sản Việt Nam", 2, "Dạy lịch sử"),
("POL1001", "Tư tưởng Hồ Chí Minh", 2, "Dạy tư tưởng"),
("INM1000", "Tin học cơ sở", 3, "Dạy ms office"),
("MAT2034", "Đại số tuyến tính", 3, "Dạy toán"),
("MAT3500", "Giải tích", 3, "Dạy toán"),
("FLF1107", "Tieesng anh b1", 3, "Dạy ta"),
("PEC1008", "KTCT", 3, "Dạy lý luận");






insert into gv_hp(ma_gv, ma_hp)
values
("21002100", "POL1001"),
("21002110", "HIS1001"),
("21002120", "MAT3514"),
("21002130", "MAT3507"),
("21002140", "PHY1103"),
("21002150", "INM1000"),
("21002120", "FLF1107"),
("21002140", "INM1000"),
("21002160", "MAT2034"),
("21002130", "MAT3500");




insert into chuong_trinh(ma_ct, ma_nganh)
values 
("123", "MAT"),
("234", "PHY"),
("345", "PHI"),
("456", "HIS"),
("567", "GEO"),
("678", "INM"),
("789", "CMT");



insert into hp_tien_quyet(ma_hp, hp_tien_quyet)
values 
("MAT3514", "MAT3507"),
("MAT3507", "POL1001"),
("POL1001", "HIS1001"),
("MAT3507", "PHY1103"),
("MAT3514", "PHY1103"),
("INM1000", "MAT3514");


insert into chuong_trinh_hoc(ma_ct, ma_nganh, ma_hp, nam, ki)
values 
("123", "MAT", "MAT3507", 2, 1),
("234", "PHY", "PHY1103", 2, 2),
("345", "PHI", "MAT3514", 1, 1),
("456", "HIS", "HIS1001", 1, 2),
("567", "GEO", "POL1001", 1, 2),
("678", "INM", "INM1000", 2, 1);


insert into hoc_ki(ma_hk, ng_bat_dau, ng_ket_thuc)
values
(211, "2021-07-01", "2022-01-01"),
(212, "2022-02-01", "2022-06-25"),
(221, "2022-07-01", "2023-01-01"),
(222, "2023-02-01", "2023-06-25"),
(231, "2023-07-01", "2024-01-01"),
(232, "2024-02-01", "2024-06-25");



insert into lich_hoc(ma_lh, ma_hp, ma_lop, so_luong, thoi_gian, ma_hk, he_so_tx, he_so_gk, he_so_ck)
values 
(1,"MAT3514", 1, 40, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 211, 0.2,0.2,0.6),
(2,"MAT3507", 2, 50, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 212,0.2,0.2,0.6),
(3,"PHY1103", 3, 55, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 221,0.2,0.2,0.6),
(4,"HIS1001", 4, 45, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 222,0.2,0.2,0.6),
(5,"POL1001", 5, 60, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 231,0.2,0.2,0.6),
(6,"INM1000", 6, 65, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 232,0.2,0.2,0.6),
(7,"MAT3500", 7, 65, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 231,0.2,0.2,0.6),
(8,"MAT2034", 8, 65, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 231,0.2,0.2,0.6),
(9,"FLF1107", 9, 65, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "103T4" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "PM" }]', 231,0.2,0.2,0.6);



insert into lh_gv(ma_lh, ma_gv)
values 
(1, "21002100"),
(2, "21002110"),
(3, "21002120"),
(4, "21002130"),
(5, "21002140"),
(6, "21002150"),
(7, "21002110"),
(8, "21002120"),
(8, "21002150"),
(9, "21002100");




insert into dang_ky(ma_lh, ma_sv, diem_tx, diem_gk, diem_ck)
values 
(1, "21002500", 10.0, 10.0, 10.0),
(2, "21002500", 9.5, 9.5, 9.6),
(3, "21002500", 8.0, 10.0, 9.0),
(4, "21002500", 10.0, 7.0, 9.0),
(5, "21002500", 8.5, 9.5, 10.0),
(6, "21002500", 1, 2, 3),
(6, "21002510", 1, 2, 3),
(7, "21002510", 1, 2, 3),
(7, "21002520", 1, 2, 3);


insert into sv_hp(ma_hp, ma_sv, so_lan_hoc)
values 
("MAT3514","21002500", 1),
("MAT3507", "21002500", 2),
("PHY1103", "21002500", 1),
("HIS1001", "21002500", 2),
("POL1001", "21002500", 1),
("INM1000", "21002500", 2),
("MAT3500", "21002500", 2),
("MAT2034", "21002500", 2),
("FLF1107", "21002500", 2);


insert into user(username, pass_word, email, access_level)
values
("21002500", "2003", "nguyenvanthangk66@gmail.com", "SV"),
("21002510", "2002", "nguyenvanthangk61@gmail.com", "ADMIN"),
("21002520", "2001", "nguyenvanthangk62@gmail.com", "SV"),
("21002530", "2004", "nguyenvanthangk63@gmail.com", "SV"),
("21002540", "2005", "nguyenvanthangk64@gmail.com", "GV"),
("21002550", "2006", "nguyenvanthangk65@gmail.com", "GV");





