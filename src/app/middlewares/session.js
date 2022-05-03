function onlyUsers(req, res, next) {
    if(!req.session.userId) {
        return res.redirect('/admin/users/login');
    }

    next();
}

function isLoggedRedirectToProfile(req, res, next) {
    if(req.session.userId) return res.redirect('/admin/profile');

    next();
}

// TESTE - em andamento
async function checkIsAdmin(req, res, next) {
    const { userId: id } = req.session;
    const AdminUser = require('../models/AdminUser');

    // busca o usuário que iremos editar
    const user = await AdminUser.findOne({ where: {id} });
    
    if(!user.is_admin) {
        return res.render('adminProfile/edit', {
            user: user,
            error: "Você não tem permissões de administrador!"
        });
    };

    next();
}

module.exports = {
    onlyUsers,
    isLoggedRedirectToProfile,
    checkIsAdmin
}

