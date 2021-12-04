const express = require('express');
const recipes = require('./controllers/recipes');
const routes = express.Router();
const data = require('./data');
const fileSystem = require('fs');
const { response } = require('express');

routes.get('/', recipes.index);

routes.get('/about', recipes.about);

routes.get('/recipes', recipes.recipes);

routes.get('/recipe/:index', (req, res) => {
    const recipe = data;
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
    return res.render('admin/details', {recipe: data});
});

routes.get('/admin/recipes/:id/edit', (req, res) => {
    return res.render('admin/edit', {recipes: data});
});

routes.post("/admin/recipes", (req, res) => {
    const keys = Object.keys(req.body);
    
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send("Please fill in all fields");
        }
    }

    fileSystem.writeFile('data.json', JSON.stringify(req.body), (err) => {
        if(err) {
            return res.send('Error Write File');
        }

        return res.redirect('/admin/recipes');
    });
    
    // return res.send(req.body);
});

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;