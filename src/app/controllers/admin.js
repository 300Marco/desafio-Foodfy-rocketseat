const Admin = require('../models/Admin');
const File = require('../models/File');

module.exports = {
    async show(req, res) {
        try {
            let files = [];
            let results = await Admin.all();
            const recipes = results.rows;

            results = recipes.map(recipe => 
                Admin.findRecipeId(recipe.id)
            );
            const promiseRecipeAndFiles = await Promise.all(results);

            for (file of promiseRecipeAndFiles) {
                results = await Admin.findFileForId(file.rows[0].file_id);
                files.push(results.rows[0]);
            };

            files.map(file => 
                file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`);
            
            for(index in recipes) {
                recipes[index] = {
                    ...recipes[index],
                    path: files[index].path,
                    src: files[index].src
                };
            };

            return res.render('admin/index', {recipes});
        } catch (err) {
            console.error(err);
        }
    },
    // async show(req, res) {
    //     const results = await Admin.all();
    //     const recipes = results.rows;

    //     return res.render('admin/index', {recipes});
    // },
    async create(req, res) {
        const results = await Admin.chefsSelectOptions();
        const options = results.rows;
        
        return res.render('admin/create', {chefsOptions: options});

        // Admin.chefsSelectOptions((options) => {
        //     return res.render('admin/create', {chefsOptions: options});
        // });
    },
    async details(req, res) {
        let results = await Admin.find(req.params.id);
        const recipe = results.rows[0];

        if(!recipe) return res.send("Recipe not found!");

        results = await Admin.files(recipe.id);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }));

        return res.render('admin/details', {recipe, files});

        // Admin.find(req.params.id, (recipe) => {
        //     if(!recipe) return res.send("Recipe not found!");

        //     return res.render('admin/details', {recipe});
        // });
    },
    async edit(req, res) {
        let results = await Admin.find(req.params.id);
        const recipe = results.rows[0];

        if(!recipe) return res.send("Recipe not found!");

        // get chefs
        results = await Admin.chefsSelectOptions();
        const options = results.rows;

        // get images
        results = await Admin.files(recipe.id);
        let files = results.rows;
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }));

        return res.render('admin/edit', {recipe, chefsOptions: options, files});

        // Admin.chefsSelectOptions((options) => {
        //     return res.render('admin/edit', {recipe, chefsOptions: options});
        // });


        // Admin.find(req.params.id, (recipe) => {
        //     if(!recipe) return res.send("Recipe not found!");

        //     Admin.chefsSelectOptions((options) => {
        //         return res.render('admin/edit', {recipe, chefsOptions: options});
        //     });
        // });
    },
    // METHODS HTTP
    async post(req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                return res.send("Please fill in all fields");
            };
        };

        if(req.files.length == 0) {
            return res.send('Please, send at least one image');
        }

        // Admin.create(req.body, (recipe) => {}
        const results = await Admin.create(req.body);
        const recipeId = results.rows[0].id;

        // Send image
        const filesPromise = req.files.map(file => File.create({...file, recipeId}))
        await Promise.all(filesPromise);

        return res.redirect(`/admin/recipes/${recipeId}`);

        // sem async
        // const keys = Object.keys(req.body);
        
        // for(key of keys) {
        //     if(req.body[key] == "" && key != 'information') {
        //         return res.send("Please fill in all fields");
        //     };
        // };

        // // if(req.files.length == 0) {
        // //     return res.send('Please, send at least one image');
        // // }

        // // Send image
        // // const filesPromise = req.files.map(file => File.create({...file}))
        // // await Promise.all(filesPromise);

        // Admin.create(req.body, (recipe) => {
        //     return res.redirect(`/admin/recipes/${recipe.id}`);
        // });
    },
    async put(req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                return res.send("Please fill in all fields");
            };
        };

        // get new edit images
        if(req.files.length != 0) {
            const newFilesPromise = req.files.map(file => 
                File.create({...file, recipeId: req.body.id}));

            await Promise.all(newFilesPromise)
        }

        // remove image from database
        if(req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(',');
            const lastIndex = removedFiles.length - 1;
            removedFiles.splice(lastIndex, 1);

            const removedFilesPromise = removedFiles.map(id => File.delete(id))
            await Promise.all(removedFilesPromise);
        }

        await Admin.update(req.body);
        return res.redirect(`/admin/recipes/${req.body.id}`);
        
        // Admin.update(req.body, () => {
        //     return res.redirect(`/admin/recipes/${req.body.id}`);
        // });
    },
    delete(req, res) {
        // await Admin.delete(req.body.id);
        // return res.redirect('/admin/recipes');

        Admin.delete(req.body.id, () => {
            return res.redirect('/admin/recipes');
        });
    }
}
