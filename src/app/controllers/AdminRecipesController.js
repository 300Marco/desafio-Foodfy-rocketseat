const AdminRecipe = require('../models/AdminRecipe');
const AdminUser = require('../models/AdminUser');
const File = require('../models/File');

const { unlinkSync } = require('fs');

module.exports = {
    async showUserRecipe(req, res) {
        try {
            const { userId: id } = req.session;

            let recipes = await AdminRecipe.allUserRecipes(id);

            if(!recipes) return res.render('adminRecipes/userRecipe', {
                error: "Desculpe, não encontramos nenhuma receita!"
            });

            // get image
            async function getImage(recipeId) {
                let files = await AdminRecipe.files(recipeId);
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

            // get logged in user
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminRecipes/userRecipe', { recipes: lastAdded, user });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async show(req, res) {
        try {
            let recipes = await AdminRecipe.findAll();

            if(!recipes) return res.render('adminRecipes/index', {
                error: "Desculpe, não encontramos nenhuma receita!"
            });

            // get image
            async function getImage(recipeId) {
                let files = await AdminRecipe.files(recipeId);
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

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminRecipes/index', { recipes: lastAdded, user });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async create(req, res) {
        try {
            const options = await AdminRecipe.chefsSelectOptions();

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
            
            return res.render('adminRecipes/create', { chefsOptions: options, user });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async details(req, res) {
        try {
            let recipe = await AdminRecipe.find(req.params.id);

            if(!recipe) return res.render('adminRecipes/not-found');

            recipe.information = recipe.information.replace(/[\n]/g, "<br>");

            let files = await AdminRecipe.files(recipe.id);
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));
            
            // get logged in user
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            // check if ID match
            const isUserRecipes = recipe.user_id == id;

            return res.render('adminRecipes/details', {
                recipe, 
                files, 
                user,
                isUserRecipes 
            });
        } catch (err) {
            console.error(err);
            return res.render('adminRecipes/not-found');
        };
    },
    async edit(req, res) {
        try {
            let recipe = await AdminRecipe.find(req.params.id);

            if(!recipe) return res.render('adminRecipes/not-found');

            // get chefs
            const options = await AdminRecipe.chefsSelectOptions();

            // get images
            let files = await AdminRecipe.files(recipe.id);
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // block user without permissions
            // get logged in user
            const { userId: id } = req.session;

            // check if ID match
            const isUserRecipes = recipe.user_id == id;

            const user = await AdminUser.findOne({ where: {id} });

            // permission to edit recipe
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
    async post(req, res) {
        try {
            const filesPromise = req.files.map(file => File.create({
                name: file.filename,
                path: file.path
            }));

            let { chef, title, ingredients, preparation, information } = req.body;

            const recipeId = await AdminRecipe.create({
                chef_id: chef,
                title,
                ingredients,
                preparation,
                information,
                user_id: req.session.userId
            });

            const filesId = await Promise.all(filesPromise);

            filesId.map(fileId => File.createRecipeFiles({
                recipeId,
                fileId
            }));

            // get recipe and image
            // Pulling created recipe data, to render page with success message
            let recipe = await AdminRecipe.find(recipeId);

            if(!recipe) return res.render('adminRecipes/not-found');
            
            recipe.information = recipe.information.replace(/[\n]/g, "<br>");

            let files = await AdminRecipe.files(recipe.id);
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // get id of logged in user
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            // Check if ID matches
            const isUserRecipes = recipe.user_id == id;

            return res.render('adminRecipes/details', {
                recipe,
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
    async put(req, res) {
        try {
            if(req.body.removed_files != '') {
                const removedFiles = req.body.removed_files.split(',');
                const lastIndex = removedFiles.length - 1;
                removedFiles.splice(lastIndex, 1);

                const removedFilesPromise = removedFiles.map(fileId => File.deleteRecipeFiles(fileId));

                await Promise.all(removedFilesPromise);
            };

            // get new edit images
            if(req.files.length != 0) {
                const oldFiles = await AdminRecipe.files(req.body.id);
                const totalFiles = oldFiles.length + req.files.length;
                
                let filesId = '';
                if(totalFiles <= 5) {
                    const newFilesPromise = req.files.map(file => 
                        File.create({
                            name: file.filename,
                            path: file.path
                    }));
                    filesId = await Promise.all(newFilesPromise);
                };

                filesId.map(fileId => File.createRecipeFiles({
                    recipeId: req.body.id,
                    fileId
                }));
            };

            await AdminRecipe.update(req.body.id, {
                chef_id: req.body.chef,
                title: req.body.title,
                ingredients: req.body.ingredients,
                preparation: req.body.preparation,
                information: req.body.information
            });

            // get recipe and image
            // Pulling created recipe data, to render page with success message
            let recipe = await AdminRecipe.find(req.body.id);

            if(!recipe) return res.render('adminRecipes/not-found');

            let files = await AdminRecipe.files(recipe.id);
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // get id of logged in user
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            // Check if ID matches
            const isUserRecipes = recipe.user_id == id;

            return res.render('adminRecipes/details', {
                recipe,
                files,
                user,
                isUserRecipes,
                success: "Receita atualizada com sucesso!"
            });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async delete(req, res) {
        try {
            let files = await AdminRecipe.files(req.body.id);

            await AdminRecipe.delete(req.body.id);

            files.map(file => {
                try {
                    File.delete(file.id);
                    unlinkSync(file.path);
                } catch(err) {
                    console.error(err);
                };
            });

            // get recipe and image
            // Pulling the data from the created recipes, to render the page with a success message
            const { userId: id } = req.session;
            let recipes = await AdminRecipe.allUserRecipes(id);

            if(!recipes) return res.render('adminRecipes/userRecipe', {
                error: "Desculpe, não encontramos nenhuma receita!"
            });

            async function getImage(recipeId) {
                let files = await AdminRecipe.files(recipeId);
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

            // get logged in user
            const user = await AdminUser.findOne({ where: {id} });
            
            return res.render('adminRecipes/index', {
                recipes: lastAdded,
                user,
                success: "Receita deletada com sucesso!"
            });
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    }
}
