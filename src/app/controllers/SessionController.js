module.exports = {
    loginForm(req, res) {
        return res.render('session/login');
    },
    login(req, res) {
        req.session.userId = req.user.id;

        return res.redirect('/admin/profile');
    },
    logout(req, res) {
        req.session.destroy();

        // mudar essa rota, posteriormente
        return res.redirect('/');
    }
}
