var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/karyawan/index");
    },
    datalist: function(req, res) {
        conn.query("SELECT * FROM tbl_karyawan", function(error, result) {
            if (!error) {
                res.status(200).json({
                    status: true,
                    code: 200,
                    message: "Data Karyawan",
                    data: result,
                });
            } else {
                res.status(200).json({
                    status: false,
                    code: 500,
                    message: error.message,
                });
            }
        });
    },
    tambah: function(req, res) {
        res.render("admin/pages/karyawan/tambah");
    },
    simpan: function(req, res) {
        if (req.body.npp.trim() == "" || req.body.nama.trim() == "") {
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

                conn.query(
                    "INSERT INTO tbl_karyawan SET ?", {
                        npp: req.body.npp,
                        nama: req.body.nama,
                        alamat: req.body.alamat,
                        no_telp: req.body.no_telp,
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
                                message: "Karyawan berhasil ditambahkan",
                            });
                        });
                    }
                );
            });
        }
    },
    ubah: function(req, res) {
        var id = req.params.id;

        conn.query(
            "SELECT * FROM tbl_karyawan WHERE id_karyawan = ? LIMIT 1", [id],
            function(error, result) {
                if (error) {
                    res.render("error", { error: error.message });
                }

                if (result[0] != undefined) {
                    res.render("admin/pages/karyawan/ubah", {
                        data: result[0],
                        id: id,
                    });
                } else {
                    res.redirect("admin/karyawan");
                }
            }
        );
    },
    perbarui: function(req, res) {
        var id = req.body.id;

        if (req.body.npp.trim() == "" || req.body.nama.trim() == "") {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.query(
                "UPDATE tbl_karyawan SET npp = ?, nama = ? , alamat = ? , no_telp = ? WHERE id_karyawan = ?", [req.body.npp, req.body.nama, req.body.alamat, req.body.no_telp, id],
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
                        message: "Karyawan berhasil diperbarui",
                    });
                }
            );
        }
    },
    hapus: function(req, res) {
        var id = req.body.id;

        conn.query(
            "DELETE FROM tbl_karyawan WHERE id_karyawan = ?", [id],
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
                    message: "Karyawan berhasil dihapus",
                });
            }
        );
    },
};

module.exports = controller;