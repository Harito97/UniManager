insert into giang_vien(ma_gv, ho_ten, gioi_tinh, luong, ngsinh, sdt, email, dia_chi, ng_bat_dau, ng_ket_thuc, hoc_ham, hoc_vi, ma_bm, password, quyen) 
values 
("21002100", "Nguyễn Văn A", "Nam", 2000.0, "2003-02-01", "0123456799", "nguyenvana@gmail.com", "Hà Nội", "2020-02-01", "2030-02-01", "A", "B", "2003", "2003", 0), 
 
("21002110", "Nguyễn Văn B", "Nữ", 2100.0, "2002-03-02", "0123442229", "nguyenvanb@gmail.com", "Đà Nẵng", "2020-03-02", "2030-03-02", "B", "C", "2002", "2002", 0),
 
("21002120", "Nguyễn Văn C", "Nam", 2200.0, "2003-04-03", "0123799333", "nguyenvanc@gmail.com", "Vũng Tàu", "2020-04-03", "2030-04-03", "C", "D", "2001", "2001", 0),
 
("21002130", "Nguyễn Văn D", "Nam", 2500.0, "2003-05-04", "0123139333", "nguyenvand@gmail.com", "TP HCM", "2020-05-04", "2030-05-04", "D", "E", "2000", "2000", 0),

("21002140", "Nguyễn Văn E", "Nữ", 3200.0, "2003-06-05", "0119303333", "nguyenvane@gmail.com", "Hà Nội", "2020-06-05", "2030-06-05", "E", "F", "1999", "1999", 1);


insert into nganh(ma_nganh, ten_nganh) 
VALUES 
("MAT", "Khoa học dữ liệu"),
("PHI", "Lý luận"),
("PHY", "Vật lý học"),
("HIS", "Văn hóa"),
("GEO", "Khoa học trái đất");


insert into phong(phong, suc_chua, mo_ta)
values 
("401T5", 100, "Phòng học lý thuyết"),
("102T4", 70, "Phòng thực hành y sinh"),
("201T5", 50, "Phòng thực hành máy tính"),
("501T3", 60, "Phòng học lý thuyết"),
("301T5", 80, "Phòng thực hành vật lý");


insert into sinh_vien(ma_sv, ho_ten, gioi_tinh, ngsinh, sdt, email, gpa, ma_nganh, nam_bat_dau, lop, pass_word) 
values 
("21002500", "Nguyễn Văn AB", "Nam", "2003-02-01", "0123456799", "nguyenvanab@gmail.com", 3.20, "MAT", "2020", "A5", "2003"), 
 
("21002510", "Nguyễn Văn BC", "Nữ", "2002-03-02", "0123424229", "nguyenvanbc@gmail.com", 3.31, "PHY", "2021", "A4", "2002"),
 
("21002520", "Nguyễn Văn CD", "Nam", "2001-04-03", "0129320429", "nguyenvancd@gmail.com", 3.42, "PHI", "2022", "A4", "2001"),
 
("21002530", "Nguyễn Văn DE", "Nam", "2000-05-04", "0129320495", "nguyenvande@gmail.com", 3.53, "MAT", "2019", "A5", "2000"),

("21002540", "Nguyễn Văn EF", "Nữ", "1999-06-05", "0129322529", "nguyenvanef@gmail.com", 3.60, "GEO", "2018", "A4", "1999");


insert into hoc_phan(ma_hp, ten_hp, so_tin, mo_ta)
values
("MAT3514", "Cấu trúc dữ liệu và giải thuật", 4, "Dạy lập trình"),
("MAT3507", "Cơ sở dữ liệu", 4, "Dạy cơ sở dữ liệu"),
("PHY1103", "Điện quang", 3, "Dạy vật lý về quang"),
("HIS1001", "Lịch sử Đảng Cộng sản Việt Nam", 2, "Dạy lịch sử"),
("POL1001", "Tư tưởng Hồ Chí Minh", 2, "Dạy tư tưởng");


insert into gv_hp(ma_gv, ma_hp)
values
("21002100", "POL1001"),
("21002110", "HIS1001"),
("21002120", "MAT3514"),
("21002130", "MAT3507"),
("21002140", "PHY1103");


insert into chuong_trinh(ma_ct, ma_nganh)
values 
("123", "MAT"),
("234", "PHY"),
("345", "PHI"),
("456", "HIS"),
("567", "GEO");


insert into hp_tien_quyet(ma_hp, hp_tien_quyet)
values 
("MAT3514", "MAT3507"),
("MAT3507", "POL1001"),
("POL1001", "HIS1001"),
("MAT3507", "PHY1103"),
("MAT3514", "PHY1103");


insert into chuong_trinh_hoc(ma_ct, ma_nganh, ma_hp, nam, ki)
values 
("123", "MAT", "MAT3507", 2, 1),
("234", "PHY", "PHY1103", 2, 2),
("345", "PHI", "MAT3514", 1, 1),
("456", "HIS", "HIS1001", 1, 2),
("567", "GEO", "POL1001", 1, 2);


insert into lich_hoc(ma_lh, ma_hp, ma_lop, nam, ki)
values 
(1,"MAT3514", 1, 2022, 1),
(2,"MAT3507", 2, 2023, 4),
(3,"PHY1103", 3, 2021, 3),
(4,"HIS1001", 4, 2019, 2),
(5,"POL1001", 5, 2023, 1);


insert into lh_gv(ma_lh, ma_gv)
values 
(1, "21002100"),
(2, "21002110"),
(3, "21002120"),
(4, "21002130"),
(5, "21002140");


insert into lh_thoi_gian(ma_lh, thoi_gian, phong, ma_gv)
values 
(1, "T2(1-3)", "401T5", "21002100"),
(2, "T3(6-8)", "501T3", "21002110"),
(3, "T5(3-5)", "301T5", "21002120"),
(4, "T6(4-5)", "201T5", "21002130"),
(5, "T4(9-10)", "102T4", "21002140");


insert into dang_ky(ma_lh, ma_sv, diem_tx, he_so_tx, diem_gk, he_so_gk, diem_ck, he_so_ck)
values 
(1, "21002500", 10.0, 0.2, 10.0, 0.2, 10.0, 0.6),
(2, "21002510", 9.5, 0.2, 9.5, 0.2, 9.6, 0.6),
(3, "21002520", 8.0, 0.2, 10.0, 0.2, 9.0, 0.6),
(4, "21002530", 10.0, 0.2, 7.0, 0.2, 9.0, 0.6),
(5, "21002540", 8.5, 0.2, 9.5, 0.2, 10.0, 0.6);





