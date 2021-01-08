var conn = require(__dirname + "/../../config/database");
var md5 = require("md5");

let controller = {
    index: function(req, res) {
        res.render("admin/pages/barang/index");
    },
    datalist: function(req, res) {
        conn.query(
            "SELECT tb.id_barang, tjb.nama_jenis_barang as jenis_barang, tb.nama_barang, tb.serial_number FROM tbl_barang as tb\
        LEFT JOIN tbl_jenis_barang as tjb ON tjb.id_jenis_barang = tb.id_jenis_barang ORDER BY tb.id_barang DESC",
            function(error, result) {
                if (!error) {
                    res.status(200).json({
                        status: true,
                        code: 200,
                        message: "Data Barang",
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
        conn.query("SELECT * FROM tbl_jenis_barang", function(error, result) {
            if (error) {
                res.render("error", { error: error.message });
            }

            res.render("admin/pages/barang/tambah", { dataJenis: result });
        });
    },
    simpan: function(req, res) {
        if (
            req.body.id_jenis_barang.trim() == "" ||
            req.body.serial_number.trim() == "" ||
            req.body.nama_barang.trim() == ""
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
                    "INSERT INTO tbl_barang SET ?", {
                        id_jenis_barang: req.body.id_jenis_barang,
                        serial_number: req.body.serial_number,
                        nama_barang: req.body.nama_barang,
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
                                message: "Barang berhasil ditambahkan",
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
            "SELECT * FROM tbl_barang WHERE id_barang = ? LIMIT 1", [id],
            function(error, result) {
                if (error) {
                    res.render("error", {
                        error: error.message,
                    });
                }

                if (result[0] != undefined) {
                    conn.query(
                        "SELECT * FROM tbl_jenis_barang",
                        function(errorJenis, resultJenis) {
                            if (errorJenis) {
                                res.render("error", { error: errorJenis.message });
                            }

                            res.render("admin/pages/barang/ubah", {
                                dataJenis: resultJenis,
                                data: result[0],
                                id: id,
                            });
                        }
                    );
                } else {
                    res.redirect("admin/barang");
                }
            }
        );
    },
    perbarui: function(req, res) {
        var id = req.body.id;

        if (
            req.body.id_jenis_barang.trim() == "" ||
            req.body.serial_number.trim() == "" ||
            req.body.nama_barang.trim() == ""
        ) {
            res.status(200).json({
                status: false,
                code: 406,
                message: "Data belum lengkap",
            });
        } else {
            conn.query(
                "UPDATE tbl_barang SET id_jenis_barang = ?, serial_number = ?, nama_barang = ? WHERE id_barang = ?", [
                    req.body.id_jenis_barang,
                    req.body.serial_number,
                    req.body.nama_barang,
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
                        message: "Barang berhasil diperbarui",
                    });
                }
            );
        }
    },
    hapus: function(req, res) {
        var id = req.body.id;

        conn.query(
            "DELETE FROM tbl_barang WHERE id_barang = ?", [id],
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
                    message: "Barang berhasil dihapus",
                });
            }
        );
    },
};

module.exports = controller;