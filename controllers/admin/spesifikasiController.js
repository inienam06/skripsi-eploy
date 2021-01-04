var conn = require(__dirname + "/../../config/database");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/spesifikasi/index");
    },
    datalist: function(req, res) {
        conn.query("SELECT* FROM ref_spesifikasi", function(error, result) {
            if (!error) {
                res.status(200).json({
                    status: true,
                    code: 200,
                    message: "Data Spesifikasi",
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
        res.render("admin/pages/spesifikasi/tambah");
    },
    simpan: function(req, res) {
        if (req.body.nama_spesifikasi.trim() == "") {
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
                    "INSERT INTO ref_spesifikasi SET ?", {
                        nama_spesifikasi: req.body.nama_spesifikasi,
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
                                message: "Spesifikasi berhasil ditambahkan",
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
            "SELECT * FROM ref_spesifikasi WHERE id_spesifikasi = ? LIMIT 1", [id],
            function(error, result) {
                if (error) {
                    res.render("error", { error: error.message });
                }

                if (result[0] != undefined) {
                    res.render("admin/pages/spesifikasi/ubah", {
                        data: result[0],
                        id: id,
                    });
                } else {
                    res.redirect("admin/spesifikasi");
                }
            }
        );
    },
    perbarui: function(req, res) {
        var id = req.body.id;

        if (req.body.nama_spesifikasi.trim() == "") {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.query(
                "UPDATE ref_spesifikasi SET nama_spesifikasi = ? WHERE id_spesifikasi = ?", [req.body.nama_spesifikasi, id],
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
                        message: "Spesifikasi berhasil diperbarui",
                    });
                }
            );
        }
    },
    hapus: function(req, res) {
        var id = req.body.id;

        conn.query(
            "DELETE FROM ref_spesifikasi WHERE id_spesifikasi = ?", [id],
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
                    message: "Spesifikasi berhasil dihapus",
                });
            }
        );
    },
};

module.exports = controller;