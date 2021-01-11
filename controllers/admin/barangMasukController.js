var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/barang-masuk/index");
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
    tambah: function(req, res) {
        conn.query("SELECT * FROM tbl_barang", function(errorBarang, dataBarang) {
            if (errorBarang) {
                res.render("error", {
                    error: errorBarang,
                });
            }

            conn.query(
                "SELECT * FROM tbl_karyawan",
                function(errorKaryawan, dataKaryawan) {
                    if (errorKaryawan) {
                        res.render("error", {
                            error: errorKaryawan,
                        });
                    }

                    conn.query(
                        "SELECT * FROM ref_status",
                        function(errorStatus, dataStatus) {
                            if (errorStatus) {
                                res.render("error", {
                                    error: errorStatus,
                                });
                            }

                            res.render("admin/pages/barang-masuk/tambah", {
                                dataBarang: dataBarang,
                                dataPenerima: dataKaryawan,
                                dataStatus: dataStatus,
                            });
                        }
                    );
                }
            );
        });
        try {} catch (err) {}
    },
    simpan: function(req, res) {
        if (
            req.body.id_penerima.trim() == "" ||
            req.body.id_barang.trim() == "" ||
            req.body.id_status.trim() == "" ||
            req.body.nama_pengirim.trim() == "" ||
            req.body.jumlah.trim() == "" ||
            req.body.tanggal.trim() == ""
        ) {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.beginTransaction(function(err) {
                if (err) {
                    conn.rollback();
                    res.status(200).json({
                        status: false,
                        code: 500,
                        message: err.message,
                    });
                }

                console.log(req.body.tanggal);

                conn.query(
                    "INSERT INTO tbl_barang_masuk SET ?", {
                        id_karyawan: req.body.id_penerima,
                        id_barang: req.body.id_barang,
                        id_status: req.body.id_status,
                        nama_pengirim: req.body.nama_pengirim,
                        jumlah: req.body.jumlah,
                        keterangan: req.body.keterangan,
                        jumlah: req.body.jumlah,
                        tanggal: req.body.tanggal,
                    },
                    function(error, result) {
                        if (error) {
                            conn.rollback();
                            res.status(200).json({
                                status: false,
                                code: 500,
                                message: error.message,
                            });
                        }

                        conn.commit(function(err) {
                            if (err) {
                                conn.rollback();
                                res.status(200).json({
                                    status: false,
                                    code: 500,
                                    message: err.message,
                                });
                            }

                            res.status(200).json({
                                status: true,
                                code: 200,
                                message: "Barang Masuk berhasil ditambahkan",
                            });
                        });
                    }
                );
            });
        }
    },
};

module.exports = controller;