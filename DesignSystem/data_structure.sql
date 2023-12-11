-- Database
create database if not exists uni_manager;
use uni_manager;

-- Main table
create table if not exists TaiKhoan(
    id varchar(15) not null,
    ten_dn varchar(50) not null,
    mat_khau varchar(255) not null,
    quyen json,
    primary key(id)
);

create table if not exists SinhVien(
	id varchar(15) not null,
    ten varchar(50) not null,
    gioi_tinh varchar(15) not null,
    ngay_sinh date not null,
    nien_khoa varchar(15) not null,
    ct_hoc varchar(15) not null,
    diem_so json,
    dang_hoc json,
    gpa float,
    primary key (id)
);

create table if not exists GiangVien(
    id varchar(15) not null,
    ten varchar(50) not null,
    gioi_tinh varchar(15) not null,
    ngay_sinh date not null,
    giang_day json,
    primary key(id)
);

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

create table if not exists HocPhan(
    id varchar(15) not null,
    ten varchar(50) not null,
    so_tin int not null,
    mo_ta varchar(255) not null,
    hp_tien_quyet json,
    tai_lieu json,
    primary key(id)
);

create table if not exists ChuongTrinhHoc(
    id varchar(15) not null,
    ten varchar(50) not null,
    mo_ta varchar(255) not null,
    ds_mon json,
    primary key(id)
);

create table if not exists MonHoc(
    id varchar(15) not null,
    id_hoc_phan varchar(15) not null,
    ky_hoc varchar(15) not null,
    loai_phong varchar(15) not null,
    so_sv int not null,
    ds_sv json,
    primary key(id)
);

-- Foreign key
alter table GiangVien add constraint fk_gv foreign key (id) references TaiKhoan(id);
alter table SinhVien add constraint fk_sv foreign key (id) references TaiKhoan(id);
alter table MonHoc add constraint fk_mh foreign key (id_hoc_phan) references HocPhan(id);
alter table SinhVien add constraint fk_cth foreign key (ct_hoc) references ChuongTrinhHoc(id);
alter table PhongHoc add constraint fk_ph foreign key (id_loai_phong) references LoaiPhong(id);

-- Thu tu do data lan luot la: TaiKhoan - HocPhan - ChuongTrinhHoc - LoaiPhong > SinhVien - GiangVien - MonHoc - HocPhan
