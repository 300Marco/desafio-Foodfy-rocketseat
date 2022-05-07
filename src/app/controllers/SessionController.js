const crypto = require('crypto');
const AdminUser = require('../models/AdminUser');
const mailer = require('../../lib/mailer');
const { passwordResetEmail } = require('../../lib/utils')

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
    async forgot(req, res) {
        try {
            const user = req.user;

            // Criar token para o usuário
            const token = crypto.randomBytes(20).toString('hex');

            // Criar tempo de expiração para o token
            let now = new Date();
            now = now.setHours(now.getHours() + 1);

            await AdminUser.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            });

            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Solicitação para recuperação de senha',
                html: passwordResetEmail(token, user.name),
            });

            // avisar o suário que enviamos o email
            return res.render('session/forgot-password', {
                success: "Verifique sua caixa de entrada no email informado!"
            });
        } catch(err) {
            console.error(err);
            return res.render('session/forgot-password', {
                error: "Houve um erro inesperado, tente novamente!"
            });
        }
    },
    resetForm(req, res) {
        return res.render('session/password-reset', {
            token: req.query.token
        });
    },
    reset(req, res) {
        try {
            const { email, password, passwordRepeat, token } = req.body;

            // cria um novo hash de senha

            // atualiza o usuário

            // avisa o usuário que ele tem uma nova senha

        } catch(err) {
            console.error(err);
            return res.render('session/password-reset', {
                error: "Erro inesperado, tente novamente"
            });
        };
    }
}
