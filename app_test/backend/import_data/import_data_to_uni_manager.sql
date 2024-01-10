-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 10, 2024 at 07:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uni_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `ChuongTrinhHoc`
--

CREATE TABLE `ChuongTrinhHoc` (
  `id` varchar(15) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `mo_ta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ChuongTrinhHoc`
--

INSERT INTO `ChuongTrinhHoc` (`id`, `ten`, `mo_ta`) VALUES
('CLC_MTKHTT_2020', 'CLC Máy trính và khoa học thông tin', 'Chương trình ngành Máy trính và khoa học thông tin Chất lượng cao ban hành năm 2020'),
('KHDL_2023', 'Khoa học dữ liệu', 'Chương trình ngành Khoa học dữ liệu ban hành năm 2023'),
('KHDL_TD_2020', 'Khoa học dữ liệu', 'Chương trình ngành Khoa học dữ liệu (Đào tạo thí điểm) ban hành năm 2020'),
('KHMTTT_2023', 'Khoa học máy tính và thông tin', 'Chương trình ngành Khoa học máy tính và thông tin hệ chuẩn ban hành năm 2023'),
('KHMTT_TD_2022', 'Khoa học máy tính và thông tin', 'Chương trình ngành Khoa học máy tính và thông tin (Đào tạo thí điểm) ban hành năm 2022'),
('TH_2020', 'Toán học', 'Chương trình ngành Toán học hệ chuẩn ban hành năm 2020'),
('TH_2023', 'Toán học', 'Chương trình ngành Toán học hệ chuẩn ban hành năm 2023'),
('TT_2020', 'Toán tin', 'Chương trình ngành Toán tin hệ chuẩn ban hành năm 2020'),
('TT_2023', 'Toán tin', 'Chương trình ngành Toán tin hệ chuẩn ban hành năm 2023');

-- --------------------------------------------------------

--
-- Table structure for table `CTH_HP`
--

CREATE TABLE `CTH_HP` (
  `id_cth` varchar(15) NOT NULL,
  `id_hp` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `CTH_HP`
--

INSERT INTO `CTH_HP` (`id_cth`, `id_hp`) VALUES
('KHDL_TD_2020', 'HIS1001'),
('KHDL_TD_2020', 'MAT2317'),
('KHDL_TD_2020', 'MAT3148'),
('KHDL_TD_2020', 'MAT3372'),
('KHDL_TD_2020', 'MAT3378'),
('KHDL_TD_2020', 'MAT3379'),
('KHDL_TD_2020', 'MAT3500'),
('KHDL_TD_2020', 'MAT3507'),
('KHDL_TD_2020', 'MAT3514'),
('KHDL_TD_2020', 'MAT3533'),
('KHDL_TD_2020', 'MAT3557'),
('KHDL_TD_2020', 'PEC1008'),
('KHDL_TD_2020', 'PHI1002'),
('KHDL_TD_2020', 'PHI1006'),
('KHDL_TD_2020', 'POL1001'),
('KHMTTT_2023', 'HIS1001'),
('KHMTTT_2023', 'MAT2317'),
('KHMTTT_2023', 'MAT3372'),
('KHMTTT_2023', 'MAT3500'),
('KHMTTT_2023', 'MAT3505'),
('KHMTTT_2023', 'MAT3507'),
('KHMTTT_2023', 'MAT3514'),
('KHMTTT_2023', 'MAT3533'),
('KHMTTT_2023', 'MAT3541E'),
('KHMTTT_2023', 'MAT3550E'),
('KHMTTT_2023', 'MAT3557'),
('KHMTTT_2023', 'MAT3558'),
('KHMTTT_2023', 'PEC1008'),
('KHMTTT_2023', 'PHI1002'),
('KHMTTT_2023', 'PHI1006'),
('KHMTTT_2023', 'POL1001'),
('KHMTT_TD_2022', 'HIS1001'),
('KHMTT_TD_2022', 'MAT2317'),
('KHMTT_TD_2022', 'MAT3372'),
('KHMTT_TD_2022', 'MAT3500'),
('KHMTT_TD_2022', 'MAT3505'),
('KHMTT_TD_2022', 'MAT3507'),
('KHMTT_TD_2022', 'MAT3514'),
('KHMTT_TD_2022', 'MAT3533'),
('KHMTT_TD_2022', 'MAT3541E'),
('KHMTT_TD_2022', 'MAT3550E'),
('KHMTT_TD_2022', 'MAT3557'),
('KHMTT_TD_2022', 'MAT3558'),
('KHMTT_TD_2022', 'PEC1008'),
('KHMTT_TD_2022', 'PHI1002'),
('KHMTT_TD_2022', 'PHI1006'),
('KHMTT_TD_2022', 'POL1001'),
('TT_2020', 'HIS1001'),
('TT_2020', 'MAT2317'),
('TT_2020', 'MAT3500'),
('TT_2020', 'MAT3557'),
('TT_2020', 'PEC1008'),
('TT_2020', 'PHI1002'),
('TT_2020', 'PHI1006'),
('TT_2020', 'POL1001');

-- --------------------------------------------------------

--
-- Table structure for table `GiangVien`
--

CREATE TABLE `GiangVien` (
  `id` varchar(15) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `gioi_tinh` varchar(15) NOT NULL,
  `ngay_sinh` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `GiangVien`
--

INSERT INTO `GiangVien` (`id`, `ten`, `gioi_tinh`, `ngay_sinh`) VALUES
('gv_000.001', 'Phạm Ngọc Hải', 'Nam', '2003-07-09'),
('gv_000.002', 'Lương Đức Anh', 'Nam', '2003-07-09'),
('gv_000.003', 'Trần Minh Đức', 'Nam', '2003-07-09'),
('gv_000.004', 'Nguyễn Văn Thắng', 'Nam', '2003-07-09'),
('gv_000.005', 'ABC', 'Nam', '2003-07-09'),
('gv_000.006', 'DEF', 'Nữ', '2003-07-09'),
('gv_000.007', 'XYZ', 'Nữ', '2003-07-09'),
('gv_000.008', 'Anpha', 'Nữ', '2003-07-09'),
('gv_000.009', 'Beta', 'Nữ', '2003-07-09'),
('gv_000.010', 'Gamma', 'Nữ', '2003-07-09');

-- --------------------------------------------------------

--
-- Table structure for table `GV_HP`
--

CREATE TABLE `GV_HP` (
  `id_gv` varchar(15) NOT NULL,
  `id_hp` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `GV_HP`
--

INSERT INTO `GV_HP` (`id_gv`, `id_hp`) VALUES
('gv_000.001', 'HIS1001'),
('gv_000.001', 'MAT2317'),
('gv_000.001', 'MAT3148'),
('gv_000.001', 'MAT3372'),
('gv_000.001', 'MAT3378'),
('gv_000.001', 'MAT3379'),
('gv_000.001', 'MAT3500'),
('gv_000.001', 'MAT3505'),
('gv_000.001', 'MAT3507'),
('gv_000.001', 'MAT3514'),
('gv_000.001', 'MAT3533'),
('gv_000.001', 'MAT3541E'),
('gv_000.001', 'MAT3550E'),
('gv_000.001', 'MAT3557'),
('gv_000.001', 'MAT3558'),
('gv_000.001', 'PEC1008'),
('gv_000.001', 'PHI1002'),
('gv_000.001', 'PHI1006'),
('gv_000.001', 'POL1001'),
('gv_000.002', 'MAT3148'),
('gv_000.002', 'MAT3379'),
('gv_000.002', 'MAT3505'),
('gv_000.002', 'MAT3533'),
('gv_000.002', 'MAT3541E'),
('gv_000.002', 'MAT3550E'),
('gv_000.002', 'MAT3558'),
('gv_000.003', 'HIS1001'),
('gv_000.003', 'MAT2317'),
('gv_000.003', 'MAT3372'),
('gv_000.003', 'MAT3500'),
('gv_000.003', 'MAT3514'),
('gv_000.003', 'MAT3557'),
('gv_000.003', 'PEC1008'),
('gv_000.003', 'PHI1002'),
('gv_000.003', 'POL1001'),
('gv_000.004', 'HIS1001'),
('gv_000.004', 'PEC1008'),
('gv_000.004', 'PHI1002'),
('gv_000.004', 'PHI1006'),
('gv_000.004', 'POL1001'),
('gv_000.005', 'MAT3148'),
('gv_000.005', 'MAT3372'),
('gv_000.005', 'MAT3378'),
('gv_000.005', 'MAT3507'),
('gv_000.005', 'MAT3514'),
('gv_000.006', 'MAT3379'),
('gv_000.006', 'MAT3505'),
('gv_000.006', 'MAT3533'),
('gv_000.006', 'MAT3541E'),
('gv_000.006', 'MAT3550E'),
('gv_000.007', 'MAT3379'),
('gv_000.007', 'MAT3505'),
('gv_000.007', 'MAT3533'),
('gv_000.007', 'MAT3541E'),
('gv_000.007', 'MAT3550E'),
('gv_000.008', 'PHI1006'),
('gv_000.009', 'PEC1008'),
('gv_000.010', 'PHI1002');

-- --------------------------------------------------------

--
-- Table structure for table `GV_MH`
--

CREATE TABLE `GV_MH` (
  `id_gv` varchar(15) NOT NULL,
  `id_mh` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `HocPhan`
--

CREATE TABLE `HocPhan` (
  `id` varchar(15) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `so_tin` int(11) NOT NULL,
  `mo_ta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `HocPhan`
--

INSERT INTO `HocPhan` (`id`, `ten`, `so_tin`, `mo_ta`) VALUES
('HIS1001', 'Lịch sử Đảng Cộng sản Việt Nam (History of the Communist Party of Vietnam)', 2, 'Học phần Lịch sử Đảng trong Khối kiến thức chung'),
('MAT2317', 'Lập trình Java (Java Programming)', 3, 'Học phần lập trình cơ bản với ngôn ngữ Java'),
('MAT3148', 'Tính toán song song (Prallel computing)', 3, 'Sắp có bài báo khoa học đầu tiên :))'),
('MAT3372', 'Các thành phần phần mềm (Software Components)', 3, 'OOP siêu quan trọng trong cuộc sống'),
('MAT3378', 'Quản trị dữ liệu lớn (Management of big and complex data)', 3, '...'),
('MAT3379', 'Phân tích hồi quy và ứng dụng (Applied Regression Analysis)', 3, 'Bản chất hỗ trợ học AI về sau'),
('MAT3500', 'Toán rời rạc (Discrete Mathematics)', 4, 'Bắt đầu kiến thức Toán rời rạc khiến bạn lú'),
('MAT3505', 'Kiến trúc máy tính (Computer Architecture)', 3, 'Ừ thì giống Tin học cơ sở học thêm tý nữa chăng'),
('MAT3507', 'Cơ sở dữ liệu (Databases)', 3, 'Mở đàu cho Backend'),
('MAT3514', 'Cấu trúc dữ liệu và thuật toán (Data Structures and Algorithms)', 4, 'Chương trình = Cấu trúc dữ liệu + thuật toán'),
('MAT3533', 'Học máy (Machine learning)', 3, 'Sâu hơn so với AI'),
('MAT3541E', 'Nguyên lí các ngôn ngữ lập trình (Principles of Programming Languages)', 3, 'Học xong làm ngôn ngữ nào nhiều thư viện hỗ trợ như Python mà nhanh hơn được không -_-'),
('MAT3550E', 'Nguyên lí hệ điều hành (Principles of Operating Systems)', 3, 'Học xong bỏ Windows vs MacOS đi nhé :> Zăm ba mấy cái OS vớ vẩn'),
('MAT3557', 'Môi trường lập trình Linux (Linux Programming Environment)', 2, 'Hệ điều hành Linux tuyệt vời - Hãy bắt đầu dùng ArchLinux để cảm nhận'),
('MAT3558', 'Lập trình mobile (Programming for mobile platforms)', 2, 'Chân lý cuộc đời chỉ còn Web vs App thôi à'),
('PEC1008', 'Kinh tế chính trị Mác - Lênin (Marx-Lenin Political Economy)', 2, 'Học phần Kinh tế chính trị trong Khối kiến thức chung'),
('PHI1002', 'Chủ nghĩa xã hội khoa học (Scientific socialism)', 2, 'Học phần Chủ nghĩa xã hội trong Khối kiến thức chung'),
('PHI1006', 'Triết học Mác - Lênin (Marxist-Leninist Philosophy)', 3, 'Học phần Triết học Marxist-Leninist trong Khối kiến thức chung'),
('POL1001', 'Tư tưởng Hồ Chí Minh (Ho Chi Minh Ideology)', 2, 'Học phần tư tưởng HCM trong Khối kiến thức chung');

-- --------------------------------------------------------

--
-- Table structure for table `HPTQ`
--

CREATE TABLE `HPTQ` (
  `id_hp` varchar(15) NOT NULL,
  `id_hp_tq` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `HP_LP`
--

CREATE TABLE `HP_LP` (
  `id_hp` varchar(15) NOT NULL,
  `id_lp` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `HP_LP`
--

INSERT INTO `HP_LP` (`id_hp`, `id_lp`) VALUES
('HIS1001', 'LT'),
('MAT2317', 'LT'),
('MAT2317', 'PM'),
('MAT3148', 'LT'),
('MAT3148', 'PM'),
('MAT3372', 'LT'),
('MAT3372', 'PM'),
('MAT3378', 'LT'),
('MAT3378', 'PM'),
('MAT3379', 'LT'),
('MAT3379', 'PM'),
('MAT3500', 'LT'),
('MAT3505', 'LT'),
('MAT3505', 'PM'),
('MAT3507', 'LT'),
('MAT3507', 'PM'),
('MAT3514', 'LT'),
('MAT3514', 'PM'),
('MAT3533', 'LT'),
('MAT3533', 'PM'),
('MAT3541E', 'LT'),
('MAT3541E', 'PM'),
('MAT3550E', 'LT'),
('MAT3550E', 'PM'),
('MAT3557', 'LT'),
('MAT3557', 'PM'),
('MAT3558', 'LT'),
('MAT3558', 'PM'),
('PEC1008', 'LT'),
('PHI1002', 'LT'),
('PHI1006', 'LT'),
('POL1001', 'LT');

-- --------------------------------------------------------

--
-- Table structure for table `LoaiPhong`
--

CREATE TABLE `LoaiPhong` (
  `id` varchar(15) NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `LoaiPhong`
--

INSERT INTO `LoaiPhong` (`id`, `mo_ta`) VALUES
('LT', 'Loại phòng cho giảng dạy lý thuyết'),
('PM', 'Loại phòng có phòng máy hỗ trợ các môn dùng máy tính'),
('TN_H', 'Loại phòng có các công cụ thực hành Hóa'),
('TN_L', 'Loại phòng có các công cụ thực hành Vật lý'),
('TN_S', 'Loại phòng có các công cụ thưc hành Sinh');

-- --------------------------------------------------------

--
-- Table structure for table `MonHoc`
--

CREATE TABLE `MonHoc` (
  `id` varchar(15) NOT NULL,
  `id_hoc_phan` varchar(15) NOT NULL,
  `ky_hoc` varchar(15) NOT NULL,
  `so_sv` int(11) NOT NULL,
  `he_so_tx` decimal(3,2) DEFAULT NULL,
  `he_so_gk` decimal(3,2) DEFAULT NULL,
  `he_so_ck` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `MonHoc`
--

INSERT INTO `MonHoc` (`id`, `id_hoc_phan`, `ky_hoc`, `so_sv`, `he_so_tx`, `he_so_gk`, `he_so_ck`) VALUES
('1', 'PEC1008', '1_2022_2023', 30, 0.20, 0.20, 0.60),
('1', 'PHI1002', '1_2022_2023', 30, 0.20, 0.20, 0.60),
('1', 'PHI1006', '1_2022_2023', 40, 0.20, 0.20, 0.60),
('2', 'PEC1008', '1_2022_2023', 30, 0.20, 0.20, 0.60),
('2', 'PHI1002', '1_2022_2023', 30, 0.20, 0.20, 0.60),
('2', 'PHI1006', '1_2022_2023', 40, 0.20, 0.20, 0.60),
('3', 'PEC1008', '1_2022_2023', 30, 0.20, 0.20, 0.60),
('3', 'PHI1002', '1_2022_2023', 30, 0.20, 0.20, 0.60),
('3', 'PHI1006', '1_2022_2023', 40, 0.20, 0.20, 0.60);

-- --------------------------------------------------------

--
-- Table structure for table `PhongHoc`
--

CREATE TABLE `PhongHoc` (
  `id` varchar(15) NOT NULL,
  `id_loai_phong` varchar(15) NOT NULL,
  `so_cho` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `PhongHoc`
--

INSERT INTO `PhongHoc` (`id`, `id_loai_phong`, `so_cho`) VALUES
('101T5', 'LT', 40),
('102T5', 'LT', 40),
('103T5', 'LT', 40),
('104T5', 'LT', 40),
('105T5', 'LT', 40),
('106T5', 'LT', 40),
('107T5', 'LT', 40),
('108T5', 'LT', 40),
('109T5', 'LT', 40),
('110T5', 'LT', 40),
('201T5', 'LT', 40),
('202T5', 'LT', 40),
('203T5', 'LT', 40),
('204T5', 'LT', 40),
('205T5', 'LT', 40),
('206T5', 'LT', 40),
('207T5', 'LT', 40),
('208T5', 'LT', 40),
('209T5', 'LT', 40),
('210T5', 'LT', 40),
('301T5', 'LT', 40),
('302T5', 'LT', 40),
('303T5', 'LT', 40),
('304T5', 'LT', 40),
('305T5', 'LT', 40),
('306T5', 'LT', 40),
('307T5', 'LT', 40),
('308T5', 'LT', 40),
('309T5', 'LT', 40),
('310T5', 'LT', 40),
('401T5', 'LT', 40),
('402T5', 'LT', 40),
('403T5', 'LT', 40),
('404T5', 'LT', 40),
('405T5', 'LT', 40),
('406T5', 'LT', 40),
('407T5', 'LT', 40),
('408T5', 'LT', 40),
('409T5', 'LT', 40),
('410T5', 'LT', 40),
('501T5', 'PM', 40),
('502T5', 'PM', 40),
('503T5', 'PM', 40),
('504T5', 'PM', 40),
('505T5', 'PM', 40),
('506T5', 'PM', 40),
('507T5', 'PM', 40),
('508T5', 'PM', 40),
('509T5', 'PM', 40),
('510T5', 'PM', 40),
('601T5', 'LT', 40),
('602T5', 'LT', 40),
('603T5', 'LT', 40),
('604T5', 'LT', 40),
('605T5', 'LT', 40),
('606T5', 'LT', 40),
('607T5', 'LT', 40),
('608T5', 'LT', 40),
('609T5', 'LT', 40),
('610T5', 'LT', 40);

-- --------------------------------------------------------

--
-- Table structure for table `SinhVien`
--

CREATE TABLE `SinhVien` (
  `id` varchar(15) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `gioi_tinh` varchar(15) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `nien_khoa` varchar(15) NOT NULL,
  `ct_hoc` varchar(15) NOT NULL,
  `gpa` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `SinhVien`
--

INSERT INTO `SinhVien` (`id`, `ten`, `gioi_tinh`, `ngay_sinh`, `nien_khoa`, `ct_hoc`, `gpa`) VALUES
('sv_000.001', 'Phạm Ngọc Hải', 'Nam', '2003-07-09', '2021', 'KHDL_TD_2020', 0),
('sv_000.002', 'Lương Đức Anh', 'Nam', '2003-07-09', '2021', 'KHDL_TD_2020', 0),
('sv_000.003', 'Trần Minh Đức', 'Nam', '2003-07-09', '2021', 'KHDL_TD_2020', 0),
('sv_000.004', 'Nguyễn Văn Thắng', 'Nam', '2003-07-09', '2021', 'KHDL_TD_2020', 0),
('sv_000.005', 'ABC', 'Nam', '2003-07-09', '2022', 'KHMTT_TD_2022', 0),
('sv_000.006', 'DEF', 'Nữ', '2003-07-09', '2020', 'KHDL_TD_2020', 0),
('sv_000.007', 'XYZ', 'Nữ', '2003-07-09', '2023', 'KHMTTT_2023', 0),
('sv_000.008', 'Anpha', 'Nữ', '2003-07-09', '2023', 'KHMTTT_2023', 0),
('sv_000.009', 'Beta', 'Nữ', '2003-07-09', '2023', 'KHMTTT_2023', 0),
('sv_000.010', 'Gamma', 'Nữ', '2003-07-09', '2023', 'TT_2020', 0);

-- --------------------------------------------------------

--
-- Table structure for table `SV_HP`
--

CREATE TABLE `SV_HP` (
  `id_sv` varchar(15) NOT NULL,
  `id_hp` varchar(15) NOT NULL,
  `diem_tx` decimal(4,2) DEFAULT NULL,
  `diem_gk` decimal(4,2) DEFAULT NULL,
  `diem_ck` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SV_MH`
--

CREATE TABLE `SV_MH` (
  `id_sv` varchar(15) NOT NULL,
  `id_mh` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TaiKhoan`
--

CREATE TABLE `TaiKhoan` (
  `id` varchar(15) NOT NULL,
  `mat_khau` binary(60) NOT NULL,
  `quyen` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `TaiKhoan`
--

INSERT INTO `TaiKhoan` (`id`, `mat_khau`, `quyen`) VALUES
('gv_000.001', 0x67765f3030302e3030310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.002', 0x67765f3030302e3030320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.003', 0x67765f3030302e3030330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.004', 0x67765f3030302e3030340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.005', 0x67765f3030302e3030350000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.006', 0x67765f3030302e3030360000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.007', 0x67765f3030302e3030370000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.008', 0x67765f3030302e3030380000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.009', 0x67765f3030302e3030390000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('gv_000.010', 0x67765f3030302e3031300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 2),
('ht_000.001', 0x68745f3030302e3030310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 1),
('sv_000.001', 0x73765f3030302e3030310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.002', 0x73765f3030302e3030320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.003', 0x73765f3030302e3030330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.004', 0x73765f3030302e3030340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.005', 0x73765f3030302e3030350000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.006', 0x73765f3030302e3030360000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.007', 0x73765f3030302e3030370000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.008', 0x73765f3030302e3030380000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.009', 0x73765f3030302e3030390000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3),
('sv_000.010', 0x73765f3030302e3031300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 3);

-- --------------------------------------------------------

--
-- Table structure for table `TKB`
--

CREATE TABLE `TKB` (
  `id_mh` varchar(15) NOT NULL,
  `id_ph` varchar(15) NOT NULL,
  `_time` varchar(10) NOT NULL,
  `id_gv` varchar(15) NOT NULL,
  `_tinh_chat` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ChuongTrinhHoc`
--
ALTER TABLE `ChuongTrinhHoc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `CTH_HP`
--
ALTER TABLE `CTH_HP`
  ADD PRIMARY KEY (`id_cth`,`id_hp`),
  ADD KEY `fk_CTH_HP_id_hp` (`id_hp`);

--
-- Indexes for table `GiangVien`
--
ALTER TABLE `GiangVien`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `GV_HP`
--
ALTER TABLE `GV_HP`
  ADD PRIMARY KEY (`id_gv`,`id_hp`),
  ADD KEY `fk_GV_HP_id_hp` (`id_hp`);

--
-- Indexes for table `GV_MH`
--
ALTER TABLE `GV_MH`
  ADD PRIMARY KEY (`id_gv`,`id_mh`),
  ADD KEY `fk_GV_MH_id_mh` (`id_mh`);

--
-- Indexes for table `HocPhan`
--
ALTER TABLE `HocPhan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `HPTQ`
--
ALTER TABLE `HPTQ`
  ADD PRIMARY KEY (`id_hp`,`id_hp_tq`),
  ADD KEY `fk_HPTQ_hp_tq` (`id_hp_tq`);

--
-- Indexes for table `HP_LP`
--
ALTER TABLE `HP_LP`
  ADD PRIMARY KEY (`id_hp`,`id_lp`),
  ADD KEY `fk_HP_LP_id_lp` (`id_lp`);

--
-- Indexes for table `LoaiPhong`
--
ALTER TABLE `LoaiPhong`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MonHoc`
--
ALTER TABLE `MonHoc`
  ADD PRIMARY KEY (`id`,`id_hoc_phan`),
  ADD KEY `fk_mh` (`id_hoc_phan`);

--
-- Indexes for table `PhongHoc`
--
ALTER TABLE `PhongHoc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ph` (`id_loai_phong`);

--
-- Indexes for table `SinhVien`
--
ALTER TABLE `SinhVien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cth` (`ct_hoc`);

--
-- Indexes for table `SV_HP`
--
ALTER TABLE `SV_HP`
  ADD PRIMARY KEY (`id_sv`,`id_hp`),
  ADD KEY `fk_SV_HP_id_hp` (`id_hp`);

--
-- Indexes for table `SV_MH`
--
ALTER TABLE `SV_MH`
  ADD PRIMARY KEY (`id_sv`,`id_mh`),
  ADD KEY `fk_SV_MH_id_mh` (`id_mh`);

--
-- Indexes for table `TaiKhoan`
--
ALTER TABLE `TaiKhoan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TKB`
--
ALTER TABLE `TKB`
  ADD PRIMARY KEY (`id_mh`,`id_ph`,`_time`),
  ADD KEY `fk_TKB_id_ph` (`id_ph`),
  ADD KEY `fk_TKB_id_gv` (`id_gv`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CTH_HP`
--
ALTER TABLE `CTH_HP`
  ADD CONSTRAINT `fk_CTH_HP_id_cth` FOREIGN KEY (`id_cth`) REFERENCES `ChuongTrinhHoc` (`id`),
  ADD CONSTRAINT `fk_CTH_HP_id_hp` FOREIGN KEY (`id_hp`) REFERENCES `HocPhan` (`id`);

--
-- Constraints for table `GiangVien`
--
ALTER TABLE `GiangVien`
  ADD CONSTRAINT `fk_gv` FOREIGN KEY (`id`) REFERENCES `TaiKhoan` (`id`);

--
-- Constraints for table `GV_HP`
--
ALTER TABLE `GV_HP`
  ADD CONSTRAINT `fk_GV_HP_id_gv` FOREIGN KEY (`id_gv`) REFERENCES `GiangVien` (`id`),
  ADD CONSTRAINT `fk_GV_HP_id_hp` FOREIGN KEY (`id_hp`) REFERENCES `HocPhan` (`id`);

--
-- Constraints for table `GV_MH`
--
ALTER TABLE `GV_MH`
  ADD CONSTRAINT `fk_GV_MH_id_gv` FOREIGN KEY (`id_gv`) REFERENCES `GiangVien` (`id`),
  ADD CONSTRAINT `fk_GV_MH_id_mh` FOREIGN KEY (`id_mh`) REFERENCES `MonHoc` (`id`);

--
-- Constraints for table `HPTQ`
--
ALTER TABLE `HPTQ`
  ADD CONSTRAINT `fk_HPTQ_hp` FOREIGN KEY (`id_hp`) REFERENCES `HocPhan` (`id`),
  ADD CONSTRAINT `fk_HPTQ_hp_tq` FOREIGN KEY (`id_hp_tq`) REFERENCES `HocPhan` (`id`);

--
-- Constraints for table `HP_LP`
--
ALTER TABLE `HP_LP`
  ADD CONSTRAINT `fk_HP_LH_id_hp` FOREIGN KEY (`id_hp`) REFERENCES `HocPhan` (`id`),
  ADD CONSTRAINT `fk_HP_LP_id_lp` FOREIGN KEY (`id_lp`) REFERENCES `LoaiPhong` (`id`);

--
-- Constraints for table `MonHoc`
--
ALTER TABLE `MonHoc`
  ADD CONSTRAINT `fk_mh` FOREIGN KEY (`id_hoc_phan`) REFERENCES `HocPhan` (`id`);

--
-- Constraints for table `PhongHoc`
--
ALTER TABLE `PhongHoc`
  ADD CONSTRAINT `fk_ph` FOREIGN KEY (`id_loai_phong`) REFERENCES `LoaiPhong` (`id`);

--
-- Constraints for table `SinhVien`
--
ALTER TABLE `SinhVien`
  ADD CONSTRAINT `fk_cth` FOREIGN KEY (`ct_hoc`) REFERENCES `ChuongTrinhHoc` (`id`),
  ADD CONSTRAINT `fk_sv` FOREIGN KEY (`id`) REFERENCES `TaiKhoan` (`id`);

--
-- Constraints for table `SV_HP`
--
ALTER TABLE `SV_HP`
  ADD CONSTRAINT `fk_SV_HP_id_hp` FOREIGN KEY (`id_hp`) REFERENCES `HocPhan` (`id`),
  ADD CONSTRAINT `fk_SV_HP_id_sv` FOREIGN KEY (`id_sv`) REFERENCES `SinhVien` (`id`);

--
-- Constraints for table `SV_MH`
--
ALTER TABLE `SV_MH`
  ADD CONSTRAINT `fk_SV_MH_id_gv` FOREIGN KEY (`id_sv`) REFERENCES `SinhVien` (`id`),
  ADD CONSTRAINT `fk_SV_MH_id_mh` FOREIGN KEY (`id_mh`) REFERENCES `MonHoc` (`id`);

--
-- Constraints for table `TKB`
--
ALTER TABLE `TKB`
  ADD CONSTRAINT `fk_TKB_id_gv` FOREIGN KEY (`id_gv`) REFERENCES `GiangVien` (`id`),
  ADD CONSTRAINT `fk_TKB_id_mh` FOREIGN KEY (`id_mh`) REFERENCES `MonHoc` (`id`),
  ADD CONSTRAINT `fk_TKB_id_ph` FOREIGN KEY (`id_ph`) REFERENCES `PhongHoc` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
