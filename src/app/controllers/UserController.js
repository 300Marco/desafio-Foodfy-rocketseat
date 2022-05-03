// const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');

module.exports = {
    async list(req, res) {
        try {
            let results = await AdminUser.all();
            const users = results.rows;

            if(!users) return res.render('/admin/users', {
                error: "Nenhum usuário encontrado"
            });

            return res.render('adminUsers/list', { users });
        } catch(err) {
            console.error(err);
        }
    },
    // async list(req, res) {
    //     // 1° teste de estratégia para acessar apenas quem é admin -- DESCARTADO, EM MIDDLEWARES DE SESSION É MELHOR
    //     try {
    //         const { userId: id } = req.session

    //         // busca o usuário que iremos editar
    //         const user = await AdminUser.findOne({ where: {id} });
            
    //         if(!user.is_admin) {
    //             return res.render('adminProfile/edit', {
    //                 error: "Você não tem permissão para acessar esta página!"
    //             });
    //         };

    //         let results = await AdminUser.all();
    //         const users = results.rows;

    //         if(!users) return res.render('/admin/users', {
    //             error: "Nenhum usuário encontrado"
    //         });

    //         return res.render('adminUsers/list', { users });
    //     } catch(err) {
    //         console.error(err);
    //     }
    // },
    create(req, res) {
        // return res.render('adminChefs/create');
        return res.render('adminUsers/create');
    },
    async post(req, res) {
        try {
            const userId = await AdminUser.create(req.body);

            // req.session.userId = userId;
            
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
    async put(req, res) {
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
