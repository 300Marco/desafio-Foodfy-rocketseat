function onlyUsers(req, res, next) {
    try {
        if(!req.session.userId) {
            return res.redirect('/admin/users/login');
        }
    
        next();
    } catch (err) {
        console.error(err);
    }
}

function isLoggedRedirectToProfile(req, res, next) {
    try {
        if(req.session.userId) return res.redirect('/admin/profile');

        next();
    } catch (err) {
        console.error(err);
    }
}

async function checkIsAdmin(req, res, next) {
    try {
        const { userId: id } = req.session;
        const AdminUser = require('../models/AdminUser');

        // search user that we will edit
        const user = await AdminUser.findOne({ where: {id} });
        
        if(!user.is_admin) {
            return res.render('adminProfile/edit', {
                user: user,
                error: "Você não tem permissões de administrador!"
            });
        };

        next();
    } catch (err) {
        console.error(err);
    };
}

module.exports = {
    onlyUsers,
    isLoggedRedirectToProfile,
    checkIsAdmin
}

