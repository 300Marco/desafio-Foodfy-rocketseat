// const AdminChef = require('../models/AdminChef');
const User = require('../models/AdminUser');

module.exports = {
    create(req, res) {
        // return res.render('adminChefs/create');
        return res.render('adminUsers/create');
    },
    async post(req, res) {
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

        return res.send('passed');

    }
}
