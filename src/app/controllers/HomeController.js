const Recipe = require('../models/Recipe');

module.exports = {
    async index(req, res) {
        try {
            let recipes = await Recipe.findAll();

            recipes = recipes.slice(0, 6);

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
