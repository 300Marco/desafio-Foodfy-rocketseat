const User = require('../models/AdminUser');

async function post(req, res, next) {
    const data = req.body;

    // checar se todos os campos estão preenchidos
    const keys = Object.keys(data);
    
        for(key of keys) {
            if(data[key] == "") {
                return res.send("Please fill in all fields");
            };
        };

    // Checar se usuário já existe [email]
    const { email } = req.body;
    const user = await User.findOne({ where: {email} });
    
    if(data.is_admin) data.is_admin = 'true';
    console.log(data)

    if(user) return res.render('adminUsers/create', {
        user: data,
        error: "Usuário já cadastrado"
    });

    next();
}

module.exports = {
    post
};