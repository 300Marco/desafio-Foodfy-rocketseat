const AdminUser = require('../models/AdminUser');

// async function checkAllFields(body) {
//     const keys = Object.keys(body);

//     for(key of keys) {
//         if(body[key] == "" && key != 'is_admin') {
//             return {
//                 user: body,
//                 error: "Por favor, preencha todos os campos"
//             };
//         };
//     };
// }

function fieldFormatting(text) {
    return text.toLowerCase().split(' ').map(word => {
        return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
}

function emailFieldFormatting(text) {
    return text.toLowerCase();
}

async function edit(req, res, next) {
    try {
        // const { userId: id } = req.session; // pegando o id de session
        const id = req.params.id;

        // busca o usuário que iremos editar
        const user = await AdminUser.findOne({ where: {id} });

        if(!user) return res.render('adminUsers/create', {
            error: "Usuário não encontrado",
        });

        req.user_data = user;

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    }
}

// async function post(req, res, next) {
//     try {
//         const data = req.body;

//         if(data.is_admin) {
//             data.is_admin = true;
//         } else {
//             data.is_admin = false;
//         };

//         // checar se todos os campos estão preenchidos
//         const fillAllFields = checkAllFields(req.body);
//         if(fillAllFields) {
//             return res.render('adminUsers/create', {fillAllFields});
//         };

//         // Checar se usuário já existe [email]
//         const { email } = req.body;
//         const user = await AdminUser.findOne({ where: {email} });

//         if(user) return res.render('adminUsers/create', {
//             user: data,
//             error: "Email já cadastrado"
//         });

//         next();
//     } catch(err) {
//         console.error(err);
//     };
// }
async function post(req, res, next) {
    try {
        const data = req.body;

        if(data.is_admin) {
            data.is_admin = true;
        } else {
            data.is_admin = false;
        };

        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        // checar se todos os campos estão preenchidos
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'is_admin') {
                return res.render('adminUsers/create', {
                    user_data: req.body,
                    user,
                    error: "Por favor, preencha todos os campos"
                });
            };
        };

        // Checar se usuário já existe [email]
        const { email } = req.body;
        const findUser = await AdminUser.findOne({ where: {email} });

        if(findUser) return res.render('adminUsers/create', {
            user_data: data,
            user,
            error: "Email já cadastrado"
        });

        req.body.name = fieldFormatting(req.body.name).replace(/De/, 'de');
        req.body.email = emailFieldFormatting(req.body.email);

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

// async function put(req, res, next) {
//     const data = req.body;

//     if(data.is_admin) {
//         data.is_admin = true;
//     } else {
//         data.is_admin = false;
//     };

//     // checar se todos os campos estão preenchidos
//     const fillAllFields = checkAllFields(req.body);
//     if(fillAllFields) {
//         return res.render('adminUsers/edit', fillAllFields);
//     };

//     const { id } = req.body;

//     const user = await AdminUser.findOne({ where: {id} });

//     req.user_data = user;

//     next();
// // }

async function put(req, res, next) {
    try {
        // const data = req.body;

        if(req.body.is_admin) {
            req.body.is_admin = true;
        } else {
            req.body.is_admin = false;
        };

        // let user_data = user;

        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        // checar se todos os campos estão preenchidos
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'is_admin') {
                return res.render('adminUsers/edit', {
                    user_data: req.body,
                    user,
                    error: "Por favor, preencha todos os campos"
                });
            };
        };

        const { email } = req.body;

        const findUser = await AdminUser.findOne({ where: {email} });

        if(findUser) {
            if(email == findUser.email && req.body.id != findUser.id) return res.render('adminUsers/edit', {
                user_data: req.body,
                user,
                error: "Este email já existe, use outro email!"
            });
        };

        req.body.name = fieldFormatting(req.body.name).replace(/De/, 'de');
        req.body.email = emailFieldFormatting(req.body.email);

        req.user_data = req.body;

        next();
    } catch (err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    }
}

// async function put(req, res, next) {
//     const data = req.body;

//     if(data.is_admin) {
//         data.is_admin = true;
//     } else {
//         data.is_admin = false;
//     };

//     // let user_data = user;

//     // checar se todos os campos estão preenchidos
//     const keys = Object.keys(req.body);

//     for(key of keys) {
//         if(req.body[key] == "" && key != 'is_admin') {
//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render('adminUsers/edit', {
//                 user_data: req.body,
//                 user,
//                 error: "Por favor, preencha todos os campos"
//             });
//         };
//     };

//     const { id } = req.body;

//     const user = await AdminUser.findOne({ where: {id} });

//     req.user_data = user;

//     next();
// }

module.exports = {
    edit,
    post,
    put
};