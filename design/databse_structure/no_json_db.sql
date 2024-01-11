-- Database
drop database uni_manager;
create database if not exists uni_manager;
use uni_manager;

-- Main table
-- 1. User
create table if not exists TaiKhoan(
    id varchar(15) not null,    
    mat_khau binary(60) not null,
    quyen int(1) not null,
    primary key(id)
);

create table if not exists SinhVien(
	id varchar(15) not null,
    ten varchar(50) not null,
    gioi_tinh varchar(15) not null,
    ngay_sinh date not null,
    nien_khoa varchar(15) not null,
    ct_hoc varchar(15) not null,
    gpa float not null,
    primary key (id)
);

create table if not exists GiangVien(
    id varchar(15) not null,
    ten varchar(50) not null,
    gioi_tinh varchar(15) not null,
    ngay_sinh date not null,
    primary key(id)
);

-- 2. Room
create table if not exists LoaiPhong(
    id varchar(15) not null,
    mo_ta varchar(255),
    primary key(id)
);

create table if not exists PhongHoc(
    id varchar(15) not null,
    id_loai_phong varchar(15) not null,
    so_cho int not null,
    primary key(id)
);

-- 3. Subject
create table if not exists HocPhan(
    id varchar(15) not null,
    ten varchar(255) not null,
    so_tin int not null,
    mo_ta varchar(255) not null,
    primary key(id)
);

create table if not exists ChuongTrinhHoc(
    id varchar(15) not null,
    ten varchar(50) not null,
    mo_ta varchar(255) not null,
    primary key(id)
);

create table if not exists MonHoc(
    id varchar(15) not null,
    id_hoc_phan varchar(15) not null,
    ky_hoc varchar(15) not null,
    so_sv int not null,
    he_so_tx decimal(3,2),
    he_so_gk decimal(3,2),
    he_so_ck decimal(3,2),
    primary key(id, id_hoc_phan)
);

create table if not exists CaHoc(
    id_hoc_phan varchar(15) not null,
    tinh_chat varchar(2) not null,
    -- Eg: LT, BT, TH
    so_ca int(1) not null,
    -- Eg: 1, 2, 3
    primary key(id_hoc_phan, tinh_chat)
);

-- Connection
create table if not exists HPTQ(
    id_hp varchar(15) not null,
    id_hp_tq varchar(15) not null,
    primary key(id_hp, id_hp_tq)
);

create table if not exists CTH_HP(
    id_cth varchar(15) not null,
    id_hp varchar(15) not null,
    hk_dx varchar(3) not null,
    primary key(id_cth, id_hp)
);

create table if not exists GV_HP(
    id_gv varchar(15) not null,
    id_hp varchar(15) not null,
    primary key(id_gv, id_hp)
);

create table if not exists GV_MH(
    id_gv varchar(15) not null,
    id_mh varchar(15) not null,
    primary key(id_gv, id_mh)
);

create table if not exists SV_HP(
    id_sv varchar(15) not null,
    id_hp varchar(15) not null,
    diem_tx decimal(4,2),
    diem_gk decimal(4,2),
    diem_ck decimal(4,2),
    primary key(id_sv, id_hp)
);

create table if not exists SV_MH(
    id_sv varchar(15) not null,
    id_mh varchar(15) not null,
    primary key(id_sv, id_mh)
);

create table if not exists HP_LP(
    id_hp varchar(15) not null,
    id_lp varchar(15) not null,
    primary key(id_hp, id_lp)
);

-- TKB
create table if not exists TKB(
    id_mh varchar(15) not null,
    id_ph varchar(15) not null,
    _time varchar(10) not null,
    -- Eg: _time: 2_345: thứ 2 - tiết 345 
    id_gv varchar(15) not null,
    _tinh_chat int(1) not null,
    -- Eg: _tinh_chat: 0 - LT, 1 - TH, BT
    primary key(id_mh, id_ph, _time)
);

-- Foreign key
-- For object table
alter table GiangVien add constraint fk_gv foreign key (id) references TaiKhoan(id);

alter table SinhVien add constraint fk_sv foreign key (id) references TaiKhoan(id);
alter table SinhVien add constraint fk_cth foreign key (ct_hoc) references ChuongTrinhHoc(id);

alter table MonHoc add constraint fk_mh foreign key (id_hoc_phan) references HocPhan(id);

alter table PhongHoc add constraint fk_ph foreign key (id_loai_phong) references LoaiPhong(id);

alter table CaHoc add constraint fk_hp foreign key (id_hoc_phan) references HocPhan(id);

-- For connect table
alter table HPTQ add constraint fk_HPTQ_hp foreign key (id_hp) references HocPhan(id);
alter table HPTQ add constraint fk_HPTQ_hp_tq foreign key (id_hp_tq) references HocPhan(id);

alter table CTH_HP add constraint fk_CTH_HP_id_cth foreign key (id_cth) references ChuongTrinhHoc(id);
alter table CTH_HP add constraint fk_CTH_HP_id_hp foreign key (id_hp) references HocPhan(id);

alter table GV_HP add constraint fk_GV_HP_id_gv foreign key (id_gv) references GiangVien(id);
alter table GV_HP add constraint fk_GV_HP_id_hp foreign key (id_hp) references HocPhan(id);

alter table GV_MH add constraint fk_GV_MH_id_gv foreign key (id_gv) references GiangVien(id);
alter table GV_MH add constraint fk_GV_MH_id_mh foreign key (id_mh) references MonHoc(id);

alter table SV_HP add constraint fk_SV_HP_id_sv foreign key (id_sv) references SinhVien(id);
alter table SV_HP add constraint fk_SV_HP_id_hp foreign key (id_hp) references HocPhan(id);

alter table SV_MH add constraint fk_SV_MH_id_gv foreign key (id_sv) references SinhVien(id);
alter table SV_MH add constraint fk_SV_MH_id_mh foreign key (id_mh) references MonHoc(id);

alter table HP_LP add constraint fk_HP_LH_id_hp foreign key (id_hp) references HocPhan(id);
alter table HP_LP add constraint fk_HP_LP_id_lp foreign key (id_lp) references LoaiPhong(id);

alter table TKB add constraint fk_TKB_id_mh foreign key (id_mh) references MonHoc(id);
alter table TKB add constraint fk_TKB_id_ph foreign key (id_ph) references PhongHoc(id);
alter table TKB add constraint fk_TKB_id_gv foreign key (id_gv) references GiangVien(id); 

-- Thu tu do data lan luot la: 

-- First: Object table
-- TaiKhoan = HocPhan = ChuongTrinhHoc = LoaiPhong > SinhVien = GiangVien = MonHoc = PhongHoc = CaHoc

-- Second: Connect table
-- HPTQ = CTH_HP = GV_HP = GV_MH = SV_HP = SV_MH = HP_LP = TKB
