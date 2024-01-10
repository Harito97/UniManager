use csdl_web;

insert into user(username, pass_word, email, access_level)
values
("21002117", "$2b$12$Udgbyxbk0dvqEteQ82TONOtyI9V3D2Feb7kdoED7Eb1uiPM/X7C8e", "sv21002117@gmail.com", "SV"),
("21002139", "$2b$12$BgBol6cOkz/D1f7zQ/2/5e4fQ2dbAL2bVECTTaYKtT.jykzBZt386", "admin@gmail.com", "AD"),
("21002175", "$2b$12$7Bbx5AvwqvqCRssUyr8kxu2Du29TH.hPm37skHYNUdlpz3uD/SYlC", "gv21002175@gmail.com", "GV");

-- ########################################################################################################

insert into giang_vien(ma_gv, ho_ten, gioi_tinh, luong, ngsinh, sdt, dia_chi, ng_bat_dau, ng_ket_thuc) 
values 
("21002175", "Nguyễn Văn Thắng", "Nam", 2000.0, "2003-02-01", "0123456799", "Hà Nội", "2020-02-01", "2030-02-01");

-- ########################################################################################################

insert into nganh(ma_nganh, ten_nganh) 
VALUES 
("MAT", "Khoa học dữ liệu");

insert into sinh_vien(ma_sv, ho_ten, gioi_tinh, ngsinh, sdt, ma_nganh, nam_bat_dau, lop) 
values 
("21002117", "Lương Đức Anh", "Nam", "1998-06-05", "0129322539", "MAT", "2021", "A5");

-- ########################################################################################################

insert into phong(phong, suc_chua, mo_ta)
values 
("401T5", 100, "Phòng học lý thuyết"),
("501T5", 50, "Phòng thực hành máy tính");

insert into hoc_phan(ma_hp, ten_hp, so_tin, mo_ta)
values
("MAT3507", "Cơ sở dữ liệu", 4, "Dạy cơ sở dữ liệu");

-- ########################################################################################################

insert into gv_hp(ma_gv, ma_hp)
values
("21002175", "MAT3507");

insert into chuong_trinh(ma_ct, ma_nganh)
values 
("123", "MAT");

-- insert into hp_tien_quyet(ma_hp, hp_tien_quyet)
-- values 
-- ("INM1000", "MAT3514");

insert into chuong_trinh_hoc(ma_ct, ma_nganh, ma_hp, nam, ki)
values 
("123", "MAT", "MAT3507", 2, 1);

-- ########################################################################################################

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
(1,"MAT3507", 2, 50, '[{ "thu": "T2", "bd": 1, "kt": 2, "phong": "401T5" }, { "thu": "T5", "bd": 6, "kt": 10, "phong": "501T5" }]', 212,0.2,0.2,0.6);

insert into lh_gv(ma_lh, ma_gv)
values 
(1, "21002175");

insert into dang_ky(ma_lh, ma_sv, diem_tx, diem_gk, diem_ck)
values 
(1, "21002117", 10.0, 10.0, 10.0);

insert into sv_hp(ma_hp, ma_sv, so_lan_hoc)
values 
("MAT3507","21002117", 1);
