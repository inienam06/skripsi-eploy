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

/* Area */
router.use("/area", indexController.authenticate);
router.get("/area", areaController.index);
router.get("/area/datalist", areaController.datalist);
router.get("/area/tambah", areaController.tambah);
router.post("/area/simpan", areaController.simpan);
router.get("/area/ubah/:id", areaController.ubah);
router.post("/area/perbarui", areaController.perbarui);
router.post("/area/hapus", areaController.hapus);

module.exports = router;