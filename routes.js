const express = require('express');
const recipes = require('./controllers/recipes');
const adminRecipes = require('./controllers/admin');
const routes = express.Router();
const data = require('./data.json');
const fileSystem = require('fs');

routes.get('/', recipes.index);

routes.get('/about', recipes.about);

routes.get('/recipes', recipes.recipes);

routes.get('/recipe/:index', recipes.recipe);

// ADMIN
routes.get('/admin/recipes', adminRecipes.show);

routes.get('/admin/recipes/create', adminRecipes.create);

routes.get('/admin/recipes/:id', adminRecipes.details);

routes.get('/admin/recipes/:id/edit', adminRecipes.edit);

routes.post("/admin/recipes", adminRecipes.post);

routes.put('/admin/recipes', adminRecipes.put);

routes.delete('/admin/recipes', adminRecipes.delete);

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;