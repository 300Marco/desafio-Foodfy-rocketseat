const Chef = require('../models/Chef');

module.exports = {
    show(req, res) {
        Chef.all((chefs) => {
            return res.render('chefs/index', {chefs});
        });

    },
    create(req, res) {
        return res.render('chefs/create');
    },
    details(req, res) {
        Chef.chefRecipes(req.params.id, (chef) => {
            if(!chef) return res.send("Chef not found!");

            const recipesAccount = chef.length;

            return res.render('chefs/details', {detail: chef, recipesAccount});
        });
    },
    edit(req, res) {
        Chef.find(req.params.id, (chef) => {
            if(!chef) return res.send("Chef not found!");

            return res.render('chefs/edit', {chef});
        });
    },
    // METHODS HTTP
    post(req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill in all fields");
            };
        };

        Chef.create(req.body, (chef) => {
            return res.redirect(`/admin/chefs/${chef.id}`);
        });
    }, 
    put(req, res) {
        Chef.update(req.body, () => {
            return res.redirect(`/admin/chefs/${req.body.id}`);
        });
    },
    delete(req, res) {
        Chef.chefRecipes(req.body.id, (chef) => {
            if(!chef) return res.send("Chef not found!");

            const [ {title, recipes_id} ] = chef;

            if(title == null && recipes_id == null) {
                Chef.delete(req.body.id, () => {
                    return res.redirect('/admin/chefs');
                });
            } else {
                return res.send('Chefes que possuem receitas, não podem ser deletados');
            };
        });
    }
}
