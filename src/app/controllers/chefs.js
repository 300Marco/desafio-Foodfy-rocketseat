const Chef = require('../models/Chef');

module.exports = {
    show(req, res) {
        Chef.all((chefs) => {
            return res.render('chefs/index', {chefs});
        });

    },
    details(req, res) {
        Chef.find(req.params.id, (chef) => {
            if(!chef) return res.send("Chef not found!");

            return res.render('chefs/details', {chef});
        });
    },
    create(req, res) {
        return res.render('chefs/create');
    },
    edit(req, res) {
        return res.render('chefs/edit');
    },
    // METHODS HTTP
    post(req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill in all fields");
            }
        }

        Chef.create(req.body, (chef) => {
            return res.send('chef criado');
        });
    }
}
