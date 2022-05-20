const AdminRecipe = require('../models/AdminRecipe');
const File = require('../models/File');

const AdminUser = require('../models/AdminUser');

module.exports = {
    async showUserRecipe(req, res) {
        try {
            const { userId: id } = req.session;

            let results = await AdminRecipe.allUserRecipes(id);
            const recipes = results.rows;

            if(!recipes) return res.render('adminRecipes/userRecipe', {
                error: "Desculpe, não encontramos nenhuma receita!"
            });

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

            // PEGA USUÁRIO LOGADO
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminRecipes/userRecipe', {
                recipes: lastAdded, 
                user
            });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async show(req, res) {
        try {
            let results = await AdminRecipe.all();
            const recipes = results.rows;

            if(!recipes) return res.render('adminRecipes/index', {
                error: "Desculpe, não encontramos nenhuma receita!"
            });

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

            return res.render('adminRecipes/index', {
                recipes: lastAdded, 
                user
            });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async create(req, res) {
        try {
            const results = await AdminRecipe.chefsSelectOptions();
            const options = results.rows;

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
            
            return res.render('adminRecipes/create', {
                chefsOptions: options, 
                user
            });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async details(req, res) {
        try {
            let results = await AdminRecipe.find(req.params.id);
            const recipe = results.rows[0];

            if(!recipe) return res.render('adminRecipes/not-found');

            results = await AdminRecipe.files(recipe.id);
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            recipe.information = recipe.information.replace(/[\n]/g, "<br>");
            
            // PEGA ID DE USUÁRIO LOGADO
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            // VERIFICA SE OS ID BATEM
            const isUserRecipes = recipe.user_id == id;

            return res.render('adminRecipes/details', {
                recipe, 
                files, 
                isUserRecipes, 
                user
            });
        } catch (err) {
            console.error(err);
            return res.render('adminRecipes/not-found');
        };
    },
    // async edit(req, res) {
    //     try {
    //         let results = await AdminRecipe.find(req.params.id);
    //         const recipe = results.rows[0];

    //         if(!recipe) return res.send("Recipe not found!");

    //         // get chefs
    //         results = await AdminRecipe.chefsSelectOptions();
    //         const options = results.rows;

    //         // get images
    //         results = await AdminRecipe.files(recipe.id);
    //         let files = results.rows;
    //         files = files.map(file => ({
    //             ...file,
    //             src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    //         }));

    //         return res.render('adminRecipes/edit', {recipe, chefsOptions: options, files});
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    async edit(req, res) {
        try {
            let results = await AdminRecipe.find(req.params.id);
            const recipe = results.rows[0];

            // if(!recipe) return res.send("Recipe not found!");
            if(!recipe) return res.render('adminRecipes/not-found');

            // get chefs
            results = await AdminRecipe.chefsSelectOptions();
            const options = results.rows;

            // get images
            results = await AdminRecipe.files(recipe.id);
            let files = results.rows;
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // BLOQUEIO DE USUÁRIOS SEM PERMISSÃO
            // PEGA ID DE USUÁRIO LOGADO
            const { userId: id } = req.session;

            // VERIFICA SE OS ID BATEM
            const isUserRecipes = recipe.user_id == id;

            const user = await AdminUser.findOne({ where: {id} });

            // PERMISSÃO PARA EDITAR RECEITA
            if(user.is_admin == false && isUserRecipes == false) {
                return res.render('adminRecipes/details', {
                    recipe,
                    chefsOptions: options,
                    files,
                    error: 'Você não tem permissão para editar esta receita!'
                });
            };
            
            return res.render('adminRecipes/edit', {
                recipe, 
                chefsOptions: options, 
                files, 
                user
            });
        } catch (err) {
            console.error(err);
            return res.render('adminRecipes/not-found');
        };
    },
    // METHODS HTTP
    // async post(req, res) {
    //     try {
    //         const keys = Object.keys(req.body);
        
    //         for(key of keys) {
    //             if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
    //                 return res.send("Please fill in all fields");
    //             };
    //         };

    //         if(req.files.length == 0) {
    //             return res.send('Please, send at least one image');
    //         };
            
    //         const results = await AdminRecipe.create(req.body);
    //         const recipeId = results.rows[0].id;

    //         // Send image
    //         const filesPromise = req.files.map(file => File.create({...file, recipeId}))
    //         await Promise.all(filesPromise);

    //         // get recipe and image
    //         // Pulling created recipe data, to render page with success message
    //         let recipeResults = await AdminRecipe.find(recipeId);
    //         const recipe = recipeResults.rows[0];

    //         recipeResults = await AdminRecipe.files(recipe.id);
    //         const files = recipeResults.rows.map(file => ({
    //             ...file,
    //             src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    //         }));

    //          // get id of logged in user
    //          const { userId: id } = req.session;
    //          const user = await AdminUser.findOne({ where: {id} });
 
    //          // Check if ID matches
    //          const isUserRecipes = recipe.user_id == id;

    //         return res.render('adminRecipes/details', {
    //             recipe,
    //             files,
    //             user,
    //             isUserRecipes,
    //             success: "Receita cadastrada com sucesso"
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    async post(req, res) {
        try {
            const results = await AdminRecipe.create(req.body);
            const recipeId = results.rows[0].id;

            const filesPromise = req.files.map(file => File.create({...file, recipeId}))
            await Promise.all(filesPromise);

            // get recipe and image
            // Pulling created recipe data, to render page with success message
            let recipeResults = await AdminRecipe.find(recipeId);
            const recipe = recipeResults.rows[0];

            let newData = {
                ...recipe,
                information: recipe.information.replace(/[\n]/g, "<br>")
            };

            recipeResults = await AdminRecipe.files(recipe.id);
            const files = recipeResults.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

             // get id of logged in user
             const { userId: id } = req.session;
             const user = await AdminUser.findOne({ where: {id} });
 
             // Check if ID matches
             const isUserRecipes = recipe.user_id == id;

            return res.render('adminRecipes/details', {
                recipe: newData,
                files,
                user,
                isUserRecipes,
                success: "Receita criada com sucesso!"
            });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    // async post(req, res) {
    //     try {
    //         const keys = Object.keys(req.body);
        
    //         for(key of keys) {
    //             if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
    //                 return res.send("Please fill in all fields");
    //             };
    //         };

    //         if(req.files.length == 0) {
    //             return res.send('Please, send at least one image');
    //         };
            
    //         const results = await AdminRecipe.create(req.body);
    //         const recipeId = results.rows[0].id;

    //         // Send image
    //         const filesPromise = req.files.map(file => File.create({...file, recipeId}))
    //         await Promise.all(filesPromise);

    //         return res.redirect(`/admin/recipes/${recipeId}`);
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    // async put(req, res) {
    //     try {
    //         // remove image from database
    //         if(req.body.removed_files) {
    //             const removedFiles = req.body.removed_files.split(',');
    //             const lastIndex = removedFiles.length - 1;
    //             removedFiles.splice(lastIndex, 1);

    //             const removedFilesPromise = removedFiles.map(id => File.delete(id))
    //             await Promise.all(removedFilesPromise);
    //         };

    //         // get new edit images
    //         if(req.files.length != 0) {
    //             const oldFiles = await AdminRecipe.files(req.body.id);
    //             const totalFiles = oldFiles.rows.length + req.files.length;

    //             if(totalFiles <= 5) {
    //                 const newFilesPromise = req.files.map(file => 
    //                     File.create({...file, recipeId: req.body.id}));
        
    //                 await Promise.all(newFilesPromise);
    //             };
    //         };

    //         await AdminRecipe.update(req.body);
    //         return res.redirect(`/admin/recipes/${req.body.id}`);
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    async put(req, res) {
        try {
            // remove image from database
            if(req.body.removed_files) {
                const removedFiles = req.body.removed_files.split(',');
                const lastIndex = removedFiles.length - 1;
                removedFiles.splice(lastIndex, 1);

                const removedFilesPromise = removedFiles.map(id => File.delete(id))
                await Promise.all(removedFilesPromise);
            };

            // get new edit images
            if(req.files.length != 0) {
                const oldFiles = await AdminRecipe.files(req.body.id);
                const totalFiles = oldFiles.rows.length + req.files.length;

                if(totalFiles <= 5) {
                    const newFilesPromise = req.files.map(file => 
                        File.create({...file, recipeId: req.body.id}));
        
                    await Promise.all(newFilesPromise);
                };
            };

            // get recipe and image
            // Pulling created recipe data, to render page with success message
            let results = await AdminRecipe.find(req.body.id);
            const recipe = results.rows[0];

            // req.body.information = req.body.information.replace(/[\n]/g, "<br>");
            // let {title} = req.body
            // replace(/[\n]/g, "<br>");

            let newData = {
                ...req.body,
                chefs_name: recipe.chefs_name,
                information: req.body.information.replace(/[\n]/g, "<br>")
            };

            results = await AdminRecipe.files(recipe.id);
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // get id of logged in user
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            // Check if ID matches
            const isUserRecipes = recipe.user_id == id;

            await AdminRecipe.update(req.body);
            return res.render('adminRecipes/details', {
                recipe: newData,
                files,
                user,
                isUserRecipes,
                success: "Receita atualizada com sucesso!"
            })
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    // delete(req, res) {
    //     try {
    //         AdminRecipe.delete(req.body.id, () => {
    //             return res.redirect('/admin/recipes');
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     };
    // }
    async delete(req, res) {
        try {
            await AdminRecipe.delete(req.body.id);

            let { recipes, user } = req.data;

            recipes = recipes.filter((recipe) => recipe.id != req.body.id);
            
            return res.render('adminRecipes/index', {
                recipes,
                user,
                success: "Receita deletada com sucesso!"
            });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    }
    // async delete(req, res) {
    //     try {
    //         await AdminRecipe.delete(req.body.id);

    //         let results = await AdminRecipe.all();
    //         const recipes = results.rows;

    //         // get image
    //         async function getImage(recipeId) {
    //             let results = await AdminRecipe.files(recipeId);
    //             const files = results.rows.map(
    //                 file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    //             );

    //             return files[0];
    //         };

    //         const recipesPromise = recipes.map(async recipe => {
    //             recipe.img = await getImage(recipe.id);

    //             return recipe;
    //         });

    //         const lastAdded = await Promise.all(recipesPromise);

    //         const { userId: id } = req.session;
    //         const user = await AdminUser.findOne({ where: {id} });

    //         return res.render('adminRecipes/index', {
    //             recipes: lastAdded,
    //             user,
    //             success: "Receita deletada com sucesso!"
    //         });
    //     } catch (err) {
    //         console.error(err);
    //         return res.render('adminUsers/not-found');
    //     };
    // }
}
