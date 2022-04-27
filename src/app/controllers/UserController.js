// const AdminChef = require('../models/AdminChef');
const User = require('../models/AdminUser');

module.exports = {
    create(req, res) {
        // return res.render('adminChefs/create');
        return res.render('adminUsers/create');
    },
    async post(req, res) {
        return res.send('passed');
    }
}
