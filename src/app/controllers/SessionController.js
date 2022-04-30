module.exports = {
    login(req, res) {
        return res.render('session/login');
    },
    logout(req, res) {
        req.session.destroy();

        // mudar essa rota, posteriormente
        return res.redirect('/admin/chefs');
    }
}
