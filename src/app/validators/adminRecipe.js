const AdminUser = require('../models/AdminUser');
const AdminRecipe = require('../models/AdminRecipe');

const fs = require('fs');

async function post(req, res, next) {
    try {
        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        const results = await AdminRecipe.chefsSelectOptions();
        const options = results.rows;

        const keys = Object.keys(req.body);

        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                for(let count in req.files) {
                    await fs.unlinkSync(req.files[count].path);
                }

                return res.render('adminRecipes/create', {
                    recipe: req.body,
                    chefsOptions: options,
                    user,
                    error: "Por favor, preencha todos os campos!"
                });
            };
        };

        if(req.files.length == 0) {
            return res.render('adminRecipes/create', {
                recipe: req.body,
                chefsOptions: options,
                user,
                error: "Por favor, envie pelo menos uma imagem!"
            });
        };

        // Validates if there is a chef when registering a recipe
        if(!req.body.chef) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            };

            return res.render('adminRecipes/create', {
                recipe: req.body,
                chefsOptions: options,
                user,
                error: "Você precisa selecionar um chef, para cadastrar uma receita!"
            });
        };

        // Check the ingredients and method of preparation field, if the user, remove all fields
        if(!req.body.ingredients && !req.body.preparation) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            }
            
            return res.render('adminRecipes/create', {
                recipe: req.body,
                chefsOptions: options,
                user,
                error: "Preencha os campos (Ingrediente e Modo de preparo)"
            });
        } else if(!req.body.ingredients) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            }
            
            return res.render('adminRecipes/create', {
                recipe: req.body,
                chefsOptions: options,
                user,
                error: "Preencha o campo (Ingrediente)"
            });
        } else if(!req.body.preparation) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            }
            
            return res.render('adminRecipes/create', {
                recipe: req.body,
                chefsOptions: options,
                user,
                error: "Preencha o campo (Modo de preparo)"
            });
        };

        // removes empty fields of ingredients and preparation method
        req.body.ingredients = req.body.ingredients.filter((i) => {return i});
        req.body.preparation = req.body.preparation.filter((i) => {return i});

        next();
        // let count = 0;
        // for(let key of keys) {
        //     count += 1;
        // }

        // if(count == 5) {
        //     for(let count in req.files) {
        //         await fs.unlinkSync(req.files[count].path);
        //     }
            
        //     return res.render('adminRecipes/create', {
        //         recipe: req.body,
        //         chefsOptions: options,
        //         user,
        //         error: "Preencha os campos (Ingrediente e Modo de preparo)"
        //     });
        // } else if(count == 6 && !req.body.ingredients) {
        //     for(let count in req.files) {
        //         await fs.unlinkSync(req.files[count].path);
        //     }
            
        //     return res.render('adminRecipes/create', {
        //         recipe: req.body,
        //         chefsOptions: options,
        //         user,
        //         error: "Preencha o campo (Ingrediente)"
        //     });
        // } else if(count == 6 && !req.body.preparation) {
        //     for(let count in req.files) {
        //         await fs.unlinkSync(req.files[count].path);
        //     }
            
        //     return res.render('adminRecipes/create', {
        //         recipe: req.body,
        //         chefsOptions: options,
        //         user,
        //         error: "Preencha o campo (Modo de preparo)"
        //     });
        // }
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}
// async function post(req, res, next) {
//     try {
//         const keys = Object.keys(req.body);
        
//         for(key of keys) {
//             if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
//                 return res.send("Please fill in all fields");
//             };
//         };

//         const results = await AdminRecipe.chefsSelectOptions();
//         const options = results.rows;

//         const { userId: id } = req.session;
//         const user = await AdminUser.findOne({ where: {id} });

//         if(req.files.length == 0) {
//             return res.render('adminRecipes/create', {
//                 recipe: req.body,
//                 chefsOptions: options,
//                 user,
//                 error: "Por favor, envie pelo menos uma imagem!"
//             });
//         };

//         next();
//     } catch(err) {
//         console.error(err);
//     };
// }

async function put(req, res, next) {
    try {
        // get images
        let results = await AdminRecipe.files(req.body.id);
        let files = results.rows;
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }));

        // get chefs
        results = await AdminRecipe.chefsSelectOptions();
        const options = results.rows;

        // get id of logged in user
        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                return res.render("adminRecipes/edit", {
                    recipe: req.body,
                    files,
                    chefsOptions: options,
                    user,
                    error: "Por favor, preencha todos os campos!"
                });
            };
        };

        // Check the ingredients and method of preparation field, if the user, remove all fields
        if(!req.body.ingredients && !req.body.preparation) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            }
            
            return res.render('adminRecipes/edit', {
                recipe: req.body,
                files,
                chefsOptions: options,
                user,
                error: "Preencha os campos (Ingrediente e Modo de preparo)"
            });
        } else if(!req.body.ingredients) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            }
            
            return res.render('adminRecipes/edit', {
                recipe: req.body,
                files,
                chefsOptions: options,
                user,
                error: "Preencha o campo (Ingrediente)"
            });
        } else if(!req.body.preparation) {
            for(let count in req.files) {
                await fs.unlinkSync(req.files[count].path);
            }
            
            return res.render('adminRecipes/edit', {
                recipe: req.body,
                files,
                chefsOptions: options,
                user,
                error: "Preencha o campo (Modo de preparo)"
            });
        };

        // removes empty fields of ingredients and preparation method
        req.body.ingredients = req.body.ingredients.filter((i) => {return i});
        req.body.preparation = req.body.preparation.filter((i) => {return i});

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    }
}

async function removeRecipe(req, res, next) {
    try {
        let results = await AdminRecipe.all();
        const recipes = results.rows;

        // get image
        async function getImage(recipeId) {
            let results = await AdminRecipe.files(recipeId);
            const files = results.rows.map(
                file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            );

            return files[0];
        };

        const recipesPromise = recipes.map(async recipe => {
            recipe.img = await getImage(recipe.id);

            return recipe;
        });

        const lastAdded = await Promise.all(recipesPromise);

        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        req.data = {
            recipes: lastAdded,
            user
        }

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    }
}

module.exports = {
    post,
    put,
    removeRecipe
};