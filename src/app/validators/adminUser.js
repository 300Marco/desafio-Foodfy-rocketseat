const User = require('../models/AdminUser');

async function post(req, res, next) {
    try {
        const data = req.body;

        if(data.is_admin) {
            data.is_admin = 'true';
        } else {
            data.is_admin = 'false';
        };

        // checar se todos os campos estão preenchidos
        const keys = Object.keys(data);
        
        for(key of keys) {
            if(data[key] == "") {
                return res.render('adminUsers/create', {
                    user: data,
                    error: "Por favor, preencha todos os campos"
                });
            };
        };

        // Checar se usuário já existe [email]
        const { email } = req.body;
        const user = await User.findOne({ where: {email} });

        if(user) return res.render('adminUsers/create', {
            user: data,
            error: "Email já cadastrado"
        });

        next();
    } catch(err) {
        console.error(err);
    };
}

module.exports = {
    post
};