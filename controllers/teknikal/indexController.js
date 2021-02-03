let controller = {
    index: function(req, res) {
        if (!req.session.id_user) {
            res.redirect("/teknikal/login");
        }
        res.render("teknikal/index", { session: req.session });
    },
    authenticate: function(req, res, next) {
        if (!req.session.id_user) {
            res.redirect("/teknikal/login");
        }

        next();
    },
};

module.exports = controller;