const AdminUser = require('../models/AdminUser');

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

async function post(req, res, next) {
    try {
        const data = req.body;

        if(data.is_admin) {
            data.is_admin = true;
        } else {
            data.is_admin = false;
        };

        // checar se todos os campos estão preenchidos
        const fillAllFields = checkAllFields(req.body);
        if(fillAllFields) {
            return res.render('adminUsers/create', fillAllFields);
        };

        // Checar se usuário já existe [email]
        const { email } = req.body;
        const user = await AdminUser.findOne({ where: {email} });

        if(user) return res.render('adminUsers/create', {
            user: data,
            error: "Email já cadastrado"
        });

        next();
    } catch(err) {
        console.error(err);
    };
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

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
    }
}

async function put(req, res, next) {
    const data = req.body;

    if(data.is_admin) {
        data.is_admin = true;
    } else {
        data.is_admin = false;
    };

    // checar se todos os campos estão preenchidos
    const fillAllFields = checkAllFields(req.body);
    if(fillAllFields) {
        return res.render('adminUsers/edit', fillAllFields);
    };

    const { id } = req.body;

    const user = await AdminUser.findOne({ where: {id} })

    req.user = user;

    next();
}

module.exports = {
    post,
    edit,
    put
};