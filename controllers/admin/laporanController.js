var conn = require(__dirname + "/../../config/database");

let controller = {
    indexBarangMasuk: function(req, res, next) {
        var from = formatDate(new Date());
        var to = formatDate(new Date());
        var max = formatDate(new Date());

        if (req.params.from || req.params.to) {
            from = req.params.from;
            to = req.params.to;
        }

        res.render("admin/pages/laporan/barang-masuk", {
            from: from,
            to: to,
            max: max,
        });
    },
    datalistBarangMasuk: function(req, res, next) {
        conn.query(
            "SELECT tbm.id_barang_masuk, tk.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbm.nama_pengirim, tbm.jumlah, tbm.keterangan, rs.nama_status, tbm.tanggal FROM tbl_barang_masuk as tbm\
        LEFT JOIN tbl_barang as tb ON tb.id_barang = tbm.id_barang\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
        LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbm.id_karyawan\
        LEFT JOIN ref_status as rs ON rs.id_status = tbm.id_status\
        WHERE tbm.tanggal BETWEEN '" +
            req.params.from +
            " 00:00:00' AND '" +
            req.params.to +
            " 23:59:59'\
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
        conn.query(
            "SELECT tbm.id_barang_masuk, tk.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbm.nama_pengirim, tbm.jumlah, tbm.keterangan, rs.nama_status, tbm.tanggal FROM tbl_barang_masuk as tbm\
        LEFT JOIN tbl_barang as tb ON tb.id_barang = tbm.id_barang\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
        LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbm.id_karyawan\
        LEFT JOIN ref_status as rs ON rs.id_status = tbm.id_status\
        WHERE tbm.tanggal BETWEEN '" +
            req.params.from +
            " 00:00:00' AND '" +
            req.params.to +
            " 23:59:59'\
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
        var from = formatDate(new Date());
        var to = formatDate(new Date());
        var max = formatDate(new Date());

        if (req.params.from || req.params.to) {
            from = req.params.from;
            to = req.params.to;
        }

        res.render("admin/pages/laporan/barang-keluar", {
            from: from,
            to: to,
            max: max,
        });
    },
    datalistBarangKeluar: function(req, res, next) {
        conn.query(
            "SELECT tbk.id_barang_keluar, tk.nama as nama_pengirim, tk2.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbk.jumlah, tbk.keterangan, rs.nama_status, tbk.tanggal, ta.nama_area FROM tbl_barang_keluar as tbk\
            LEFT JOIN tbl_barang as tb ON tb.id_barang = tbk.id_barang\
            LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbk.id_karyawan_pengirim\
            LEFT JOIN tbl_karyawan as tk2 ON tk2.id_karyawan = tbk.id_karyawan_penerima\
            LEFT JOIN ref_status as rs ON rs.id_status = tbk.id_status\
            LEFT JOIN tbl_area as ta ON ta.id_area = tbk.id_area\
            WHERE tbk.tanggal BETWEEN '" +
            req.params.from +
            " 00:00:00' AND '" +
            req.params.to +
            " 23:59:59'\
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
        conn.query(
            "SELECT tbk.id_barang_keluar, tk.nama as nama_pengirim, tk2.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbk.jumlah, tbk.keterangan, rs.nama_status, tbk.tanggal, ta.nama_area FROM tbl_barang_keluar as tbk\
            LEFT JOIN tbl_barang as tb ON tb.id_barang = tbk.id_barang\
            LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbk.id_karyawan_pengirim\
            LEFT JOIN tbl_karyawan as tk2 ON tk2.id_karyawan = tbk.id_karyawan_penerima\
            LEFT JOIN ref_status as rs ON rs.id_status = tbk.id_status\
            LEFT JOIN tbl_area as ta ON ta.id_area = tbk.id_area\
            WHERE tbk.tanggal BETWEEN '" +
            req.params.from +
            " 00:00:00' AND '" +
            req.params.to +
            " 23:59:59'\
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