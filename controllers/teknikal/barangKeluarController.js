var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("teknikal/pages/barang-keluar/index");
    },
    datalist: function(req, res) {
        conn.query(
            "SELECT tbk.id_barang_keluar, tk.nama as nama_pengirim, tk2.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbk.jumlah, tbk.keterangan, rs.nama_status, tbk.tanggal, ta.nama_area FROM tbl_barang_keluar as tbk\
            LEFT JOIN tbl_barang as tb ON tb.id_barang = tbk.id_barang\
            LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbk.id_karyawan_pengirim\
            LEFT JOIN tbl_karyawan as tk2 ON tk2.id_karyawan = tbk.id_karyawan_penerima\
            LEFT JOIN ref_status as rs ON rs.id_status = tbk.id_status\
            LEFT JOIN tbl_area as ta ON ta.id_area = tbk.id_area\
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
    faktur: function(req, res) {
        var date = process.hrtime;
        var no = 1;

        conn.query(
            "SELECT tbk.id_barang_keluar, tk.nama as nama_pengirim, tk2.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbk.jumlah, tbk.keterangan, rs.nama_status, tbk.tanggal, ta.nama_area FROM tbl_barang_keluar as tbk\
            LEFT JOIN tbl_barang as tb ON tb.id_barang = tbk.id_barang\
            LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbk.id_karyawan_pengirim\
            LEFT JOIN tbl_karyawan as tk2 ON tk2.id_karyawan = tbk.id_karyawan_penerima\
            LEFT JOIN ref_status as rs ON rs.id_status = tbk.id_status\
            LEFT JOIN tbl_area as ta ON ta.id_area = tbk.id_area\
            ORDER BY tbk.tanggal DESC",
            function(error, result) {
                if (error) {
                    res.render("error", {
                        error: error,
                    });
                }

                res.pugpdf(
                    "faktur/barang-keluar", { message: "Hello World!", list: result, no: no }, {
                        filename: "barang-keluar.pdf",
                    }
                );
            }
        );
    },
};

module.exports = controller;