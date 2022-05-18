// const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');

module.exports = {
    edit(req, res) {
        try {
            const { user } = req;

            return res.render('adminProfile/edit', { user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async update(req, res) {
        try {
            const { user } = req;
            let { name, email } = req.body;

            await AdminUser.update(user.id, {
                name, 
                email
            });

            return res.render(`adminProfile/edit`, {
                user: req.body,
                success: 'Conta atualizada com sucesso!'
            });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    }
}
