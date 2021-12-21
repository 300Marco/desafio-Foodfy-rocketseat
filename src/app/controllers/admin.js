const Admin = require('../models/Admin');

module.exports ={
    show(req, res) {
        Admin.all((recipes) => {
            return res.render('admin/index', {recipes});
        });

        // return res.render('admin/index');
    },
    create(req, res) {
        return res.render('admin/create');
    },
    details(req, res) {
        Admin.find(req.params.id, (recipe) => {
            if(!recipe) return res.send("Recipe not found!");

            // recipe.ingredients = recipe.ingredients.split(',');
            // recipe.preparation = recipe.preparation.split(',');

            return res.render('admin/details', {recipe});
        });
    },
    edit(req, res) {
        Admin.find(req.params.id, (recipe) => {
            if(!recipe) return res.send("Recipe not found!");

            return res.render('admin/edit', {recipe});
        });

        // const { id } = req.params;
    
        // const foundRecipe = data.recipes.find((recipe) => {
        //     return id == recipe.id;
        // });
    
        // if(!foundRecipe) return res.send("Recipe not found");
    
        // return res.render('admin/edit', {recipe: foundRecipe});
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

        // const { id } = req.body;
        // let index = 0;
    
        // const foundRecipe = data.recipes.find((recipe, foundIndex) => {
        //     if(id == recipe.id) {
        //         index = foundIndex;
        //         return true;
        //     }
        // });
    
        // if(!foundRecipe) return res.send("Recipe not found");
    
        // const recipe = {
        //     ...foundRecipe,
        //     ...req.body,
        //     id: Number(req.body.id)
        // }
    
        // data.recipes[index] = recipe;
    
        // fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        //     if(err) return res.send('Error Write File');
    
        //     return res.redirect(`/admin/recipes/${id}`);
        // });
    },
    delete(req, res) {
        // const { id } = req.body
    
        // const filteredRecipes = data.recipes.filter((recipe) => {
        //     return recipe.id != id;
        // });
    
        // data.recipes = filteredRecipes;
    
        // fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        //     if(err) return res.send('Write file error!');
        
        //     return res.redirect('/admin/recipes');
        // });
    }
}
