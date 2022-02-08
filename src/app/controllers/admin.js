const Admin = require('../models/Admin');
const File = require('../models/File');

module.exports = {
    show(req, res) {
        Admin.all((recipes) => {
            return res.render('admin/index', {recipes});
        });
    },
    create(req, res) {
        Admin.chefsSelectOptions((options) => {
            return res.render('admin/create', {chefsOptions: options});
        });
    },
    details(req, res) {
        Admin.find(req.params.id, (recipe) => {
            if(!recipe) return res.send("Recipe not found!");

            return res.render('admin/details', {recipe});
        });
    },
    edit(req, res) {
        Admin.find(req.params.id, (recipe) => {
            if(!recipe) return res.send("Recipe not found!");

            Admin.chefsSelectOptions((options) => {
                return res.render('admin/edit', {recipe, chefsOptions: options});
            });
        });
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
        const filesPromise = req.files.map(file => File.create({...file}))
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
    put(req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information') {
                return res.send("Please fill in all fields");
            };
        };

        Admin.update(req.body, () => {
            return res.redirect(`/admin/recipes/${req.body.id}`);
        });
    },
    delete(req, res) {
        Admin.delete(req.body.id, () => {
            return res.redirect('/admin/recipes');
        });
    }
}
