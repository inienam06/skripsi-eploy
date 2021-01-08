var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/user/index");
    },
    datalist: function(req, res) {
        conn.query(
            "SELECT tu.id_user, tu.nama, tu.username, rf.nama_level FROM tbl_user as tu\
            LEFT JOIN ref_level as rf ON rf.id_level = tu.id_level ORDER BY tu.id_user DESC",
            function(error, result) {
                if (!error) {
                    res.status(200).json({
                        status: true,
                        code: 200,
                        message: "Data User",
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
        conn.query("SELECT * FROM ref_level", function(error, result) {
            if (!error) {
                res.render("admin/pages/user/tambah", { dataLevel: result });
            } else {
                res.render("error", { error: error.message });
            }
        });
    },
    simpan: function(req, res) {
        if (
            req.body.nama.trim() == "" ||
            req.body.username.trim() == "" ||
            req.body.password.trim() == ""
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

                conn.query(
                    "INSERT INTO tbl_user SET ?", {
                        id_level: req.body.id_level,
                        nama: req.body.nama,
                        username: req.body.username,
                        password: md5(md5(req.body.password)),
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
                                message: "User berhasil ditambahkan",
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
            "SELECT * FROM tbl_user WHERE id_user = ? LIMIT 1", [id],
            function(error, result) {
                if (error) {
                    res.render("error", { error: error.message });
                }

                if (result[0] != undefined) {
                    conn.query(
                        "SELECT * FROM ref_level",
                        function(errorLevel, resultLevel) {
                            if (!errorLevel) {
                                res.render("admin/pages/user/ubah", {
                                    dataLevel: resultLevel,
                                    data: result[0],
                                    id: id,
                                });
                            } else {
                                res.render("error", { error: errorLevel.message });
                            }
                        }
                    );
                } else {
                    res.redirect("admin/user");
                }
            }
        );
    },
    perbarui: function(req, res) {
        var id = req.body.id;

        if (req.body.nama.trim() == "" || req.body.username.trim() == "") {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.query(
                "UPDATE tbl_user SET nama = ? , username = ? , id_level = ? WHERE id_user = ?", [req.body.nama, req.body.username, req.body.id_level, id],
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
                        message: "User berhasil diperbarui",
                    });
                }
            );
        }
    },
    hapus: function(req, res) {
        var id = req.body.id;

        conn.query(
            "DELETE FROM tbl_user WHERE id_user = ?", [id],
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
                    message: "User berhasil dihapus",
                });
            }
        );
    },
};

module.exports = controller;