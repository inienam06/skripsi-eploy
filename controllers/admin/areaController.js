var conn = require(__dirname + "/../../config/database");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/area/index");
    },
    datalist: function(req, res) {
        conn.query("SELECT* FROM tbl_area", function(error, result) {
            if (!error) {
                res.status(200).json({
                    status: true,
                    code: 200,
                    message: "Data Area",
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
        res.render("admin/pages/area/tambah");
    },
    simpan: function(req, res) {
        if (req.body.nama_area.trim() == "") {
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
                    "INSERT INTO tbl_area SET ?", {
                        nama_area: req.body.nama_area,
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
                                message: "Area berhasil ditambahkan",
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
            "SELECT * FROM tbl_area WHERE id_area = ? LIMIT 1", [id],
            function(error, result) {
                if (error) {
                    res.render("error", { error: error.message });
                }

                if (result[0] != undefined) {
                    res.render("admin/pages/area/ubah", {
                        data: result[0],
                        id: id,
                    });
                } else {
                    res.redirect("admin/area");
                }
            }
        );
    },
    perbarui: function(req, res) {
        var id = req.body.id;

        if (req.body.nama_area.trim() == "") {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.query(
                "UPDATE tbl_area SET nama_area = ? WHERE id_area = ?", [req.body.nama_area, id],
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
                        message: "Area berhasil diperbarui",
                    });
                }
            );
        }
    },
    hapus: function(req, res) {
        var id = req.body.id;

        conn.query(
            "DELETE FROM tbl_area WHERE id_area = ?", [id],
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
                    message: "Area berhasil dihapus",
                });
            }
        );
    },
};

module.exports = controller;