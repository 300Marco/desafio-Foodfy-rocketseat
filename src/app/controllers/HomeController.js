const Recipe = require('../models/Recipe');
// const File = require('../models/File');

module.exports = {
    async index(req, res) {
        try {
            const recipes = await Recipe.findAll();

            // let results = await Recipe.all();
            // let recipes = results.rows;

            async function getImage(recipeId) {
                let files = await Recipe.files(recipeId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            const recipesPromise = recipes.map(async recipe => {
                recipe.img = await getImage(recipe.id);

                return recipe;
            });

            const lastAdded = await Promise.all(recipesPromise);

            return res.render('recipes/index', { recipes: lastAdded });
        } catch (err) {
            console.error(err);
            return res.render('recipes/not-found');
        };
    }
}

// const Recipe = require('../models/Recipe');
// // const File = require('../models/File');

// module.exports = {
//     async index(req, res) {
//         try {
//             let results = await Recipe.all();
//             let recipes = results.rows;

//             async function getImage(recipeId) {
//                 let results = await Recipe.files(recipeId);
//                 const files = results.rows.map(
//                     file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//                 );

//                 return files[0];
//             };

//             const recipesPromise = recipes.map(async recipe => {
//                 recipe.img = await getImage(recipe.id);

//                 return recipe;
//             });

//             const lastAdded = await Promise.all(recipesPromise);

//             return res.render('recipes/index', { recipes: lastAdded });
//         } catch (err) {
//             console.error(err);
//             return res.render('recipes/not-found');
//         };
//     }
// }