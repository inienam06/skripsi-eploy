var conn = require(__dirname + "/../../config/database");

let controller = {
    index: function(req, res) {
        res.render("warehouse/pages/stock-opname/index");
    },
    datalist: function(req, res) {
        conn.query(
            "SELECT tblo.id_opname, tk.nama as nama_karyawan, tk.npp, ta.nama_area, tblo.tanggal_pencatatan, tblo.tanggal_selesai FROM tbl_opname as tblo\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tblo.id_karyawan\
            LEFT JOIN tbl_area as ta ON ta.id_area = tblo.id_area\
            ORDER BY tblo.id_opname DESC",
            function(error, result) {
                if (!error) {
                    res.status(200).json({
                        status: true,
                        code: 200,
                        message: "Data Opname",
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
            "SELECT * FROM tbl_karyawan",
            function(errorKaryawan, resultKaryawan) {
                if (errorKaryawan) {
                    res.render("error", { error: errorKaryawan.message });
                }

                conn.query("SELECT * FROM tbl_area", function(errorArea, resultArea) {
                    if (errorArea) {
                        res.render("error", { error: errorArea.message });
                    }

                    conn.query(
                        "SELECT * FROM ref_spesifikasi",
                        function(errorSpesifikasi, resultSpesifikasi) {
                            if (errorSpesifikasi) {
                                res.render("error", { error: errorSpesifikasi.message });
                            }

                            res.render("warehouse/pages/stock-opname/tambah", {
                                dataKaryawan: resultKaryawan,
                                dataArea: resultArea,
                                dataSpesifikasi: resultSpesifikasi,
                            });
                        }
                    );
                });
            }
        );
    },
    simpan: function(req, res) {
        if (
            req.body.tanggal_pencatatan.trim() == "" ||
            req.body.tanggal_selesai.trim() == ""
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
                    "INSERT INTO tbl_opname SET ?", {
                        id_karyawan: req.body.id_karyawan,
                        id_area: req.body.id_area,
                        tanggal_pencatatan: req.body.tanggal_pencatatan,
                        tanggal_selesai: req.body.tanggal_selesai,
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

                        req.body.spesifikasi.forEach(function(data) {
                            conn.query(
                                "INSERT INTO tbl_opname_spesifikasi SET ?", {
                                    id_opname: result.insertId,
                                    id_spesifikasi: data.id,
                                    keterangan: data.value,
                                },
                                function(errorSpesifikasi, resultSpesifikasi) {
                                    if (errorSpesifikasi) {
                                        conn.rollback();
                                        res.status(200).json({
                                            status: false,
                                            code: 500,
                                            message: errorSpesifikasi.message,
                                        });
                                    }
                                }
                            );
                        });

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
                                message: "Opname berhasil ditambahkan",
                            });
                        });
                    }
                );
            });
        }
    },
    detail: function(req, res) {
        var id = req.params.id;

        conn.query(
            "SELECT tblo.id_opname, tk.nama as nama_karyawan, tk.npp, ta.nama_area, tblo.tanggal_pencatatan, tblo.tanggal_selesai FROM tbl_opname as tblo\
            LEFT JOIN tbl_karyawan as tk ON tk.id_karyawan = tblo.id_karyawan\
            LEFT JOIN tbl_area as ta ON ta.id_area = tblo.id_area\
            WHERE tblo.id_opname = ?\
            LIMIT 1", [id],
            function(error, result) {
                if (error) {
                    res.render("error", {
                        error: error.message,
                    });
                }

                if (result[0] != undefined) {
                    conn.query(
                        "SELECT * FROM tbl_opname_spesifikasi as tos\
                        LEFT JOIN ref_spesifikasi as rs ON rs.id_spesifikasi = tos.id_spesifikasi\
                        WHERE id_opname = ?", [id],
                        function(errorSpesifikasi, resultSpesifikasi) {
                            if (errorSpesifikasi) {
                                res.render("error", { error: errorSpesifikasi.message });
                            }

                            res.render("warehouse/pages/stock-opname/detail", {
                                data: result[0],
                                dataSpesifikasi: resultSpesifikasi,
                            });
                        }
                    );
                } else {
                    res.redirect("warehouse/stock-opname");
                }
            }
        );
    },
};

module.exports = controller;