var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/user/index");
    },
    datalist: function(req, res) {
        conn.query(
            "SELECT tu.id_user, tu.nama, tu.username, rf.nama_level FROM tbl_user as tu\
            LEFT JOIN ref_level as rf ON rf.id_level = tu.id_level",
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
};

module.exports = controller;