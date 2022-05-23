const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');

async function dataToEdit(req, res, next) {
    try {
        // user lock without permission
            // get logged user id
        const { userId: id } = req.session;

        const user = await AdminUser.findOne({ where: {id} });

        // permission to edit recipe
        if(user.is_admin == false) {
            let results = await AdminChef.find(req.params.id);
            const chef = results.rows;

            if(!chef) return res.render('adminChefs/not-found');

            // get image avatar
            async function getImageAvatar(chefId) {
                let results = await AdminChef.files(chefId);
                const files = results.rows.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            const avatarPromise = chef.map(async avatar => {
                avatar.img = await getImageAvatar(avatar.id);

                return avatar;
            });

            const lastAvatarAdded = await Promise.all(avatarPromise);

            // get image Recipes
            results = await AdminChef.findRecipe(chef[0].id);
            const recipes = results.rows;

            async function getImageRecipe(recipeId) {
                let results = await AdminChef.filesRecipe(recipeId);
                const files = results.rows.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            const recipePromise = recipes.map(async recipe => {
                recipe.img = await getImageRecipe(recipe.id);

                return recipe;
            });

            const lastRecipeAdded = await Promise.all(recipePromise);

            let recipesCount = 0;

            if(lastRecipeAdded.length == 0) {
                recipesCount;
            } else {
                recipesCount = lastRecipeAdded.length;
            };

            return res.render('adminChefs/details', {
                chef: lastAvatarAdded, recipes: lastRecipeAdded, recipesCount,
                error: "Você não tem permissões de administrador!"
            });
        };

        req.data = user;

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

async function dataToUpdate(req, res, next) {
    try {
        // Data fetch to populate the rendered page, for success message
        results = await AdminChef.find(req.body.id);
        const chef = results.rows;

        // get image avatar
        async function getImageAvatar(chefId) {
            let results = await AdminChef.files(chefId);
            const files = results.rows.map(
                file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            );

            return files[0];
        }

        const avatarPromise = chef.map(async avatar => {
            avatar.img = await getImageAvatar(avatar.id);

            return avatar;
        });

        const lastAvatarAdded = await Promise.all(avatarPromise);

        // get image Recipes
        results = await AdminChef.findRecipe(chef[0].id);
        const recipes = results.rows;

        async function getImageRecipe(recipeId) {
            let results = await AdminChef.filesRecipe(recipeId);
            const files = results.rows.map(
                file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            );

            return files[0];
        };

        const recipePromise = recipes.map(async recipe => {
            recipe.img = await getImageRecipe(recipe.id);

            return recipe;
        });

        const lastRecipeAdded = await Promise.all(recipePromise);

        let recipesCount = 0;

        if(lastRecipeAdded.length == 0) {
            recipesCount;
        } else {
            recipesCount = lastRecipeAdded.length;
        };

        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        // send data
        req.data = {
            chef: lastAvatarAdded,
            recipes: lastRecipeAdded,
            recipesCount,
            user
        };

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

async function dataToDelete(req, res, next) {
    try {
        let results = await AdminChef.all();
        const chefs = results.rows;

        if(!chefs) res.render('adminChefs/not-found');

        async function getImageAvatar(chefId) {
            let results = await AdminChef.files(chefId);
            const files = results.rows.map(
                file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            );

            return files[0];
        };

        const chefsPromise = chefs.map(async chef => {
            chef.img = await getImageAvatar(chef.id);

            return chef;
        });

        const lastAdded = await Promise.all(chefsPromise);

        // get user
        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        req.data = {
            chefs: lastAdded,
            user
        };

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

module.exports = {
    dataToEdit,
    dataToUpdate,
    dataToDelete
};