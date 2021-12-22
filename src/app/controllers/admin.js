const Admin = require('../models/Admin');

module.exports ={
    show(req, res) {
        Admin.all((recipes) => {
            return res.render('admin/index', {recipes});
        });
    },
    create(req, res) {
        return res.render('admin/create');
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

            return res.render('admin/edit', {recipe});
        });
    },
    // METHODS HTTP
    post(req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill in all fields");
            }
        }

        Admin.create(req.body, (recipe) => {
            return res.redirect(`/admin/recipes/${recipe.id}`);
        });
    },
    put(req, res) {
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
