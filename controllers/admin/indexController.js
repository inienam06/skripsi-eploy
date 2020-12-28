let controller = {
    index: function(req, res) {
        if (!req.session.id_admin) {
            res.redirect("/admin/login");
        }
        res.render("admin/index", { session: req.session });
    },
    authenticate: function(req, res, next) {
        if (!req.session.id_admin) {
            res.redirect("/admin/login");
        }

        next();
    },
};

module.exports = controller;