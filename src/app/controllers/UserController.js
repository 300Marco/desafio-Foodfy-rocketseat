// const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');
const User = require('../models/AdminUser');

module.exports = {
    create(req, res) {
        // return res.render('adminChefs/create');
        return res.render('adminUsers/create');
    },
    async post(req, res) {
        const userId = await AdminUser.create(req.body);

        req.session.userId = userId;
        
        // return res.send('Ok: Crie uma rota para edição');
        return res.redirect(`/admin/users/:${userId}/edit`);
    },
    async edit(req, res) {
        return res.send('Usuário criado com sucesso');
    }
}
