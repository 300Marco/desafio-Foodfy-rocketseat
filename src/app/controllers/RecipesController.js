const Recipe = require('../models/Recipe');

module.exports = {
    about(req, res) {
        try {
            return res.render('recipes/about');
        } catch (err) {
            console.error(err);
            return res.render('recipes/not-found');
        };
    },
    async recipes(req, res) {
        try {
            let { page, limit } = req.query;

            page = page || 1;
            limit = limit || 6;
            let offset = limit * (page - 1);

            const params = {
                page,
                limit,
                offset
            };

            let recipes = await Recipe.paginate(params);

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

            // Remove total recipe not found
            let pagination = {};

            if(recipes.length > 0) {
                pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                };
            } else {
                pagination = { page };
            };

            return res.render('recipes/recipes', { recipes: lastAdded, pagination });
        } catch (err) {
            console.error(err);
            return res.render('recipes/not-found');
        };
    },
    async search(req,res) {
        try {
            let { search, page, limit } = req.query;

            page = page || 1;
            limit = limit || 6;
            let offset = limit * (page - 1);
    
            const params = {
                search,
                page,
                limit,
                offset
            };
    
            let recipes = await Recipe.paginate(params);
    
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
    
            // Remove total recipe not found
            let pagination = {};

            if(recipes.length > 0) {
                pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                };
            } else {
                pagination = { page };
            };
    
            return res.render('recipes/search', { recipes: lastAdded, pagination, search });  
        } catch (err) {
            console.error(err);
            return res.render('recipes/not-found');
        };
    },
    async details(req, res) {
        try {
            let recipe = await Recipe.find(req.params.index);

            recipe.information = recipe.information.replace(/[\n]/g, "<br>");

            if(!recipe) return res.render('recipes/recipe-not-found');
    
            let files = await Recipe.files(recipe.id);
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));
    
            return res.render('recipes/details', { recipe, files });  
        } catch (err) {
            console.error(err);
            return res.render('recipes/not-found');
        };
    },
    async chefs(req, res) {
        try {
            const chefs = await Recipe.totalRecipes();
    
            // get avatar
            async function getAvatar(chefsId) {
                let files = await Recipe.chefFiles(chefsId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );
    
                return files[0];
            };
    
            const avatarPromise = chefs.map(async chef => {
                chef.img = await getAvatar(chef.id);
    
                return chef;
            });
    
            const lastAvatarAdded = await Promise.all(avatarPromise);
    
            return res.render('recipes/chefs', { chefs: lastAvatarAdded });  
        } catch (err) {
            console.error(err);
            return res.render('recipes/not-found');
        };
    }
}