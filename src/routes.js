const express = require('express');
const recipes = require('./app/controllers/recipes');
const adminRecipes = require('./app/controllers/admin');
const adminChefs = require('./app/controllers/chefs');
const routes = express.Router();

routes.get('/', recipes.index);

routes.get('/about', recipes.about);

routes.get('/recipes', recipes.recipes);

routes.get('/search', recipes.search);

routes.get('/chefs', recipes.chefs);

routes.get('/details/:index', recipes.details);

// ADMIN
routes.get('/admin/recipes', adminRecipes.show);

routes.get('/admin/recipes/create', adminRecipes.create);

routes.get('/admin/recipes/:id', adminRecipes.details);

routes.get('/admin/recipes/:id/edit', adminRecipes.edit);

routes.post("/admin/recipes", adminRecipes.post);

routes.put('/admin/recipes', adminRecipes.put);

routes.delete('/admin/recipes', adminRecipes.delete);

// ADMIN - CHEFS
routes.get('/admin/chefs', adminChefs.show);

routes.get('/admin/chefs/create', adminChefs.create);

routes.get('/admin/chefs/:id', adminChefs.details);

routes.get('/admin/chefs/:id/edit', adminChefs.edit);

routes.post('/admin/chefs', adminChefs.post);

routes.put('/admin/chefs', adminChefs.put);

routes.delete('/admin/chefs', adminChefs.delete);

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;