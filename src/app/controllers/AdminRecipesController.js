const AdminRecipe = require('../models/AdminRecipe');
const File = require('../models/File');

module.exports = {
    async show(req, res) {
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

            return res.render('adminRecipes/index', {recipes: lastAdded});
        } catch (err) {
            console.error(err);
        };
    },
    async create(req, res) {
        try {
            const results = await AdminRecipe.chefsSelectOptions();
            const options = results.rows;
            
            return res.render('adminRecipes/create', {chefsOptions: options});
        } catch (err) {
            console.log(err);
        };
    },
    async details(req, res) {
        try {
            let results = await AdminRecipe.find(req.params.id);
            const recipe = results.rows[0];

            if(!recipe) return res.send("Recipe not found!");

            results = await AdminRecipe.files(recipe.id);
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            return res.render('adminRecipes/details', {recipe, files});
        } catch (err) {
            console.error(err);
        };
    },
    async edit(req, res) {
        try {
            let results = await AdminRecipe.find(req.params.id);
            const recipe = results.rows[0];

            if(!recipe) return res.send("Recipe not found!");

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

            return res.render('adminRecipes/edit', {recipe, chefsOptions: options, files});
        } catch (err) {
            console.error(err);
        };
    },
    // METHODS HTTP
    async post(req, res) {
        try {
            const keys = Object.keys(req.body);
        
            for(key of keys) {
                if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                    return res.send("Please fill in all fields");
                };
            };

            if(req.files.length == 0) {
                return res.send('Please, send at least one image');
            };

            // AdminRecipe.create(req.body, (recipe) => {}
            const results = await AdminRecipe.create(req.body);
            const recipeId = results.rows[0].id;

            // Send image
            const filesPromise = req.files.map(file => File.create({...file, recipeId}))
            await Promise.all(filesPromise);

            return res.redirect(`/admin/recipes/${recipeId}`);
        } catch (err) {
            console.error(err);
        };
    },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body);
        
            for(key of keys) {
                if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                    return res.send("Please fill in all fields");
                };
            };

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

            await AdminRecipe.update(req.body);
            return res.redirect(`/admin/recipes/${req.body.id}`);
        } catch (err) {
            console.error(err);
        };
    },
    delete(req, res) {
        try {
            AdminRecipe.delete(req.body.id, () => {
                return res.redirect('/admin/recipes');
            });
        } catch (err) {
            console.error(err);
        };
    }
}
