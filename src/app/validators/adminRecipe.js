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
    return func.replace(/À|Ao|Com|Da|De|Do|Dos|E|Em|Na|Sobre/gi, function (string) {
        return string.toLowerCase();
    });
}

// async function post(req, res, next) {
//     try {
//         const { userId: id } = req.session;
//         const user = await AdminUser.findOne({ where: {id} });

//         const results = await AdminRecipe.chefsSelectOptions();
//         const options = results.rows;

//         const keys = Object.keys(req.body);

//         for(key of keys) {
//             if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
//                 for(let count in req.files) {
//                     await fs.unlinkSync(req.files[count].path);
//                 };

//                 return res.render('adminRecipes/create', {
//                     recipe: req.body,
//                     chefsOptions: options,
//                     user,
//                     error: "Por favor, preencha todos os campos!"
//                 });
//             };
//         };

//         if(req.files.length == 0) {
//             return res.render('adminRecipes/create', {
//                 recipe: req.body,
//                 chefsOptions: options,
//                 user,
//                 error: "Por favor, envie pelo menos uma imagem!"
//             });
//         };

//         // Validates if there is a chef when registering a recipe
//         if(!req.body.chef) {
//             for(let count in req.files) {
//                 await fs.unlinkSync(req.files[count].path);
//             };

//             return res.render('adminRecipes/create', {
//                 recipe: req.body,
//                 chefsOptions: options,
//                 user,
//                 error: "Você precisa cadastrar um chef, para criar uma receita!"
//             });
//         };

//         // Check the ingredients and method of preparation field, if the user, remove all fields
//         if(!req.body.ingredients && !req.body.preparation) {
//             for(let count in req.files) {
//                 await fs.unlinkSync(req.files[count].path);
//             };
            
//             return res.render('adminRecipes/create', {
//                 recipe: req.body,
//                 chefsOptions: options,
//                 user,
//                 error: "Preencha os campos (Ingrediente e Modo de preparo)"
//             });
//         } else if(!req.body.ingredients) {
//             for(let count in req.files) {
//                 await fs.unlinkSync(req.files[count].path);
//             };
            
//             return res.render('adminRecipes/create', {
//                 recipe: req.body,
//                 chefsOptions: options,
//                 user,
//                 error: "Preencha o campo (Ingrediente)"
//             });
//         } else if(!req.body.preparation) {
//             for(let count in req.files) {
//                 await fs.unlinkSync(req.files[count].path);
//             };
            
//             return res.render('adminRecipes/create', {
//                 recipe: req.body,
//                 chefsOptions: options,
//                 user,
//                 error: "Preencha o campo (Modo de preparo)"
//             });
//         };

//         // removes empty fields of ingredients and preparation method
//         req.body.ingredients = req.body.ingredients.filter((i) => {return i});
//         req.body.preparation = req.body.preparation.filter((i) => {return i});

        
//         // field formatting
//         req.body.title = titleFieldFormatting(req.body.title).replace(/De/g, 'de');

//         let newArrayIngredients = [];
//         for(let ingredient of req.body.ingredients) {
//             req.body.ingredients = fieldFormatting(ingredient);
//             newArrayIngredients.push(req.body.ingredients);
//         };
        
//         let newArrayPreparation = [];
//         for(let preparation of req.body.preparation) {
//             req.body.preparation = fieldFormatting(preparation);
//             newArrayPreparation.push(req.body.preparation);
//         };

//         req.body.ingredients = newArrayIngredients;
//         req.body.preparation = newArrayPreparation;

//         next();
//     } catch(err) {
//         console.error(err);
//         return res.render('adminUsers/not-found');
//     };
// }
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

        // title field formatting
        // req.body.title = titleFieldFormatting(req.body.title).replace(/À|Ao|Com|De|Do|Dos|E|Em|Na|Sobre/gi, function (string) {
        //     return string.toLowerCase();
        // });

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

// async function put(req, res, next) {
//     try {
//         // get images
//         let results = await AdminRecipe.files(req.body.id);
//         let files = results.rows;
//         files = files.map(file => ({
//             ...file,
//             src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//         }));

//         // get chefs
//         results = await AdminRecipe.chefsSelectOptions();
//         const options = results.rows;

//         // get id of logged in user
//         const { userId: id } = req.session;
//         const user = await AdminUser.findOne({ where: {id} });

//         const keys = Object.keys(req.body);
        
