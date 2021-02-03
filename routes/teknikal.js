var express = require("express");
const app = require("../app");
var router = express.Router();
var loginController = require(__dirname +
    "/../controllers/teknikal/loginController");
var indexController = require(__dirname +
    "/../controllers/teknikal/indexController");
var barangMasukController = require(__dirname +
    "/../controllers/teknikal/barangMasukController");
var barangKeluarController = require(__dirname +
    "/../controllers/teknikal/barangKeluarController");

/* GET home page. */
router.get("/", indexController.index);

router.route("/login").get(loginController.form).post(loginController.login);
router.get("/login/:uid", loginController.auth);
router.get("/logout", loginController.logout);

/* Barang Masuk */
router.use("/barang-masuk", indexController.authenticate);
router.get("/barang-masuk", barangMasukController.index);
router.get("/barang-masuk/datalist", barangMasukController.datalist);
router.get("/barang-masuk/faktur", barangMasukController.faktur);

/* Barang Keluar */
router.use("/barang-keluar", indexController.authenticate);
router.get("/barang-keluar", barangKeluarController.index);
router.get("/barang-keluar/datalist", barangKeluarController.datalist);
router.get("/barang-keluar/faktur", barangKeluarController.faktur);

module.exports = router;