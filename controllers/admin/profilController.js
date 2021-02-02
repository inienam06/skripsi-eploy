var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    ubahPassword: function(req, res) {
        res.render("admin/pages/profil/ubah_password");
    },
    perbaruiPassword: function(req, res) {
        if (req.body.password_lama.trim() == "" || req.body.password.trim() == "") {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.query(
                "SELECT * FROM tbl_admin WHERE id_admin = ? AND password = ? LIMIT 1", [req.session.id_admin, md5(md5(req.body.password_lama))],
                function(err, results) {
                    if (err) {
                        res.status(200).json({
                            status: false,
                            code: 500,
                            message: err.message,
                        });
                    }

                    if (results.length < 1) {
                        res.status(200).json({
                            status: false,
                            code: 404,
                            message: "Admin tidak ditemukan",
                            session: req.session,
                        });
                    } else {
                        conn.query(
                            "UPDATE tbl_admin SET password = ? WHERE id_admin = ?", [md5(md5(req.body.password)), req.session.id_admin],
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
                                    message: "Password berhasil diperbarui",
                                });
                            }
                        );
                    }
                }
            );
        }
    },
};

module.exports = controller;