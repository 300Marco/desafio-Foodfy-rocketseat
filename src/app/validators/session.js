const AdminUser = require('../models/AdminUser');
const { compare } = require('bcryptjs');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

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
        const { email } = req.body;

        let user = await AdminUser.findOne({ where: {email} });

        if(!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "Email não cadastrado!"
        });

        next();
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    login,
    forgot
};