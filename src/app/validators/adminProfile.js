const AdminUser = require('../models/AdminUser');
const { compare } = require('bcryptjs');

function checkAllFields(body) {
    const keys = Object.keys(body);
        
    for(key of keys) {
        if(body[key] == "" && key != 'is_admin') {
            return {
                user: body,
                error: "Por favor, preencha todos os campos"
            };
        };
    };
}

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
        const { userId: id } = req.session; // pegando o id de session
        
        const user = await AdminUser.findOne({ where: {id} });

        if(!user) return res.render('adminUsers/create', {
            error: "Usuário não encontrado",
        });

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

// async function update(req, res, next) {
//     const data = req.body;

//     if(data.is_admin) {
//         data.is_admin = true;
//     } else {
//         data.is_admin = false;
//     };

//     // checar se todos os campos estão preenchidos
//     const fillAllFields = checkAllFields(req.body);
//     if(fillAllFields) {
//         return res.render('adminProfile/edit', fillAllFields);
//         // return res.render('adminUsers/edit', fillAllFields);
//     };

//     const { id, password } = req.body;

//     const user = await AdminUser.findOne({ where: {id} });
    
//     const passed = await compare(password, user.password);

//     if(!passed) return res.render('adminProfile/edit', {
//         user: req.body,
//         error: "Senha incorreta"
//     });

//     req.user = user;

//     next();
// }
async function update(req, res, next) {
    try {
        let { id, email, password } = req.body;
        const user = await AdminUser.findOne({ where: {id} });

        req.body.name = fieldFormatting(req.body.name).replace(/De/g, 'de');
        email = emailFieldFormatting(email);
        req.body.email = emailFieldFormatting(email);

        // Insert is_admin into req.body
        if(user.is_admin == true) {
            req.body.is_admin = true;
        } else {
            req.body.is_admin = false;
        };

        // Check if all fields are filled
        const fillAllFields = checkAllFields(req.body);
        if(fillAllFields) {
            return res.render('adminProfile/edit', fillAllFields);
        };

        // Check if email already exists
        const allUsers = await AdminUser.all();
        const users = allUsers.rows;
        
        for(let userEmail of users) {
            if(email == userEmail.email && email != user.email)
                return res.render('adminProfile/edit', {
                    user: req.body,
                    error: "Este email já existe, use outro email!"
                });
        };

        const passed = await compare(password, user.password);

        if(!passed) return res.render('adminProfile/edit', {
            user: req.body,
            error: "Senha incorreta"
        });

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    }
}

module.exports = {
    edit,
    update
};