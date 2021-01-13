-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 13, 2021 at 09:29 AM
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
-- Table structure for table `ref_departemen`
--

CREATE TABLE `ref_departemen` (
  `id_departemen` int(11) NOT NULL,
  `nama_departemen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ref_departemen`
--

INSERT INTO `ref_departemen` (`id_departemen`, `nama_departemen`) VALUES
(2, 'GENERAL SERVICE'),
(3, 'PURCHASING');

-- --------------------------------------------------------

--
-- Table structure for table `ref_level`
--

CREATE TABLE `ref_level` (
  `id_level` int(11) NOT NULL,
  `nama_level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ref_level`
--

INSERT INTO `ref_level` (`id_level`, `nama_level`) VALUES
(1, 'Supervisor'),
(2, 'Teknikal'),
(3, 'Warehouse');

-- --------------------------------------------------------

--
-- Table structure for table `ref_spesifikasi`
--

CREATE TABLE `ref_spesifikasi` (
  `id_spesifikasi` int(11) NOT NULL,
  `nama_spesifikasi` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Table structure for table `ref_status`
--

CREATE TABLE `ref_status` (
  `id_status` int(11) NOT NULL,
  `nama_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ref_status`
--

INSERT INTO `ref_status` (`id_status`, `nama_status`) VALUES
(1, 'Baru'),
(2, 'Service');

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
-- Dumping data for table `tbl_area`
--

INSERT INTO `tbl_area` (`id_area`, `nama_area`) VALUES
(3, 'Warehouse');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barang`
--

CREATE TABLE `tbl_barang` (
  `id_barang` int(11) NOT NULL,
  `id_jenis_barang` int(11) NOT NULL,
  `serial_number` varchar(20) NOT NULL,
  `nama_barang` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_barang`
--

INSERT INTO `tbl_barang` (`id_barang`, `id_jenis_barang`, `serial_number`, `nama_barang`) VALUES
(2, 4, 'C8PY183463', 'Zyrex');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barang_keluar`
--

CREATE TABLE `tbl_barang_keluar` (
  `id_barang_keluar` int(11) NOT NULL,
  `id_karyawan_pengirim` int(11) NOT NULL,
  `id_karyawan_penerima` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `jumlah` int(5) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `id_status` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_barang_keluar`
--

INSERT INTO `tbl_barang_keluar` (`id_barang_keluar`, `id_karyawan_pengirim`, `id_karyawan_penerima`, `id_area`, `id_barang`, `jumlah`, `keterangan`, `id_status`, `tanggal`) VALUES
(1, 3, 4, 3, 2, 1, '', 1, '2021-11-01 05:21:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barang_masuk`
--

CREATE TABLE `tbl_barang_masuk` (
  `id_barang_masuk` int(11) NOT NULL,
  `id_karyawan` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `nama_pengirim` varchar(50) NOT NULL,
  `jumlah` int(5) NOT NULL,
  `keterangan` text NOT NULL,
  `id_status` int(11) NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_barang_masuk`
--

INSERT INTO `tbl_barang_masuk` (`id_barang_masuk`, `id_karyawan`, `id_barang`, `nama_pengirim`, `jumlah`, `keterangan`, `id_status`, `tanggal`) VALUES
(1, 3, 2, 'Omen', 1, '', 1, '2021-10-31 17:00:00'),
(2, 3, 2, 'Omen', 60, 'banyak', 2, '2021-10-31 17:00:00'),
(3, 3, 2, 'Omen', 12, '', 1, '2021-11-01 04:45:35'),
(4, 3, 2, 'Eva', 90, '', 1, '2021-11-01 05:02:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jenis_barang`
--

CREATE TABLE `tbl_jenis_barang` (
  `id_jenis_barang` int(11) NOT NULL,
  `nama_jenis_barang` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_jenis_barang`
--

INSERT INTO `tbl_jenis_barang` (`id_jenis_barang`, `nama_jenis_barang`) VALUES
(4, 'Monitor'),
(5, 'CPU'),
(6, 'Printer');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_karyawan`
--

CREATE TABLE `tbl_karyawan` (
  `id_karyawan` int(11) NOT NULL,
  `id_departemen` int(11) NOT NULL,
  `npp` varchar(20) DEFAULT NULL,
  `nama` varchar(30) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_telp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_karyawan`
--

INSERT INTO `tbl_karyawan` (`id_karyawan`, `id_departemen`, `npp`, `nama`, `alamat`, `no_telp`) VALUES
(3, 2, 'D970046', 'Nurjaya', '', ''),
(4, 3, 'OMN009', 'Omen', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_masalah`
--

CREATE TABLE `tbl_masalah` (
  `id_masalah` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `tanggal_masalah` datetime NOT NULL,
  `tanggal_selesai` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opname`
--

CREATE TABLE `tbl_opname` (
  `id_opname` int(11) NOT NULL,
  `id_karyawan` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `tanggal_pencatatan` date NOT NULL,
  `tanggal_selesai` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_opname`
--

INSERT INTO `tbl_opname` (`id_opname`, `id_karyawan`, `id_area`, `tanggal_pencatatan`, `tanggal_selesai`) VALUES
(2, 4, 3, '2021-01-13', '2021-01-13');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_opname_spesifikasi`
--

CREATE TABLE `tbl_opname_spesifikasi` (
  `id_opname_spesifikasi` int(11) NOT NULL,
  `id_opname` int(11) NOT NULL,
  `id_spesifikasi` int(11) NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_opname_spesifikasi`
--

INSERT INTO `tbl_opname_spesifikasi` (`id_opname_spesifikasi`, `id_opname`, `id_spesifikasi`, `keterangan`) VALUES
(1, 2, 2, '1'),
(2, 2, 3, '2'),
(3, 2, 4, '3'),
(4, 2, 5, '4'),
(5, 2, 6, '5'),
(6, 2, 7, '6'),
(7, 2, 8, '7'),
(8, 2, 9, '8'),
(9, 2, 10, '9'),
(10, 2, 11, '10'),
(11, 2, 12, '11'),
(12, 2, 13, '12'),
(13, 2, 14, '13');

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
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id_user`, `id_level`, `nama`, `username`, `password`) VALUES
(5, 3, 'Admin Gudang', 'warehouse', '550e1bafe077ff0b0b67f4e32f29d751');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ref_departemen`
--
ALTER TABLE `ref_departemen`
  ADD PRIMARY KEY (`id_departemen`);

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
-- Indexes for table `ref_status`
--
ALTER TABLE `ref_status`
  ADD PRIMARY KEY (`id_status`);

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
-- Indexes for table `tbl_barang`
--
ALTER TABLE `tbl_barang`
  ADD PRIMARY KEY (`id_barang`);

--
-- Indexes for table `tbl_barang_keluar`
--
ALTER TABLE `tbl_barang_keluar`
  ADD PRIMARY KEY (`id_barang_keluar`);

--
-- Indexes for table `tbl_barang_masuk`
--
ALTER TABLE `tbl_barang_masuk`
  ADD PRIMARY KEY (`id_barang_masuk`);

--
-- Indexes for table `tbl_jenis_barang`
--
ALTER TABLE `tbl_jenis_barang`
  ADD PRIMARY KEY (`id_jenis_barang`);

--
-- Indexes for table `tbl_karyawan`
--
ALTER TABLE `tbl_karyawan`
  ADD PRIMARY KEY (`id_karyawan`);

--
-- Indexes for table `tbl_masalah`
--
ALTER TABLE `tbl_masalah`
  ADD PRIMARY KEY (`id_masalah`);

--
-- Indexes for table `tbl_opname`
--
ALTER TABLE `tbl_opname`
  ADD PRIMARY KEY (`id_opname`);

--
-- Indexes for table `tbl_opname_spesifikasi`
--
ALTER TABLE `tbl_opname_spesifikasi`
  ADD PRIMARY KEY (`id_opname_spesifikasi`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ref_departemen`
--
ALTER TABLE `ref_departemen`
  MODIFY `id_departemen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- AUTO_INCREMENT for table `ref_status`
--
ALTER TABLE `ref_status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_area`
--
ALTER TABLE `tbl_area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_barang`
--
ALTER TABLE `tbl_barang`
  MODIFY `id_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_barang_keluar`
--
ALTER TABLE `tbl_barang_keluar`
  MODIFY `id_barang_keluar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_barang_masuk`
--
ALTER TABLE `tbl_barang_masuk`
  MODIFY `id_barang_masuk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_jenis_barang`
--
ALTER TABLE `tbl_jenis_barang`
  MODIFY `id_jenis_barang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_karyawan`
--
ALTER TABLE `tbl_karyawan`
  MODIFY `id_karyawan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_masalah`
--
ALTER TABLE `tbl_masalah`
  MODIFY `id_masalah` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_opname`
--
ALTER TABLE `tbl_opname`
  MODIFY `id_opname` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_opname_spesifikasi`
--
ALTER TABLE `tbl_opname_spesifikasi`
  MODIFY `id_opname_spesifikasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
