const User = require('../models/AdminUser');

async function post(req, res, next) {
    // checar se todos os campos estão preenchidos
    const keys = Object.keys(req.body);
    
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill in all fields");
            };
        };

    // Checar se usuário já existe [email]
    const { email } = req.body;
    const user = await User.findOne({ where: {email} });

    if(user) return res.send('Users existis');

    next();
}

module.exports = {
    post
};