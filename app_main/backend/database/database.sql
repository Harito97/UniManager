drop database if exists csdl_web;
create database csdl_web;
use csdl_web;
create table if not exists giang_vien(
	ma_gv varchar(8) not null,
    ho_ten varchar(50) not null,
    gioi_tinh varchar(3) not null,
    luong decimal(10,3) not null,
    ngsinh date not null,
    sdt varchar(10) not null,
    dia_chi varchar(50) not null,
    ng_bat_dau date not null,
    ng_ket_thuc date,
    primary key (ma_gv)
);

create table if not exists gv_hp(
	ma_gv varchar(8) not null,
    ma_hp varchar(10) not null,
    primary key (ma_gv, ma_hp)
);

create table if not exists nganh(
	ma_nganh varchar(8) not null,
    ten_nganh varchar(100) not null,
    primary key (ma_nganh)
);

create table if not exists lh_gv(
	ma_lh int not null,
    ma_gv varchar(8) not null,
    primary key (ma_lh, ma_gv)
);

create table if not exists hoc_phan(
	ma_hp varchar(10) not null,
    ten_hp varchar(250) not null,
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
    so_luong int not null,
    thoi_gian json not null,
    ma_hk INT not null,
    he_so_tx decimal(2,2),
    he_so_gk decimal(2,2),
    he_so_ck decimal(2,2),
    lich_thi json,
    primary key (ma_lh)
);

create table if not exists phong(
	phong varchar(20) not null,
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
    diem_tx decimal(4,2),
    diem_gk decimal(4,2),
    diem_ck decimal(4,2),
    primary key (ma_lh, ma_sv)
);

create table if not exists sinh_vien(
	ma_sv varchar(8) not null,
    ho_ten varchar(50) not null,
    gioi_tinh varchar(3) not null,
    ngsinh date not null,
    sdt varchar(10) not null,
    ma_nganh varchar(8) not null,
    nam_bat_dau int not null,
    lop varchar(5) not null,
    primary key (ma_sv)
);

create table if not exists sv_hp(
	ma_hp varchar(10) not null,
    ma_sv varchar(8) not null,
    so_lan_hoc int not null,
    primary key (ma_hp, ma_sv)
);

create table if not exists user(
	username varchar(8) not null,
    pass_word binary(60) not null,
    email varchar(100) not null,
    access_level varchar(2) not null,
    avatar varchar(255),
    primary key (username)
);

create table if not exists hoc_ki(
    ma_hk INT not null,
    ng_bat_dau date not null,
    ng_ket_thuc date not null,
    primary key (ma_hk)
);

create table if not exists dot_dki(
    dot INT not null,
    ma_hk INT not null,
    ng_bat_dau date not null,
    ng_ket_thuc date not null,
    primary key (dot, ma_hk)
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
add constraint FK_ma_hp foreign key (ma_hp) references hoc_phan(ma_hp),
add constraint FK_lh_hk foreign key (ma_hk) references hoc_ki(ma_hk);

alter table hp_tien_quyet
add constraint FK_ma_hp_mh foreign key (ma_hp) references hoc_phan(ma_hp);

alter table chuong_trinh_hoc
add constraint FK_ct_hoc foreign key (ma_ct, ma_nganh) references chuong_trinh(ma_ct, ma_nganh),
add constraint FK_hp_ct foreign key (ma_hp) references hoc_phan(ma_hp);

alter table dang_ky
add constraint FK_ma_lh_dk foreign key (ma_lh) references lich_hoc(ma_lh),
add constraint FK_ma_sv_dk foreign key (ma_sv) references sinh_vien(ma_sv);

alter table sinh_vien
add constraint FK_ma_nganh_sv foreign key (ma_nganh) references nganh(ma_nganh),
add constraint FK_ma_sv_user foreign key (ma_sv) references user(username);

alter table giang_vien
add constraint FK_ma_gv_user foreign key (ma_gv) references user(username);

alter table sv_hp
add constraint FK_sv_hp1 foreign key (ma_hp) references hoc_phan(ma_hp),
add constraint FK_sv_hp2 foreign key (ma_sv) references sinh_vien(ma_sv);

alter table dot_dki
add constraint FK_hk_dot_dki foreign key (ma_hk) references hoc_ki(ma_hk);