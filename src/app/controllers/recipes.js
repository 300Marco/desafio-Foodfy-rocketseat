const Recipe = require('../models/Recipe');
// const File = require('../models/File');

module.exports = {
    async index(req, res) {
        try {
            // const { search } = req.query;

            let results = await Recipe.all();
            let recipes = results.rows;

            async function getImage(recipeId) {
                let results = await Recipe.files(recipeId);
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

            return res.render('recipes/index', {recipes: lastAdded});
        } catch (err) {
            console.error(err);
        };

        // Caso ocorra erro, ai verificar se tem search ou não..
        // aqui tem uma condição IF, que ficou irrelevante
        //          if(search) {
            //         let files = [];
            //         let results = await Recipe.findBy(search);
            //         let recipes = results.rows;
        
            //         results = recipes.map(recipe => 
            //             File.findRecipeId(recipe.id)
            //         );
            //         let promiseRecipeAndFiles = await Promise.all(results);
        
            //         for (file of promiseRecipeAndFiles) {
            //             results = await File.findFileForId(file.rows[0].file_id);
            //             files.push(results.rows[0]);
            //         };
        
            //         files.map(file => 
            //             file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`);
                    
            //         for(index in recipes) {
            //             recipes[index] = {
            //                 ...recipes[index],
            //                 path: files[index].path,
            //                 src: files[index].src
            //             };
            //         };
        
            //         return res.render('recipes/index', {recipes});
            //     } else {
            //         let files = [];
            //         let results = await Recipe.all();
            //         let recipes = results.rows;
        
            //         results = recipes.map(recipe => 
            //             File.findRecipeId(recipe.id)
            //         );
            //         promiseRecipeAndFiles = await Promise.all(results);
        
            //         for (file of promiseRecipeAndFiles) {
            //             results = await File.findFileForId(file.rows[0].file_id);
            //             files.push(results.rows[0]);
            //         };
        
            //         files.map(file => 
            //             file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`);
                    
            //         for(index in recipes) {
            //             recipes[index] = {
            //                 ...recipes[index],
            //                 path: files[index].path,
            //                 src: files[index].src
            //             };
            //         };
        
            //         return res.render('recipes/index', {recipes});
            //     };
    },
    // async index(req, res) {
    //     const { search } = req.query;

    //     if(search) {
    //         let files = [];
    //         let results = await Recipe.findBy(search);
    //         let recipes = results.rows;

    //         results = recipes.map(recipe => 
    //             File.findRecipeId(recipe.id)
    //         );
    //         let promiseRecipeAndFiles = await Promise.all(results);

    //         for (file of promiseRecipeAndFiles) {
    //             results = await File.findFileForId(file.rows[0].file_id);
    //             files.push(results.rows[0]);
    //         };

    //         files.map(file => 
    //             file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`);
            
    //         for(index in recipes) {
    //             recipes[index] = {
    //                 ...recipes[index],
    //                 path: files[index].path,
    //                 src: files[index].src
    //             };
    //         };

    //         return res.render('recipes/index', {recipes});
    //     } else {
    //         let files = [];
    //         let results = await Recipe.all();
    //         let recipes = results.rows;

    //         results = recipes.map(recipe => 
    //             File.findRecipeId(recipe.id)
    //         );
    //         promiseRecipeAndFiles = await Promise.all(results);

    //         for (file of promiseRecipeAndFiles) {
    //             results = await File.findFileForId(file.rows[0].file_id);
    //             files.push(results.rows[0]);
    //         };

    //         files.map(file => 
    //             file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`);
            
    //         for(index in recipes) {
    //             recipes[index] = {
    //                 ...recipes[index],
    //                 path: files[index].path,
    //                 src: files[index].src
    //             };
    //         };

    //         return res.render('recipes/index', {recipes});
    //     };
    // },
    // async index(req, res) {
    //     const { search } = req.query;

    //     if(search) {
    //         let results = await Recipe.findBy(search);
    //         let recipes = results.rows;

    //         return res.render('recipes/index', {recipes});
    //     } else {
    //         results = await Recipe.all();
    //         recipes = results.rows;

    //         return res.render('recipes/index', {recipes});
    //     };
    //     // if(search) {
    //     //     Recipe.findBy(search, (recipes) => {
    //     //         return res.render('recipes/index', {recipes});
    //     //     });
    //     // } else {
    //     //     Recipe.all((recipes) => {
    //     //         return res.render('recipes/index', {recipes});
    //     //     });
    //     // };
    // },
    about(req, res) {
        return res.render('recipes/about');
    },
    async recipes(req, res) {
        try {
            let { page, limit } = req.query;

            page = page || 1;
            limit = limit || 6;
            let offset = limit * (page -1);

            const params = {
                page,
                limit,
                offset
            };

            // let files = [];
            let results = await Recipe.paginate(params);
            let recipes = results.rows;

            // get images
            async function getImage(recipeId) {
                let results = await Recipe.files(recipeId);
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

            const pagination = {
                total: Math.ceil(recipes[0].total / limit),
                page
            };

            return res.render('recipes/recipes', {recipes: lastAdded, pagination});
        } catch (err) {
            console.error(err);
        };
    },
    // async recipes(req, res) {
    //     let { page, limit } = req.query;

    //     page = page || 1;
    //     limit = limit || 6;
    //     let offset = limit * (page -1);

    //     const params = {
    //         page,
    //         limit,
    //         offset
    //     };

    //     let files = [];
    //     let results = await Recipe.paginate(params);
    //     let recipes = results.rows;

    //     results = recipes.map(recipe => 
    //         File.findRecipeId(recipe.id)
    //     );

    //     let promiseRecipeAndFiles = await Promise.all(results);

    //     for (file of promiseRecipeAndFiles) {
    //         results = await File.findFileForId(file.rows[0].file_id);
    //         files.push(results.rows[0]);
    //     };

    //     files.map(file => 
    //         file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    //     );
        
    //     for(index in recipes) {
    //         recipes[index] = {
    //             ...recipes[index],
    //             path: files[index].path,
    //             src: files[index].src
    //         };
    //     };

    //     const pagination = {
    //         total: Math.ceil(recipes[0].total / limit),
    //         page
    //     };

    //     return res.render('recipes/recipes', {recipes, pagination});
    // },
    // recipes(req, res) {
    //     let { search, page, limit } = req.query;

    //     page = page || 1;
    //     limit = limit || 6;
    //     let offset = limit * (page -1);

    //     const params = {
    //         search,
    //         page,
    //         limit,
    //         offset,
    //         callback(recipes) {
    //             const pagination = {
    //                 total: Math.ceil(recipes[0].total / limit),
    //                 page
    //             };

    //             return res.render('recipes/recipes', {recipes, pagination, search});
    //         }
    //     };

    //     Recipe.paginate(params);
    // },
    async search(req,res) {
        try {
            let { search, page, limit } = req.query;

            page = page || 1;
            limit = limit || 6;
            let offset = limit * (page -1);
    
            const params = {
                search,
                page,
                limit,
                offset
            };
    
            let results = await Recipe.paginate(params);
            let recipes = results.rows;
    
            async function getImage(recipeId) {
                let results = await Recipe.files(recipeId);
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
    
            const pagination = {
                total: Math.ceil(recipes[0].total / limit),
                page
            };
    
            return res.render('recipes/search', {recipes: lastAdded, pagination, search});  
        } catch (err) {
            console.error(err);
        };
    },
    // async search(req,res) {
    //     let { search, page, limit } = req.query;

    //     page = page || 1;
    //     limit = limit || 6;
    //     let offset = limit * (page -1);

    //     const params = {
    //         search,
    //         page,
    //         limit,
    //         offset
    //     };

    //     let files = [];
    //     let results = await Recipe.paginate(params);
    //     let recipes = results.rows;

    //     results = recipes.map(recipe => 
    //         File.findRecipeId(recipe.id)
    //     );

    //     let promiseRecipeAndFiles = await Promise.all(results);

    //     for(file of promiseRecipeAndFiles) {
    //         results = await File.findFileForId(file.rows[0].file_id);
    //         files.push(results.rows[0]);
    //     };

    //     files.map(file =>
    //         file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    //     );

    //     for(index in recipes) {
    //         recipes[index] = {
    //             ...recipes[index],
    //             path: files[index].path,
    //             src: files[index].src
    //         };
    //     };

    //     const pagination = {
    //         total: Math.ceil(recipes[0].total / limit),
    //         page
    //     }

    //     return res.render('recipes/search', {recipes, pagination, search});
    // },
    // search(req,res) {
    //     let { search, page, limit } = req.query;

    //     page = page || 1;
    //     limit = limit || 6;
    //     let offset = limit * (page -1);

    //     const params = {
    //         search,
    //         page,
    //         limit,
    //         offset,
    //         callback(recipes) {
    //             const pagination = {
    //                 total: Math.ceil(recipes[0].total / limit),
    //                 page
    //             };

    //             return res.render('recipes/search', {recipes, pagination, search});
    //         }
    //     };

    //     Recipe.paginate(params);
    // },
    async details(req, res) {
        try {
            const recipeIndex = req.params.index;
        
            let results = await Recipe.find(recipeIndex);
            const recipe = results.rows;
    
            if(recipe == undefined) {
                return res.render('recipes/not-found');
            };
    
            results = await Recipe.files(recipeIndex);
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));
    
            return res.render('recipes/details', {recipe, files});  
        } catch (err) {
            console.error(err);
        };
    },
    // async details(req, res) {
    //     const recipeIndex = req.params.index;
        
    //     const results = await Recipe.find(recipeIndex);
    //     const recipe = results.rows;

    //     if(recipe == undefined) {
    //         return res.render('recipes/not-found');
    //     };

    //     return res.render('recipes/details', {recipe});
    // },
    // details(req, res) {
    //     const recipeIndex = req.params.index;
        
    //     Recipe.find(recipeIndex, (recipe) => {

    //         if(recipe == undefined) {
    //             return res.render('recipes/not-found');
    //         };

    //         return res.render('recipes/details', {recipe});
    //     });
    // },
    async chefs(req, res) {
        try {
            const results = await Recipe.totalRecipes();
            const chefs = results.rows;
    
            // get avatar
            async function getAvatar(chefsId) {
                let results = await Recipe.chefFiles(chefsId);
                const files = results.rows.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );
    
                return files[0];
            };
    
    
            const avatarPromise = chefs.map(async chef => {
                chef.img = await getAvatar(chef.id);
    
                return chef;
            });
    
            const lastAvatarAdded = await Promise.all(avatarPromise);
    
            return res.render('recipes/chefs', {chefs: lastAvatarAdded});  
        } catch (err) {
            console.error(err);
        };

        // Recipe.totalRecipes((chefs) => {
        //     return res.render('recipes/chefs', {chefs});
        // });
    }
}