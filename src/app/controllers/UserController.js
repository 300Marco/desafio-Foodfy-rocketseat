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
            const { userId: id } = req.session; // pegando o id de session

            // busca o usuário que iremos editar
            const user = await AdminUser.findOne({ where: {id} });

            if(!user) return res.render('adminUsers/create', {
                error: "Usuário não encontrado",
            });

            return res.render('adminUsers/edit', { user });
        } catch(err) {
            console.error(err);
        };
    }
}
