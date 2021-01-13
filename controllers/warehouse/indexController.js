let controller = {
    index: function(req, res) {
        if (!req.session.id_user) {
            res.redirect("/warehouse/login");
        }
        res.render("warehouse/index", { session: req.session });
    },
    authenticate: function(req, res, next) {
        if (!req.session.id_user) {
            res.redirect("/warehouse/login");
        }

        next();
    },
};

module.exports = controller;