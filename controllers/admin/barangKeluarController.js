var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/barang-keluar/index");
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
    tambah: function(req, res) {
        conn.query(
            "SELECT * FROM tbl_barang as tb\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang",
            function(errorBarang, dataBarang) {
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

                                conn.query(
                                    "SELECT * FROM tbl_area",
                                    function(errorArea, dataArea) {
                                        if (errorArea) {
                                            res.render("error", {
                                                error: errorArea,
                                            });
                                        }

                                        res.render("admin/pages/barang-keluar/tambah", {
                                            dataBarang: dataBarang,
                                            dataKaryawan: dataKaryawan,
                                            dataStatus: dataStatus,
                                            dataArea: dataArea,
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
        try {} catch (err) {}
    },
    simpan: function(req, res) {
        if (
            req.body.id_penerima.trim() == "" ||
            req.body.id_pengirim.trim() == "" ||
            req.body.id_barang.trim() == "" ||
            req.body.id_status.trim() == "" ||
            req.body.id_area.trim() == "" ||
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
                    "INSERT INTO tbl_barang_keluar SET ?", {
                        id_karyawan_pengirim: req.body.id_pengirim,
                        id_karyawan_penerima: req.body.id_penerima,
                        id_barang: req.body.id_barang,
                        id_status: req.body.id_status,
                        id_area: req.body.id_area,
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
                                message: "Barang Keluar berhasil ditambahkan",
                            });
                        });
                    }
                );
            });
        }
    },
    hapus: function(req, res) {
        var id = req.body.id;

        conn.query(
            "DELETE FROM tbl_barang_keluar WHERE id_barang_keluar = ?", [id],
            function(error, result) {
                if (error) {
                    res.status(200).json({
                        status: false,
                        code: 500,
                        message: error.message,
                    });
                }

                res.status(200).json({
                    status: true,
                    code: 200,
                    message: "Barang keluar berhasil dihapus",
                });
            }
        );
    },
};

module.exports = controller;