const AdminUser = require('../models/AdminUser');

function fieldFormatting(text) {
    return text.toLowerCase().split(' ').map(word => {
        if(word != '') {
            return word[0].toUpperCase() + word.slice(1);
        };
    }).join(' ');
}

function emailFieldFormatting(text) {
    return text.toLowerCase();
}

function convertToSmallText(func) {
    return func.replace(/À|Ao|Com|Da|De|Do|Dos|E|Em|Na|Sobre/gi, function (string) {
        return string.toLowerCase();
    });
}

async function edit(req, res, next) {
    try {
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
    };
}

// async function post(req, res, next) {
//     try {
//         const data = req.body;

//         if(data.is_admin) {
//             data.is_admin = true;
//         } else {
//             data.is_admin = false;
//         };

//         const { userId: id } = req.session;
//         const user = await AdminUser.findOne({ where: {id} });

//         // checar se todos os campos estão preenchidos
//         const keys = Object.keys(req.body);

//         for(key of keys) {
//             if(req.body[key] == "" && key != 'is_admin') {
//                 return res.render('adminUsers/create', {
//                     user_data: req.body,
//                     user,
//                     error: "Por favor, preencha todos os campos"
//                 });
//             };
//         };

//         // Checar se usuário já existe [email]
//         let { email } = req.body;

//         req.body.name = fieldFormatting(req.body.name).replace(/De/, 'de');
//         email = emailFieldFormatting(email);
//         req.body.email = emailFieldFormatting(req.body.email);

//         const findUser = await AdminUser.findOne({ where: {email} });

//         if(findUser) return res.render('adminUsers/create', {
//             user_data: data,
//             user,
//             error: "Email já cadastrado"
//         });

//         next();
//     } catch(err) {
//         console.error(err);
//         return res.render('adminUsers/not-found');
//     };
// }
async function post(req, res, next) {
    try {
        // checar se todos os campos estão preenchidos
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'is_admin') {
                return res.send("Por favor, preencha todos os campos!");
            };
        };

        // Validate existing user
        const data = req.body;

        if(data.is_admin) {
            data.is_admin = true;
        } else {
            data.is_admin = false;
        };

        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        // Checar se usuário já existe [email]
        let { email } = req.body;

        // req.body.name = fieldFormatting(req.body.name).replace(/De/, 'de');
        req.body.name = convertToSmallText(fieldFormatting(req.body.name));
        email = emailFieldFormatting(email);
        req.body.email = emailFieldFormatting(req.body.email);

        const findUser = await AdminUser.findOne({ where: {email} });

        if(findUser) return res.render('adminUsers/create', {
            user_data: data,
            user,
            error: "Email já cadastrado"
        });

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

async function put(req, res, next) {
    try {
        // checar se todos os campos estão preenchidos
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'is_admin') {
                return res.send("Por favor, preencha todos os campos!");
            };
        };

        // Validate existing user
        if(req.body.is_admin) {
            req.body.is_admin = true;
        } else {
            req.body.is_admin = false;
        };

        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        let { email } = req.body;

        // req.body.name = fieldFormatting(req.body.name).replace(/De/, 'de');
        req.body.name = convertToSmallText(fieldFormatting(req.body.name));
        email = emailFieldFormatting(email);
        req.body.email = emailFieldFormatting(req.body.email);

        const findUser = await AdminUser.findOne({ where: {email} });

        if(findUser) {
            if(email == findUser.email && req.body.id != findUser.id) return res.render('adminUsers/edit', {
                user_data: req.body,
                user,
                error: "Este email já existe, use outro email!"
            });
        };

        req.user_data = req.body;

        next();
    } catch (err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

module.exports = {
    edit,
    post,
    put
};