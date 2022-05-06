const crypto = require('crypto');
const AdminUser = require('../models/AdminUser');
const mailer = require('../../lib/mailer');

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

            // enviar email com link de recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Solicitação de recuperação de senha',
                html: `
                    <h2>Esqueceu sua senha?</h2>
                    <p>
                        Não se preocupe, clique no link abaixo para recuperar sua senha!
                    </p>
                    <a href="http://localhost:3000/admin/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHA
                    </a>
                `,
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
    }
}
