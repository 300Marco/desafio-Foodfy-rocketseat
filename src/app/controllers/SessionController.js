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
        return res.redirect('/');
    },
    forgotForm(req, res) {
        return res.render('session/forgot-password');
    },
    forgot(req, res) {
        // Criar token para o usuário

        // Criar tempo de expiração para o token

        // enviar email com link de recuperação de senha

        // avisar o suário que enviamos o email
    }
}