//         for(key of keys) {
//             if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
//                 return res.render("adminRecipes/edit", {
//                     recipe: req.body,
//                     files,
//                     chefsOptions: options,
//                     user,
//                     error: "Por favor, preencha todos os campos!"
//                 });
//             };
//         };

//         // Check the ingredients and method of preparation field, if the user, remove all fields
//         if(!req.body.ingredients && !req.body.preparation) {
//             for(let count in req.files) {
//                 await fs.unlinkSync(req.files[count].path);
//             };
            
//             return res.render('adminRecipes/edit', {
//                 recipe: req.body,
//                 files,
//                 chefsOptions: options,
//                 user,
//                 error: "Preencha os campos (Ingrediente e Modo de preparo)"
//             });
//         } else if(!req.body.ingredients) {
//             for(let count in req.files) {
//                 await fs.unlinkSync(req.files[count].path);
//             };
            
//             return res.render('adminRecipes/edit', {
//                 recipe: req.body,
//                 files,
//                 chefsOptions: options,
//                 user,
//                 error: "Preencha o campo (Ingrediente)"
//             });
//         } else if(!req.body.preparation) {
//             for(let count in req.files) {
//                 await fs.unlinkSync(req.files[count].path);
//             };
            
//             return res.render('adminRecipes/edit', {
//                 recipe: req.body,
//                 files,
//                 chefsOptions: options,
//                 user,
//                 error: "Preencha o campo (Modo de preparo)"
//             });
//         };

//         // removes empty fields of ingredients and preparation method
//         req.body.ingredients = req.body.ingredients.filter((i) => {return i});
//         req.body.preparation = req.body.preparation.filter((i) => {return i});

//         // field formatting
//         req.body.title = titleFieldFormatting(req.body.title).replace(/De/g, 'de');

//         let newArrayIngredients = [];
//         for(let ingredient of req.body.ingredients) {
//             req.body.ingredients = fieldFormatting(ingredient);
//             newArrayIngredients.push(req.body.ingredients);
//         };
        
//         let newArrayPreparation = [];
//         for(let preparation of req.body.preparation) {
//             req.body.preparation = fieldFormatting(preparation);
//             newArrayPreparation.push(req.body.preparation);
//         };

//         req.body.ingredients = newArrayIngredients;
//         req.body.preparation = newArrayPreparation;

//         next();
//     } catch(err) {
//         console.error(err);
//         return res.render('adminUsers/not-found');
//     };
// }

async function put(req, res, next) {
    try {
        // get images
        // let results = await AdminRecipe.files(req.body.id);
        // let files = results.rows;
        // files = files.map(file => ({
        //     ...file,
        //     src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        // }));

        // // get chefs
        // results = await AdminRecipe.chefsSelectOptions();
        // const options = results.rows;

        // get id of logged in user
        // const { userId: id } = req.session;
        // const user = await AdminUser.findOne({ where: {id} });

        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                return res.render("Por favor, preencha todos os campos!");
            };
        };

        // Check the ingredients and method of preparation field, if the user, remove all fields
        // if(!req.body.ingredients && !req.body.preparation) {
        //     for(let count in req.files) {
        //         await fs.unlinkSync(req.files[count].path);
        //     };
            
        //     return res.render('adminRecipes/edit', {
        //         recipe: req.body,
        //         files,
        //         chefsOptions: options,
        //         user,
        //         error: "Preencha os campos (Ingrediente e Modo de preparo)"
        //     });
        // } else if(!req.body.ingredients) {
        //     for(let count in req.files) {
        //         await fs.unlinkSync(req.files[count].path);
        //     };
            
        //     return res.render('adminRecipes/edit', {
        //         recipe: req.body,
        //         files,
        //         chefsOptions: options,
        //         user,
        //         error: "Preencha o campo (Ingrediente)"
        //     });
        // } else if(!req.body.preparation) {
        //     for(let count in req.files) {
        //         await fs.unlinkSync(req.files[count].path);
        //     };
            
        //     return res.render('adminRecipes/edit', {
        //         recipe: req.body,
        //         files,
        //         chefsOptions: options,
        //         user,
        //         error: "Preencha o campo (Modo de preparo)"
        //     });
        // };

        // removes empty fields of ingredients and preparation method
        // req.body.ingredients = req.body.ingredients.filter((i) => {return i});
        // req.body.preparation = req.body.preparation.filter((i) => {return i});

        // field formatting
        // req.body.title = titleFieldFormatting(req.body.title).replace(/À|Ao|Com|De|Do|Dos|E|Em|Na|Sobre/gi, function (string) {
        //     return string.toLowerCase();
        // });
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