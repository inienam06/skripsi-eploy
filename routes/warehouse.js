var express = require("express");
const app = require("../app");
var router = express.Router();
var loginController = require(__dirname +
    "/../controllers/warehouse/loginController");
var indexController = require(__dirname +
    "/../controllers/warehouse/indexController");
var stockOpnameController = require(__dirname +
    "/../controllers/warehouse/stockOpnameController");

/* GET home page. */
router.get("/", indexController.index);

router.route("/login").get(loginController.form).post(loginController.login);
router.get("/login/:uid", loginController.auth);
router.get("/logout", loginController.logout);

/* Stock Opname */
router.use("/stock-opname", indexController.authenticate);
router.get("/stock-opname", stockOpnameController.index);
router.get("/stock-opname/datalist", stockOpnameController.datalist);
router.get("/stock-opname/tambah", stockOpnameController.tambah);
router.post("/stock-opname/simpan", stockOpnameController.simpan);
router.get("/stock-opname/detail/:id", stockOpnameController.detail);

module.exports = router;