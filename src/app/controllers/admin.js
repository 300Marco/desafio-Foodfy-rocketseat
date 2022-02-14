const Admin = require('../models/Admin');
const File = require('../models/File');

module.exports = {
    async show(req, res) {
        const results = await Admin.all();
        const recipes = results.rows;

        return res.render('admin/index', {recipes});
    },
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

        return res.render('admin/details', {recipe});

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
            if(req.body[key] == "" && key != 'information') {
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
            if(req.body[key] == "" && key != 'information') {
                return res.send("Please fill in all fields");
            };
        };

        await Admin.update(req.body);
        return res.redirect(`/admin/recipes/${req.body.id}`);
        
        // Admin.update(req.body, () => {
        //     return res.redirect(`/admin/recipes/${req.body.id}`);
        // });
    },
    async delete(req, res) {
        await Admin.delete(req.body.id);
        return res.redirect('/admin/recipes');
        
        // Admin.delete(req.body.id, () => {
        //     return res.redirect('/admin/recipes');
        // });
    }
}
