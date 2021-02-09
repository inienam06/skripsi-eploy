var conn = require(__dirname + "/../../config/database");

let controller = {
    indexBarangMasuk: function(req, res, next) {
        var bulan = new Date().getMonth() + 1;

        if (req.params.bulan) {
            bulan = req.params.bulan;
        }

        res.render("admin/pages/laporan/barang-masuk", {
            bulan: bulan,
        });
    },
    datalistBarangMasuk: function(req, res, next) {
        var year = new Date().getFullYear();
        conn.query(
            "SELECT tbm.id_barang_masuk, tk.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbm.nama_pengirim, tbm.jumlah, tbm.keterangan, rs.nama_status, tbm.tanggal FROM tbl_barang_masuk as tbm\
        LEFT JOIN tbl_barang as tb ON tb.id_barang = tbm.id_barang\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
        LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbm.id_karyawan\
        LEFT JOIN ref_status as rs ON rs.id_status = tbm.id_status\
        WHERE MONTH(tbm.tanggal) = '" +
            req.params.bulan +
            "'\
        AND YEAR(tbm.tanggal) = '" +
            year +
            "'\
        ORDER BY tbm.tanggal DESC",
            function(error, result) {
                if (!error) {
                    res.status(200).json({
                        status: true,
                        code: 200,
                        message: "Data Barang Masuk",
                        data: result,
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        code: 500,
                        message: error.message,
                    });
                }
            }
        );
    },
    fakturBarangMasuk: function(req, res, next) {
        var no = 1;
        var year = new Date().getFullYear();
        conn.query(
            "SELECT tbm.id_barang_masuk, tk.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbm.nama_pengirim, tbm.jumlah, tbm.keterangan, rs.nama_status, tbm.tanggal FROM tbl_barang_masuk as tbm\
        LEFT JOIN tbl_barang as tb ON tb.id_barang = tbm.id_barang\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
        LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbm.id_karyawan\
        LEFT JOIN ref_status as rs ON rs.id_status = tbm.id_status\
        WHERE MONTH(tbm.tanggal) = '" +
            req.params.bulan +
            "'\
        AND YEAR(tbm.tanggal) = '" +
            year +
            "'\
        ORDER BY tbm.tanggal DESC",
            function(error, result) {
                if (error) {
                    res.render("error", {
                        error: error,
                    });
                }

                res.pugpdf(
                    "faktur/barang-masuk", { list: result, no: no }, {
                        filename: "barang-masuk.pdf",
                    }
                );
            }
        );
    },
    indexBarangKeluar: function(req, res, next) {
        var bulan = new Date().getMonth() + 1;

        if (req.params.bulan) {
            bulan = req.params.bulan;
        }

        res.render("admin/pages/laporan/barang-keluar", {
            bulan: bulan,
        });
    },
    datalistBarangKeluar: function(req, res, next) {
        var year = new Date().getFullYear();
        conn.query(
            "SELECT tbk.id_barang_keluar, tk.nama as nama_pengirim, tk2.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbk.jumlah, tbk.keterangan, rs.nama_status, tbk.tanggal, ta.nama_area FROM tbl_barang_keluar as tbk\
            LEFT JOIN tbl_barang as tb ON tb.id_barang = tbk.id_barang\
            LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbk.id_karyawan_pengirim\
            LEFT JOIN tbl_karyawan as tk2 ON tk2.id_karyawan = tbk.id_karyawan_penerima\
            LEFT JOIN ref_status as rs ON rs.id_status = tbk.id_status\
            LEFT JOIN tbl_area as ta ON ta.id_area = tbk.id_area\
            WHERE MONTH(tbk.tanggal) = '" +
            req.params.bulan +
            "'\
            AND YEAR(tbk.tanggal) = '" +
            year +
            "'\
            ORDER BY tbk.tanggal DESC",
            function(error, result) {
                if (!error) {
                    res.status(200).json({
                        status: true,
                        code: 200,
                        message: "Data Barang Keluar",
                        data: result,
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        code: 500,
                        message: error.message,
                    });
                }
            }
        );
    },
    fakturBarangKeluar: function(req, res, next) {
        var no = 1;
        var year = new Date().getFullYear();
        conn.query(
            "SELECT tbk.id_barang_keluar, tk.nama as nama_pengirim, tk2.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbk.jumlah, tbk.keterangan, rs.nama_status, tbk.tanggal, ta.nama_area FROM tbl_barang_keluar as tbk\
            LEFT JOIN tbl_barang as tb ON tb.id_barang = tbk.id_barang\
            LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbk.id_karyawan_pengirim\
            LEFT JOIN tbl_karyawan as tk2 ON tk2.id_karyawan = tbk.id_karyawan_penerima\
            LEFT JOIN ref_status as rs ON rs.id_status = tbk.id_status\
            LEFT JOIN tbl_area as ta ON ta.id_area = tbk.id_area\
            WHERE MONTH(tbk.tanggal) = '" +
            req.params.bulan +
            "'\
            AND YEAR(tbk.tanggal) = '" +
            year +
            "'\
            ORDER BY tbk.tanggal DESC",
            function(error, result) {
                if (error) {
                    res.render("error", {
                        error: error,
                    });
                }

                res.pugpdf(
                    "faktur/barang-keluar", { list: result, no: no }, {
                        filename: "barang-keluar.pdf",
                    }
                );
            }
        );
    },
};

module.exports = controller;