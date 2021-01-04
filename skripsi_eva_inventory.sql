-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 04, 2021 at 08:38 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skripsi_eva_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `ref_level`
--

CREATE TABLE `ref_level` (
  `id_level` int(11) NOT NULL,
  `nama_level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `ref_level`
--

TRUNCATE TABLE `ref_level`;
--
-- Dumping data for table `ref_level`
--

INSERT INTO `ref_level` (`id_level`, `nama_level`) VALUES
(1, 'Supervisor'),
(2, 'Karyawan'),
(3, 'Teknikal'),
(4, 'Warehouse');

-- --------------------------------------------------------

--
-- Table structure for table `ref_spesifikasi`
--

CREATE TABLE `ref_spesifikasi` (
  `id_spesifikasi` int(11) NOT NULL,
  `nama_spesifikasi` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `ref_spesifikasi`
--

TRUNCATE TABLE `ref_spesifikasi`;
--
-- Dumping data for table `ref_spesifikasi`
--

INSERT INTO `ref_spesifikasi` (`id_spesifikasi`, `nama_spesifikasi`) VALUES
(2, 'Merk CPU'),
(3, 'Type CPU'),
(4, 'Serial Number CPU'),
(5, 'Type Monitor'),
(6, 'Serial Number Monitor'),
(7, 'Hostname'),
(8, 'Memory'),
(9, 'OCS'),
(10, 'OS'),
(11, 'Office'),
(12, 'Versi Access'),
(13, 'Versi Visio'),
(14, 'Versi Project');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id_admin` int(11) NOT NULL,
  `nama` varchar(25) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `tbl_admin`
--

TRUNCATE TABLE `tbl_admin`;
--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `nama`, `username`, `password`) VALUES
(1, 'Administrator', 'admin', 'c3284d0f94606de1fd2af172aba15bf3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_area`
--

CREATE TABLE `tbl_area` (
  `id_area` int(11) NOT NULL,
  `nama_area` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `tbl_area`
--

TRUNCATE TABLE `tbl_area`;
-- --------------------------------------------------------

--
-- Table structure for table `tbl_jenis_barang`
--

CREATE TABLE `tbl_jenis_barang` (
  `id_jenis_barang` int(11) NOT NULL,
  `nama_jenis_barang` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `tbl_jenis_barang`
--

TRUNCATE TABLE `tbl_jenis_barang`;
--
-- Dumping data for table `tbl_jenis_barang`
--

INSERT INTO `tbl_jenis_barang` (`id_jenis_barang`, `nama_jenis_barang`) VALUES
(2, 'Monitor Zyrex');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_user` int(11) NOT NULL,
  `id_level` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Truncate table before insert `tbl_user`
--

TRUNCATE TABLE `tbl_user`;
--
-- Indexes for dumped tables
--

--
-- Indexes for table `ref_level`
--
ALTER TABLE `ref_level`
  ADD PRIMARY KEY (`id_level`);

--
-- Indexes for table `ref_spesifikasi`
--
ALTER TABLE `ref_spesifikasi`
  ADD PRIMARY KEY (`id_spesifikasi`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `tbl_area`
--
ALTER TABLE `tbl_area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indexes for table `tbl_jenis_barang`
--
ALTER TABLE `tbl_jenis_barang`
  ADD PRIMARY KEY (`id_jenis_barang`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ref_level`
--
ALTER TABLE `ref_level`
  MODIFY `id_level` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ref_spesifikasi`
--
ALTER TABLE `ref_spesifikasi`
  MODIFY `id_spesifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_area`
--
ALTER TABLE `tbl_area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_jenis_barang`
--
ALTER TABLE `tbl_jenis_barang`
  MODIFY `id_jenis_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
