const AdminUser = require('../models/AdminUser');
const { compare } = require('bcryptjs');

function emailFieldFormatting(text) {
    return text.toLowerCase();
}

async function login(req, res, next) {
    try {
        let { email, password } = req.body;

        req.body.email = emailFieldFormatting(req.body.email)
        email = emailFieldFormatting(email);

        // busca o usuário que iremos editar
        const user = await AdminUser.findOne({ where: {email} });

        if(!user) return res.render('session/login', {
            user: req.body,
            error: "Usuário não cadastrado",
        });

        const passed = await compare(password, user.password);

        if(!passed) return res.render('session/login', {
            user: req.body,
            error: "Senha incorreta"
        });

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
    }
}

async function forgot(req, res, next) {
    try {
        let { email } = req.body;

        req.body.email = emailFieldFormatting(req.body.email)
        email = emailFieldFormatting(email);

        let user = await AdminUser.findOne({ where: {email} });

        if(!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "Email não cadastrado!"
        });

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
    }
}

async function reset(req, res, next) {
    try {
        // procurar o usuário
        let { email, password, passwordRepeat, token } = req.body;

        req.body.email = emailFieldFormatting(req.body.email)
        email = emailFieldFormatting(email);

        // busca o usuário que iremos editar
        const user = await AdminUser.findOne({ where: {email} });

        if(!user) return res.render('session/password-reset', {
            user: req.body,
            token,
            error: "Email incorreto!",
        });

        // verificar se a senha bate
        if(password != passwordRepeat) return res.render('session/password-reset', {
            user: req.body,
            token,
            // error: "As senhas não conferem!",
            error: `As senhas não conferem!`,
        });

        // verificar se o token bate
        if(token != user.reset_token) return res.render('session/password-reset', {
            user: req.body,
            error: `
                <span style="display:block;text-align:center;">Token inválido!</span>
                Solicite uma nova recuperação de senha.
            `,
        });

        // verificar se o token não expirou
        let now = new Date();
        now = now.setHours(now.getHours());

        if(now > user.reset_token.expires) return res.render('session/password-reset', {
            user: req.body,
            token,
            // error: "As senhas não conferem!",
            error: `
                <span style="display:block;text-align:center;">Token expirado!</span>
                Por favor, solicite uma nova recuperação de senha.
            `,
        });

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
    } 
}

module.exports = {
    login,
    forgot,
    reset
};