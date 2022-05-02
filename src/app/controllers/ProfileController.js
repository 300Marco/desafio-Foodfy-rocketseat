// const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');

module.exports = {
    edit(req, res) {
        try {
            const { user } = req;

            return res.render('adminProfile/edit', { user });
        } catch(err) {
            console.error(err);
        };
    },
    async update(req, res) {
        try {
            const { user } = req;
            let { name, email, password } = req.body;

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
