function fieldFormatting(text) {
    return text.toLowerCase().split(' ').map(word => {
        if(word != '') {
            return word[0].toUpperCase() + word.slice(1);
        };
    }).join(' ');
}

function convertToSmallText(func) {
    return func.replace(/À|Ao|Com|Da|De|Dos|E|Em|Na|Sobre/gi, function (string) {
        return string.toLowerCase();
    });
}

async function post(req, res, next) {
    try {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'removed_avatar') {
                return res.send('Por favor, volte e preencha todos os campos!');
            };
        };

        if(req.files.length == 0) {
            return res.send('Por favor, escolha um avatar!');
        };

        req.body.name = convertToSmallText(fieldFormatting(req.body.name));

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

async function put(req, res, next) {
    try {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'removed_avatar') {
                return res.send('Por favor, volte e preencha todos os campos!');
            };
        };

        req.body.name = convertToSmallText(fieldFormatting(req.body.name));

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