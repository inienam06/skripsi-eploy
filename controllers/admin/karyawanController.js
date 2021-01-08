var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/karyawan/index");
    },
    datalist: function(req, res) {
        conn.query(
            "SELECT tk.id_karyawan, tk.npp, tk.nama, tk.alamat, tk.no_telp, rd.nama_departemen FROM tbl_karyawan as tk \
        LEFT JOIN ref_departemen as rd ON rd.id_departemen = tk.id_departemen ORDER BY tk.id_karyawan DESC",
            function(error, result) {
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
            }
        );
    },
    tambah: function(req, res) {
        conn.query("SELECT * FROM ref_departemen", function(error, result) {
            if (error) {
                res.render("error", { error: error.message });
            }

            res.render("admin/pages/karyawan/tambah", { dataDepartemen: result });
        });
    },
    simpan: function(req, res) {
        if (req.body.nama.trim() == "") {
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
                        id_departemen: req.body.id_departemen,
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
                    conn.query(
                        "SELECT * FROM ref_departemen",
                        function(errorDepartemen, resultDepartemen) {
                            if (errorDepartemen) {
                                res.render("error", { error: errorDepartemen.message });
                            }

                            res.render("admin/pages/karyawan/ubah", {
                                data: result[0],
                                id: id,
                                dataDepartemen: resultDepartemen,
                            });
                        }
                    );
                } else {
                    res.redirect("admin/karyawan");
                }
            }
        );
    },
    perbarui: function(req, res) {
        var id = req.body.id;

        if (req.body.nama.trim() == "") {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.query(
                "UPDATE tbl_karyawan SET id_departemen = ?, npp = ?, nama = ? , alamat = ? , no_telp = ? WHERE id_karyawan = ?", [
                    req.body.id_departemen,
                    req.body.npp,
                    req.body.nama,
                    req.body.alamat,
                    req.body.no_telp,
                    id,
                ],
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