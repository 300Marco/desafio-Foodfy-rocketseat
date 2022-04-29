// const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');

module.exports = {
    create(req, res) {
        // return res.render('adminChefs/create');
        return res.render('adminUsers/create');
    },
    async post(req, res) {
        try {
            const userId = await AdminUser.create(req.body);

            req.session.userId = userId;
            
            // return res.send('Ok: Crie uma rota para edição');
            return res.redirect(`/admin/users/${userId}/edit`);
        } catch(err) {
            console.error(err);
        }
    },
    async edit(req, res) {
        try {
            const { user } = req;

            return res.render('adminUsers/edit', { user });
        } catch(err) {
            console.error(err);
        };
    },
    async update(req, res) {
        try {
            const { user } = req;
            let { name, email, is_admin } = req.body;

            await AdminUser.update(user.id, {
                name, 
                email, 
                is_admin
            });

            return res.render(`adminUsers/edit`, {
                user: req.body,
                success: 'Conta atualizada com sucesso!' 
            });
        } catch(err) {
            console.error(err);
            return res.render('AdminUser/edit', {
                error: 'Houve um erro inesperado!'
            })
        }
    }
}
