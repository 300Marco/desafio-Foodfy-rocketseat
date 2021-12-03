const express = require('express');
const recipes = require('./recipes');
const routes = express.Router();
const data = require('./data');

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
routes.get('/admin/revenues', (req, res) => {
    return res.render('admin/admin');
});

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;