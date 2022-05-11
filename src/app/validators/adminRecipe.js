const AdminUser = require('../models/AdminUser');

function checkAllFields(body) {
    const keys = Object.keys(body);
        
    for(key of keys) {
        if(body[key] == "" && key != 'information' && key != 'removed_files') {
            return {
                user: body,
                error: "Por favor, preencha todos os campos"
            };
        };
    };
}

async function post(req, res, next) {
    try {
        const fillAllFields = checkAllFields(req.body);
        if(fillAllFields) {
            return res.render('adminRecipes/create', fillAllFields);
        }

        if(req.files.length == 0) {
            return res.send('Please, send at least one image');
        };

        next();
    } catch(err) {
        console.error(err);
    };
}

module.exports = {
    post
};