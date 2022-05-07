// const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');
const mailer = require('../../lib/mailer');
const { sendAccessEmail } = require('../../lib/utils');

module.exports = {
    async list(req, res) {
        try {
            let results = await AdminUser.all();
            const users = results.rows;

            if(!users) return res.render('/admin/users', {
                error: "Nenhum usuário encontrado"
            });

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminUsers/list', { users, user });
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
    async create(req, res) {
        return res.render('adminUsers/create');
    },
    async post(req, res) {
        try {
            let random = Math.random().toString(36).substring(0, 8);
            let password = random.replace(/^../, "");

            await mailer.sendMail({
                to: req.body.email,
                from: 'no-reply@foodfy.com.br',
                subject: 'Acesso ao Foodfy',
                html: sendAccessEmail(req.body.name, password),
            });

            // let password = '123';

            const userId = await AdminUser.create(req.body, password);

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
    },
    async delete(req, res) {
        const { id } = req.body;
        const user = await AdminUser.findOne({ where: {id} });
        const checkIsUser = req.body.id == req.session.userId;

        if(checkIsUser == true) return res.render('adminUsers/edit', {
            user,
            error: 'Não é permitido excluir sua própria conta!'
        });

        AdminUser.delete(req.body.id);
        return res.redirect('/admin/users');
    },
    async deleteUserList(req, res) {
        try {
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            const checkIsUser = req.body.id == req.session.userId;

            let results = await AdminUser.all();
            let users = results.rows;

            if(checkIsUser == true) return res.render('adminUsers/list', {
                users,
                user,
                error: 'Não é permitido excluir sua própria conta!'
            });

            await AdminUser.delete(req.body.id);

            results = await AdminUser.all();
            users = results.rows;
            if(!users) return res.render('/admin/users', {
                error: "Nenhum usuário encontrado"
            });
            // return res.redirect('/admin/users');
            return res.render('adminUsers/list', {
                users,
                user,
                success: 'Usuário deletado com sucesso'
            });
        } catch(err) {
            console.error(err);
        };
    }
}
