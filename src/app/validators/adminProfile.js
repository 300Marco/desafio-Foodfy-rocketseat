const AdminUser = require('../models/AdminUser');
const { compare } = require('bcryptjs');

function checkAllFields(body) {
    const keys = Object.keys(body);
        
    for(key of keys) {
        if(body[key] == "" && key) {
            return {
                user: body,
                error: "Por favor, preencha todos os campos"
            };
        };
    };
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
//         return res.render('adminUsers/edit', fillAllFields);
//     };

//     const { id } = req.body;

//     const user = await AdminUser.findOne({ where: {id} })

//     req.user = user;

//     next();
// }

module.exports = {
    edit
};