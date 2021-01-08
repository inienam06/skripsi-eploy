var express = require("express");
const app = require("../app");
const { index } = require("../controllers/admin/userController");
var router = express.Router();
var loginController = require(__dirname +
    "/../controllers/admin/loginController");
var indexController = require(__dirname +
    "/../controllers/admin/indexController");
var userController = require(__dirname +
    "/../controllers/admin/userController");
var areaController = require(__dirname +
    "/../controllers/admin/areaController");
var spesifikasiController = require(__dirname +
    "/../controllers/admin/spesifikasiController");
var jenisBarangController = require(__dirname +
    "/../controllers/admin/jenisBarangController");
var barangController = require(__dirname +
    "/../controllers/admin/barangController");
var karyawanController = require(__dirname +
    "/../controllers/admin/karyawanController");
var departemenController = require(__dirname +
    "/../controllers/admin/departemenController");

/* GET home page. */
router.get("/", indexController.index);

router.route("/login").get(loginController.form).post(loginController.login);
router.get("/login/:uid", loginController.auth);
router.get("/logout", loginController.logout);

/* User */
router.use("/user", indexController.authenticate);
router.get("/user", userController.index);
router.get("/user/datalist", userController.datalist);
router.get("/user/tambah", userController.tambah);
router.post("/user/simpan", userController.simpan);
router.get("/user/ubah/:id", userController.ubah);
router.post("/user/perbarui", userController.perbarui);
router.post("/user/hapus", userController.hapus);

/* Karyawan */
router.use("/karyawan", indexController.authenticate);
router.get("/karyawan", karyawanController.index);
router.get("/karyawan/datalist", karyawanController.datalist);
router.get("/karyawan/tambah", karyawanController.tambah);
router.post("/karyawan/simpan", karyawanController.simpan);
router.get("/karyawan/ubah/:id", karyawanController.ubah);
router.post("/karyawan/perbarui", karyawanController.perbarui);
router.post("/karyawan/hapus", karyawanController.hapus);

/* Departemen */
router.use("/departemen", indexController.authenticate);
router.get("/departemen", departemenController.index);
router.get("/departemen/datalist", departemenController.datalist);
router.get("/departemen/tambah", departemenController.tambah);
router.post("/departemen/simpan", departemenController.simpan);
router.get("/departemen/ubah/:id", departemenController.ubah);
router.post("/departemen/perbarui", departemenController.perbarui);
router.post("/departemen/hapus", departemenController.hapus);

/* Area */
router.use("/area", indexController.authenticate);
router.get("/area", areaController.index);
router.get("/area/datalist", areaController.datalist);
router.get("/area/tambah", areaController.tambah);
router.post("/area/simpan", areaController.simpan);
router.get("/area/ubah/:id", areaController.ubah);
router.post("/area/perbarui", areaController.perbarui);
router.post("/area/hapus", areaController.hapus);

/* Spesifikasi */
router.use("/spesifikasi", indexController.authenticate);
router.get("/spesifikasi", spesifikasiController.index);
router.get("/spesifikasi/datalist", spesifikasiController.datalist);
router.get("/spesifikasi/tambah", spesifikasiController.tambah);
router.post("/spesifikasi/simpan", spesifikasiController.simpan);
router.get("/spesifikasi/ubah/:id", spesifikasiController.ubah);
router.post("/spesifikasi/perbarui", spesifikasiController.perbarui);
router.post("/spesifikasi/hapus", spesifikasiController.hapus);

/* Jenis Barang */
router.use("/jenis-barang", indexController.authenticate);
router.get("/jenis-barang", jenisBarangController.index);
router.get("/jenis-barang/datalist", jenisBarangController.datalist);
router.get("/jenis-barang/tambah", jenisBarangController.tambah);
router.post("/jenis-barang/simpan", jenisBarangController.simpan);
router.get("/jenis-barang/ubah/:id", jenisBarangController.ubah);
router.post("/jenis-barang/perbarui", jenisBarangController.perbarui);
router.post("/jenis-barang/hapus", jenisBarangController.hapus);

/* Barang */
router.use("/barang", indexController.authenticate);
router.get("/barang", barangController.index);
router.get("/barang/datalist", barangController.datalist);
router.get("/barang/tambah", barangController.tambah);
router.post("/barang/simpan", barangController.simpan);
router.get("/barang/ubah/:id", barangController.ubah);
router.post("/barang/perbarui", barangController.perbarui);
router.post("/barang/hapus", barangController.hapus);

module.exports = router;