module.exports = {
    logout(req, res) {
        req.session.destroy();

        // mudar essa rota, posteriormente
        return res.redirect('/admin/chefs');
    }
}
