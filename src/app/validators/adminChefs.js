const AdminChef = require('../models/AdminChef');

const fs = require('fs');

function checkAllFields(body) {
    const keys = Object.keys(body);

    for(key of keys) {
        if(body[key] == "" && key != 'removed_avatar') {
            return {
                chef: body,
                error: "Por favor, preencha todos os campos!"
            };
        };
    };
}

function fieldFormatting(text) {
    return text.toLowerCase().split(' ').map(word => {
        return word[0].toUpperCase() + word.slice(1);
    }).join(' ');
}

async function post(req, res, next) {
    try {
        const fillAllFields = checkAllFields(req.body);

        if(fillAllFields) {
            if(req.files.length > 0) await fs.unlinkSync(req.files[0].path);
            return res.render('adminChefs/create', fillAllFields);
        }

        if(req.files.length == 0) {
            return res.render('adminChefs/create', {
                chef: req.body,
                error: "Por favor, escolha um avatar!"
            });
        };

        req.body.name = fieldFormatting(req.body.name).replace(/De/g, 'de');

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

async function put(req, res, next) {
    try {
        let results = await AdminChef.find(req.body.id);
        const chef = results.rows[0];

        // get images
        results = await AdminChef.files(chef.id);
        let files = results.rows;
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }));

        const fillAllFields = checkAllFields(req.body);
        if(fillAllFields) {
            return res.render('adminChefs/edit', {
                chef: req.body,
                files,
                error: "Por favor, preencha o campo nome!"
            });
        };

        req.body.name = fieldFormatting(req.body.name).replace(/De/g, 'de');

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

module.exports = {
    post,
    put
};