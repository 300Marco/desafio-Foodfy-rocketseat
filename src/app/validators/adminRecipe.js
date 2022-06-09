const fs = require('fs');

function titleFieldFormatting(text) {
    return text.toLowerCase().split(' ').map(word => {
        if(word != '') {
            return word[0].toUpperCase() + word.slice(1);
        }
    }).join(' ');
}

function fieldFormatting(text) {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

function convertToSmallText(func) {
    return func.replace(/À|Ao|Com|Da|De|Dos|Em|Na|Sobre/gi, function (string) {
        return string.toLowerCase();
    });
}

async function post(req, res, next) {
    try {
        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                 return res.send("Por favor, preencha todos os campos!");
            };
        };

        if(req.files.length == 0) {
            return res.send('Por favor, envie pelo menos uma imagem!');
        };

        // Validates if there is a chef when registering a recipe
        if(!req.body.chef) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            };

            return res.send('Você precisa cadastrar um chef, para criar uma receita!');
        };

        req.body.title =  convertToSmallText(titleFieldFormatting(req.body.title));

        // field formatting
        let newArrayIngredients = [];
        for(let ingredient of req.body.ingredients) {
            req.body.ingredients = fieldFormatting(ingredient);
            newArrayIngredients.push(req.body.ingredients);
        };
        
        let newArrayPreparation = [];
        for(let preparation of req.body.preparation) {
            req.body.preparation = fieldFormatting(preparation);
            newArrayPreparation.push(req.body.preparation);
        };

        req.body.ingredients = newArrayIngredients;
        req.body.preparation = newArrayPreparation;

        next();
    } catch(err) {
        for(let count in req.files) {
            await fs.unlinkSync(req.files[count].path);
        };

        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

async function put(req, res, next) {
    try {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                return res.render("Por favor, preencha todos os campos!");
            };
        };

        req.body.title = convertToSmallText(titleFieldFormatting(req.body.title));

        let newArrayIngredients = [];
        for(let ingredient of req.body.ingredients) {
            req.body.ingredients = fieldFormatting(ingredient);
            newArrayIngredients.push(req.body.ingredients);
        };
        
        let newArrayPreparation = [];
        for(let preparation of req.body.preparation) {
            req.body.preparation = fieldFormatting(preparation);
            newArrayPreparation.push(req.body.preparation);
        };

        req.body.ingredients = newArrayIngredients;
        req.body.preparation = newArrayPreparation;

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