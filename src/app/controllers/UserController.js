// const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');
const AdminRecipe = require('../models/AdminRecipe');
const File = require('../models/File');
const mailer = require('../../lib/mailer');
const { sendAccessEmail } = require('../../lib/utils');
const { hash } = require('bcryptjs');
const { unlinkSync } = require('fs');

module.exports = {
    async list(req, res) {
        try {
            let users = await AdminUser.findAll();
            // const users = results.rows;

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            if(!users) return res.render('/admin/users', {
                user,
                error: "Nenhum usuário encontrado"
            });

            return res.render('adminUsers/list', { users, user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async create(req, res) {
        try {
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminUsers/create', { user });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async post(req, res) {
        try {
            let { name, email, is_admin } = req.body;

            let random = Math.random().toString(36).substring(0, 8);
            let password = random.replace(/^../, "");

            // await mailer.sendMail({
            //     to: email,
            //     from: 'no-reply@foodfy.com.br',
            //     subject: 'Acesso ao Foodfy',
            //     html: sendAccessEmail(name, password),
            // });

            password = await hash(password, 8);

            await AdminUser.create({
                name,
                email,
                password,
                is_admin
            });
            
            // Success message when registering
            let users = await AdminUser.findAll();
            // const users = results.rows;

            if(!users) return res.render('/admin/users', {
                error: "Nenhum usuário encontrado"
            });

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render(`adminUsers/list`, {
                users,
                user,
                success: "Usuário cadastrado com sucesso!"
            });
        } catch(err) {
            console.error(err);
            return res.render(`adminUsers/edit`, {
                user_data: req.body,
                user,
                error: "Ops... houve algum erro!"
            });
        };
    },
    async edit(req, res) {
        try {
            const { user_data } = req;

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminUsers/edit', { user_data, user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async put(req, res) {
        try {
            const { user_data } = req;
            let { name, email, is_admin } = req.body;

            await AdminUser.update(user_data.id, {
                name, 
                email, 
                is_admin
            });

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render(`adminUsers/edit`, {
                user_data: req.body,
                user,
                success: 'Conta atualizada com sucesso!' 
            });
        } catch(err) {
            console.error(err);
            return res.render('AdminUser/edit', {
                user_data: req.body,
                user,
                error: "Ops... houve algum erro!"
            });
        };
    },
    async delete(req, res) {
        try {
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            const checkIsUser = req.body.id == req.session.userId;

            if(checkIsUser == true) return res.render('adminUsers/edit', {
                user_data: user,
                user,
                error: 'Não é permitido excluir sua própria conta!'
            });

            // delete files
            const userId = req.body.id;
            const recipes = await AdminRecipe.findAll();

            let confirmDelete = false;

            recipes.map( async recipe => {
                if(recipe.user_id == userId) {
                    confirmDelete = true;
                    let files = await AdminRecipe.files(recipe.id);
                    files = files.map(file => {
                        File.delete(file.id);
                        unlinkSync(file.path);
                    });
                };
            });

            if(confirmDelete == true) {
                await AdminUser.delete(req.body.id);
            }
            
            // Fetch user list, to render next page
            let users = await AdminUser.findAll();

            if(!users) return res.render('/admin/users', {
                error: "Nenhum usuário encontrado"
            });

            return res.render(`adminUsers/list`, {
                users,
                user,
                success: "Usuário deletado com sucesso!"
            });
        } catch(err) {
            console.error(err);
            return res.render(`adminUsers/edit`, {
                users,
                user,
                error: "Ops... houve algum erro!"
            });
        };
    },
    async deleteUserList(req, res) {
        try {
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            const checkIsUser = req.body.id == req.session.userId;

            let users = await AdminUser.findAll();

            if(checkIsUser == true) return res.render('adminUsers/list', {
                users,
                user,
                error: 'Não é permitido excluir sua própria conta!'
            });

            // delete files
            const userId = req.body.id;
            const recipes = await AdminRecipe.findAll();

            let confirmDelete = false;

            recipes.map( async recipe => {
                if(recipe.user_id == userId) {
                    confirmDelete = true;
                    let files = await AdminRecipe.files(recipe.id);
                    files = files.map(file => {
                        File.delete(file.id);
                        unlinkSync(file.path);
                    });
                };
            });

            if(confirmDelete == true) {
                await AdminUser.delete(req.body.id);
            } else {
                await AdminUser.delete(req.body.id);
            }

            // Fetch user list, to render next page
            users = await AdminUser.findAll();

            if(!users) return res.render('/admin/users', {
                error: "Nenhum usuário encontrado"
            });
            
            return res.render('adminUsers/list', {
                users,
                user,
                success: 'Usuário deletado com sucesso!'
            });
        } catch(err) {
            console.error(err);
            return res.render(`adminUsers/list`, {
                users,
                user,
                error: "Ops... houve algum erro!"
            });
        };
    }
}
// module.exports = {
//     async list(req, res) {
//         try {
//             let results = await AdminUser.all();
//             const users = results.rows;

//             if(!users) return res.render('/admin/users', {
//                 error: "Nenhum usuário encontrado"
//             });

//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render('adminUsers/list', { users, user });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async create(req, res) {
//         try {
//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render('adminUsers/create', { user });
//         } catch (err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async post(req, res) {
//         try {
//             let random = Math.random().toString(36).substring(0, 8);
//             let password = random.replace(/^../, "");

//             await mailer.sendMail({
//                 to: req.body.email,
//                 from: 'no-reply@foodfy.com.br',
//                 subject: 'Acesso ao Foodfy',
//                 html: sendAccessEmail(req.body.name, password),
//             });

//             await AdminUser.create(req.body, password);
            
//             // Success message when registering
//             let results = await AdminUser.all();
//             const users = results.rows;

//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render(`adminUsers/list`, {
//                 users,
//                 user,
//                 success: "Usuário cadastrado com sucesso!"
//             });
//         } catch(err) {
//             console.error(err);
//             return res.render(`adminUsers/edit`, {
//                 user_data: req.body,
//                 user,
//                 error: "Ops... houve algum erro!"
//             });
//         };
//     },
//     async edit(req, res) {
//         try {
//             const { user_data } = req;

//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render('adminUsers/edit', { user_data, user });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async put(req, res) {
//         try {
//             const { user_data } = req;
//             let { name, email, is_admin } = req.body;

//             await AdminUser.update(user_data.id, {
//                 name, 
//                 email, 
//                 is_admin
//             });

//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render(`adminUsers/edit`, {
//                 user_data: req.body,
//                 user,
//                 success: 'Conta atualizada com sucesso!' 
//             });
//         } catch(err) {
//             console.error(err);
//             return res.render('AdminUser/edit', {
//                 user_data: req.body,
//                 user,
//                 error: "Ops... houve algum erro!"
//             });
//         };
//     },
//     async delete(req, res) {
//         try {
//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });
//             const checkIsUser = req.body.id == req.session.userId;

//             if(checkIsUser == true) return res.render('adminUsers/edit', {
//                 user_data: user,
//                 user,
//                 error: 'Não é permitido excluir sua própria conta!'
//             });

//             await AdminUser.delete(req.body.id);
            
//             // Error message when deleting
//             let results = await AdminUser.all();
//             const users = results.rows;

//             return res.render(`adminUsers/list`, {
//                 users,
//                 user,
//                 success: "Usuário deletado com sucesso!"
//             });
//         } catch(err) {
//             console.error(err);
//             return res.render(`adminUsers/edit`, {
//                 users,
//                 user,
//                 error: "Ops... houve algum erro!"
//             });
//         };
//     },
//     async deleteUserList(req, res) {
//         try {
//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             const checkIsUser = req.body.id == req.session.userId;

//             let results = await AdminUser.all();
//             let users = results.rows;

//             if(checkIsUser == true) return res.render('adminUsers/list', {
//                 users,
//                 user,
//                 error: 'Não é permitido excluir sua própria conta!'
//             });

//             await AdminUser.delete(req.body.id);

//             results = await AdminUser.all();
//             users = results.rows;
//             if(!users) return res.render('/admin/users', {
//                 error: "Nenhum usuário encontrado"
//             });
            
//             return res.render('adminUsers/list', {
//                 users,
//                 user,
//                 success: 'Usuário deletado com sucesso'
//             });
//         } catch(err) {
//             console.error(err);
//             return res.render(`adminUsers/list`, {
//                 users,
//                 user,
//                 error: "Ops... houve algum erro!"
//             });
//         };
//     }
// }
