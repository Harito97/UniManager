create database csdl_web;
use csdl_web;
create table if not exists giang_vien(
	ma_gv varchar(8) not null,
    ho_ten varchar(50) not null,
    gioi_tinh varchar(3) not null,
    luong decimal(8,2) not null,
    ngsinh date not null,
    sdt varchar(10) not null,
    email varchar(50) not null,
    dia_chi varchar(50) not null,
    ng_bat_dau date not null,
    ng_ket_thuc date,
    hoc_ham varchar(10),
    hoc_vi varchar(10),
    ma_bm varchar(8),
    password varchar(60),
    quyen int, 
    primary key (ma_gv)
);

create table if not exists gv_hp(
	ma_gv varchar(8) not null,
    ma_hp varchar(10) not null,
    primary key (ma_gv, ma_hp)
);

create table if not exists nganh(
	ma_nganh varchar(8) not null,
    ten_nganh varchar(50) not null,
    primary key (ma_nganh)
);

create table if not exists lh_gv(
	ma_lh int not null,
    ma_gv varchar(8) not null,
    primary key (ma_lh, ma_gv)
);

create table if not exists khoa(
	ma_khoa varchar(8) not null,
    ten_khoa varchar(50) not null unique,
    truong_khoa varchar(8) not null,
    primary key (ma_khoa)
);

create table if not exists hoc_phan(
	ma_hp varchar(10) not null,
    ten_hp varchar(50) not null,
    so_tin int not null,
    mo_ta varchar(50),
    primary key (ma_hp)
);

create table if not exists chuong_trinh(
	ma_ct varchar(8) not null,
    ma_nganh varchar(8) not null,
    primary key (ma_ct, ma_nganh)
);

create table if not exists lich_hoc(
	ma_lh int not null auto_increment,
    ma_hp varchar(10) not null,
    ma_lop int not null,
    nam int not null,
    ki int,
    primary key (ma_lh)
);

create table if not exists lh_thoi_gian(
	ma_lh int not null,
    thoi_gian varchar(15) not null,
    phong varchar(5) not null,
    ma_gv varchar(8) not null,
    primary key (ma_lh, thoi_gian)
);

create table if not exists phong(
	phong varchar(5) not null,
    suc_chua int not null,
    mo_ta varchar(50),
    primary key (phong)
);

create table if not exists hp_tien_quyet(
	ma_hp varchar(10) not null,
    hp_tien_quyet varchar(10) not null,
    primary key (ma_hp, hp_tien_quyet)
);

create table if not exists chuong_trinh_hoc(
	ma_ct varchar(8) not null,
    ma_nganh varchar(8) not null,
    ma_hp varchar(10) not null,
    nam int not null,
    ki int not null,
    primary key (ma_ct, ma_nganh, ma_hp)
);

create table if not exists dang_ky(
	ma_lh int not null,
    ma_sv varchar(8) not null,
    diem_tx decimal(2,2),
    he_so_tx decimal(2,2),
    diem_gk decimal(2,2),
    he_so_gk decimal(2,2),
    diem_ck decimal(2,2),
    he_so_ck decimal(2,2),
    primary key (ma_lh, ma_sv)
);

create table if not exists sinh_vien(
	ma_sv varchar(8) not null,
    ho_ten varchar(50) not null,
    gioi_tinh varchar(3) not null,
    ngsinh date not null,
    sdt varchar(10) not null,
    email varchar(50) not null,
    gpa decimal(2,2) not null,
    ma_nganh varchar(8) not null,
    nam_bat_dau int not null,
    lop varchar(3) not null,
    pass_word char(60),
    primary key (ma_sv)
);

alter table lh_gv
add constraint FK_ma_gv_lh foreign key (ma_gv) references giang_vien(ma_gv),
add constraint FK_ma_lh_gv foreign key (ma_lh) references lich_hoc(ma_lh);
alter table gv_hp 
add constraint FK_ma_gv_hp foreign key (ma_gv) references giang_vien(ma_gv),
add constraint FK_ma_hp_gv foreign key (ma_hp) references hoc_phan(ma_hp);
alter table chuong_trinh
add constraint FK_ma_nganh foreign key(ma_nganh) references nganh(ma_nganh);
alter table lich_hoc
add constraint FK_ma_hp foreign key (ma_hp) references hoc_phan(ma_hp);
alter table hp_tien_quyet
add constraint FK_ma_hp_mh foreign key (ma_hp) references hoc_phan(ma_hp),
add constraint FK_ma_hp_tq foreign key (hp_tien_quyet) references hoc_phan(ma_hp);
alter table chuong_trinh_hoc
add constraint FK_ct_hoc foreign key (ma_ct, ma_nganh) references chuong_trinh(ma_ct, ma_nganh),
add constraint FK_hp_ct foreign key (ma_hp) references hoc_phan(ma_hp);
alter table dang_ky
add constraint FK_ma_lh_dk foreign key (ma_lh) references lich_hoc(ma_lh),
add constraint FK_ma_sv_dk foreign key (ma_sv) references sinh_vien(ma_sv);
alter table sinh_vien
add constraint FK_ma_nganh_sv foreign key (ma_nganh) references nganh(ma_nganh);
alter table lh_thoi_gian
add constraint FK_ma_lh_tg foreign key (ma_lh) references lich_hoc(ma_lh),
add constraint FK_ma_phg foreign key (phong) references phong(phong);
