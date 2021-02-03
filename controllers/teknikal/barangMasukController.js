var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("teknikal/pages/barang-masuk/index");
    },
    datalist: function(req, res) {
        conn.query(
            "SELECT tbm.id_barang_masuk, tk.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbm.nama_pengirim, tbm.jumlah, tbm.keterangan, rs.nama_status, tbm.tanggal FROM tbl_barang_masuk as tbm\
        LEFT JOIN tbl_barang as tb ON tb.id_barang = tbm.id_barang\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
        LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbm.id_karyawan\
        LEFT JOIN ref_status as rs ON rs.id_status = tbm.id_status\
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
    faktur: function(req, res) {
        var date = process.hrtime;
        var no = 1;

        conn.query(
            "SELECT tbm.id_barang_masuk, tk.nama as nama_penerima, tb.nama_barang, tjb.nama_jenis_barang, tb.serial_number, tbm.nama_pengirim, tbm.jumlah, tbm.keterangan, rs.nama_status, tbm.tanggal FROM tbl_barang_masuk as tbm\
        LEFT JOIN tbl_barang as tb ON tb.id_barang = tbm.id_barang\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang\
        LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tbm.id_karyawan\
        LEFT JOIN ref_status as rs ON rs.id_status = tbm.id_status\
        ORDER BY tbm.tanggal DESC",
            function(error, result) {
                if (error) {
                    res.render("error", {
                        error: error,
                    });
                }

                res.pugpdf(
                    "faktur/barang-masuk", { message: "Hello World!", list: result, no: no }, {
                        filename: "barang-masuk.pdf",
                    }
                );
            }
        );
    },
};

module.exports = controller;