var conn = require(__dirname + "/../../config/database");

let controller = {
    form: function(req, res) {
        if (req.session.id_user) {
            res.redirect("/teknikal");
        }
        res.render("teknikal/login");
    },
    login: function(req, res) {
        conn.query(
            "SELECT * FROM tbl_user WHERE username = ? AND password = md5(md5(?)) AND id_level = 2 LIMIT 1", [req.body.username, req.body.password],
            function(error, result, fields) {
                if (!error) {
                    if (result.length < 1) {
                        res.status(200).json({
                            status: false,
                            code: 404,
                            message: "Username atau password salah",
                        });
                    } else {
                        res.status(200).json({
                            status: true,
                            code: 200,
                            message: "Login berhasil",
                            data: result[0],
                        });
                    }
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
    auth: function(req, res) {
        conn.query(
            "SELECT * FROM tbl_user WHERE id_user = ? LIMIT 1", [req.params.uid],
            function(error, result, fields) {
                if (!error) {
                    if (result.length < 1) {
                        res.redirect("/teknikal/login");
                    } else {
                        req.session.id_user = result[0].id_user;
                        req.session.nama = result[0].nama;
                        res.redirect("/teknikal");
                    }
                } else {
                    res.render("error", { error: error.message });
                }
            }
        );
    },
    logout: function(req, res) {
        req.session.destroy();
        res.redirect("/teknikal/login");
    },
};

module.exports = controller;