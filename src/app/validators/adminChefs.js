function checkAllFields(body) {
    const keys = Object.keys(body);

    for(key of keys) {
        if(body[key] == "" && key != 'removed_avatar') {
            return {
                chef: body,
                error: "Por favor, preencha todos os campos"
            }
        };
    };
}

async function post(req, res, next) {
    try {
        const fillAllFields = checkAllFields(req.body);
        if(fillAllFields) {
            return res.render('adminChefs/create', fillAllFields);
        }

        if(req.files.length == 0) {
            return res.render('adminChefs/create', {
                chef: req.body,
                error: "Por favor, escolha um avatar!"
            });
        };

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    }
}


module.exports = {
    post
};