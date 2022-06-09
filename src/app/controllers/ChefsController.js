const AdminChef = require('../models/AdminChef');
const AdminUser = require('../models/AdminUser');
const File = require('../models/File');
const FileAdminChef = require('../models/FileChef');

const { unlinkSync } = require('fs');

module.exports = {
    async show(req, res) {
        try {
            let chefs = await AdminChef.findAll();
    
            if(!chefs) return res.render('adminChefs/not-found');
    
            async function getImageAvatar(chefId) {
                let files = await AdminChef.files(chefId);
                files = files.map(
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
    
            return res.render('adminChefs/index', { chefs: lastAdded, user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async create(req, res) {
        try {
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminChefs/create', { user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async details(req, res) {
        try {
            let chef = await AdminChef.find(req.params.id);

            if(!chef) return res.render('adminChefs/not-found');

            // get image avatar
            async function getImageAvatar(chefId) {
                let files = await AdminChef.files(chefId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            chef.img = await getImageAvatar(chef.id);

            // get image Recipes
            const recipes = await AdminChef.findRecipe(chef.id);

            async function getImageRecipe(recipeId) {
                let files = await AdminChef.filesRecipe(recipeId);
                files = files.map(
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

            return res.render('adminChefs/details', {
                chef, 
                recipes: lastRecipeAdded, 
                recipesCount, 
                user
            });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async edit(req, res) {
        try {
            let chef = await AdminChef.find(req.params.id);

            if(!chef) return res.render('adminChefs/not-found');

            // get images
            let files = await AdminChef.files(chef.id);
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // middleware
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
            
            return res.render('adminChefs/edit', { chef, files, user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async post(req, res) {
        try {
            // Create Image
            const filesPromise = req.files.map(file => FileAdminChef.create({ 
                name: file.filename,
                path: file.path
            }));

            const filesId = await Promise.all(filesPromise);

            // create chef
            const chefId = await AdminChef.create({
                name: req.body.name,
                file_id: filesId
            });

            // get chef and recipes
            // Pulling chef data and chef recipes, to render the page with success message
            const chef = await AdminChef.find(chefId);

            if(!chef) return res.render('adminChefs/not-found');

            // get image avatar
            async function getImageAvatar(chefId) {
                let files = await AdminChef.files(chefId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            chef.img = await getImageAvatar(chef.id);

            // get image Recipes
            const recipes = await AdminChef.findRecipe(chefId);
            
            let recipesCount = 0;

            if(recipes.length == 0) {
                recipesCount;
            };

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
    
            return res.render(`adminChefs/details`, {
                chef,
                recipesCount,
                user,
                success: "Chef criado com sucesso!"
            });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async put(req, res) {
        try {
            let chef = await AdminChef.files(req.body.id);
            const fileId = chef[0].file_id;

            // Create nem Image and remove old image
            if(req.files.length != 0) {
                const filesPromise = req.files.map(file => File.create({
                    name: file.filename,
                    path: file.path
                }));

                let file = await Promise.all(filesPromise);

                let filePromise = file.map(id => AdminChef.update(req.body.id, {
                    file_id: id
                }));

                await Promise.all(filePromise);

                File.delete(fileId);
                unlinkSync(chef[0].path);
            };

            await AdminChef.update(req.body.id, {
                name: req.body.name
            });

            // get chef and recipes
            // Pulling chef data and chef recipes, to render the page with success message
            const newChef = await AdminChef.find(req.body.id);

            if(!chef) return res.render('adminChefs/not-found');

            async function getImageAvatar(chefId) {
                let file = await AdminChef.files(chefId);
                file = file.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return file[0];
            };

            newChef.name = req.body.name;
            newChef.img = await getImageAvatar(newChef.id);

            // Get recipes from the chef
            const recipes = await AdminChef.findRecipe(newChef.id);

            async function getImageRecipe(recipeId) {
                let files = await AdminChef.filesRecipe(recipeId);
                files = files.map(
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

            return res.render('adminChefs/details', {
                chef: newChef,
                recipes: lastRecipeAdded, 
                recipesCount,
                user,
                success: "Chef atualizado com sucesso!"
            });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async delete(req, res) {
        try {
            const files = await AdminChef.files(req.body.id);

            const chefRecipes = await AdminChef.chefRecipes(req.body.id);

            if(chefRecipes.length == 0) {
                await AdminChef.delete(req.body.id);
                
                files.map(file => {
                    try {
                        File.delete(file.file_id);
                        unlinkSync(file.path);
                    } catch(err) {
                        console.error(err);
                    };
                });

                // fetch data to render
                let chefs = await AdminChef.findAll();

                if(!chefs) return res.render('adminChefs/not-found');
    
                async function getImageAvatar(chefId) {
                    let files = await AdminChef.files(chefId);
                    files = files.map(
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
    
                return res.render('adminChefs/index', {
                    chefs: lastAdded,
                    user,
                    success: "Chef deletado com sucesso!"
                });
            } else {
                let chef = await AdminChef.find(req.body.id);

                let files = await AdminChef.files(chef.id);
                files = files.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                }));

                const { userId: id } = req.session;
                const user = await AdminUser.findOne({ where: {id} });

                return res.render('adminChefs/edit', {
                    chef,
                    files,
                    user,
                    error: 'Chefs que possuem receitas, não podem ser deletados!'
                });
            };
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    }
}
