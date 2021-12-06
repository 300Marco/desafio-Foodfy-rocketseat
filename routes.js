const express = require('express');
const recipes = require('./controllers/recipes');
const routes = express.Router();
const data = require('./data.json');
const fileSystem = require('fs');

routes.get('/', recipes.index);

routes.get('/about', recipes.about);

routes.get('/recipes', recipes.recipes);

routes.get('/recipe/:index', (req, res) => {
    const recipe = data.recipes;
    const recipeIndex = req.params.index;
    const recipeItems = recipe[recipeIndex];

    if(recipeItems == undefined) {
        return res.render('recipes/not-found');
    }

    return res.render('recipes/recipe', {recipe: recipeItems});
});

// ADMIN
routes.get('/admin/recipes', (req, res) => {
    return res.render('admin/index', {recipes: data});
});

routes.get('/admin/recipes/create', (req, res) => {
    return res.render('admin/create');
});

routes.get('/admin/recipes/:id', (req, res) => {
    const { id } = req.params;

    const foundRecipe = data.recipes.find((recipes) => {
        return id == recipes.id;
    });

    if(!foundRecipe) {
        return res.send("Recipe not found");
    }

    return res.render('admin/details', {recipe: foundRecipe});
});

routes.get('/admin/recipes/:id/edit', (req, res) => {
    const { id } = req.params;

    const foundRecipe = data.recipes.find((recipes) => {
        return id == recipes.id;
    });

    if(!foundRecipe) {
        return res.send("Recipe not found");
    }

    return res.render('admin/edit', {recipe: foundRecipe});
});

routes.post("/admin/recipes", (req, res) => {
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please fill in all fields");
        }
    }

    const id = Number(data.recipes.length);
    
    let {image, title, author, ingredients, preparation,information} = req.body;
    
    data.recipes.push({
        id,
        image, 
        title,
        author,
        ingredients,
        preparation,
        information        
    });
    

    fileSystem.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if(err) {
            return res.send('Error Write File');
        }

        return res.redirect('/admin/recipes');
    });
});

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;