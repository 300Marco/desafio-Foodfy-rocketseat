const express = require('express');
const routes = express.Router();
const data = require('./data');

routes.get('/', (req, res) => {
    return res.render('recipes/index', {recipes: data});
});

routes.get('/about', (req, res) => {
    return res.render('recipes/about');
});

routes.get('/recipes', (req, res) => {
    return res.render('recipes/recipes', {recipes: data});
});

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