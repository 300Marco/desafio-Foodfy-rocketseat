const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports ={
    show (req, res) {
        return res.render('admin/index');
    },
    create (req, res) {
        return res.render('admin/create');
    },
    details (req, res) {
        const { id } = req.params;
    
        const foundRecipe = data.recipes.find((recipe) => {
            return id == recipe.id;
        });
    
        if(!foundRecipe) {
            return res.send("Recipe not found");
        }
    
        return res.render('admin/details', {recipe: foundRecipe});
    },
    edit (req, res) {
        const { id } = req.params;
    
        const foundRecipe = data.recipes.find((recipe) => {
            return id == recipe.id;
        });
    
        if(!foundRecipe) return res.send("Recipe not found");
    
        return res.render('admin/edit', {recipe: foundRecipe});
    },
    // METHODS HTTP
    post (req, res) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

        const values = [
            req.body.chef_id,
            req.body.image,
            req.body.title,
            req.body.ingredients,
            req.body.preparation,
            req.body.information,
            date(Date.now()).iso
        ]

        // const keys = Object.keys(req.body);
        
        // for(key of keys) {
        //     if(req.body[key] == "") {
        //         return res.send("Please fill in all fields");
        //     }
        // }

        db.query(query, values, (err, results) => {
            if(err) return res.send('Database Error!');

            return res.redirect(`/admin/recipes/${results.rows[0].id}`);
        });
    },
    put (req, res) {
        const { id } = req.body;
        let index = 0;
    
        const foundRecipe = data.recipes.find((recipe, foundIndex) => {
            if(id == recipe.id) {
                index = foundIndex;
                return true;
            }
        });
    
        if(!foundRecipe) return res.send("Recipe not found");
    
        const recipe = {
            ...foundRecipe,
            ...req.body,
            id: Number(req.body.id)
        }
    
        data.recipes[index] = recipe;
    
        fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Error Write File');
    
            return res.redirect(`/admin/recipes/${id}`);
        });
    },
    delete (req, res) {
        const { id } = req.body
    
        const filteredRecipes = data.recipes.filter((recipe) => {
            return recipe.id != id;
        });
    
        data.recipes = filteredRecipes;
    
        fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if(err) return res.send('Write file error!');
        
            return res.redirect('/admin/recipes');
        });
    }
}
