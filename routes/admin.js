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

module.exports = router;