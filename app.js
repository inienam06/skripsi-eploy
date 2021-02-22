var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const pugPdf = require("@ministryofjustice/express-pug-pdf");

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var warehouseRouter = require("./routes/warehouse");
var usersRouter = require("./routes/users");
var teknikalRouter = require("./routes/teknikal");
var app = express();

// view engine setup
// app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(pugPdf({ views: path.join(__dirname, "views") }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "inventory",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/warehouse", warehouseRouter);
app.use("/teknikal", teknikalRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

isEmpty = function(str) {
    return str == null || str == "" ? true : false;
};

getMonthName = function(bulan) {
    var month = [];
    month[1] = "Januari";
    month[2] = "Februari";
    month[3] = "Maret";
    month[4] = "April";
    month[5] = "Mei";
    month[6] = "Juni";
    month[7] = "Juli";
    month[8] = "Agustus";
    month[9] = "September";
    month[10] = "Oktober";
    month[11] = "November";
    month[12] = "Desember";

    return month[bulan];
};

formatDate = function(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
};
module.exports = app;