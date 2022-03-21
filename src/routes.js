const express = require('express');
const HomeController = require('./app/controllers/HomeController');
const recipes = require('./app/controllers/recipes');
const adminRecipes = require('./app/controllers/admin');
const adminChefs = require('./app/controllers/chefs');
const multer = require('./app/middlewares/multer');
const routes = express.Router();

// WEB PAGE
routes.get('/', HomeController.index);
// routes.get('/', recipes.index);

routes.get('/about', recipes.about);

routes.get('/recipes', recipes.recipes);

routes.get('/search', recipes.search);

routes.get('/chefs', recipes.chefs);

routes.get('/details/:index', recipes.details);

// ADMIN - RECIPES
routes.get('/admin/recipes', adminRecipes.show);

routes.get('/admin/recipes/create', adminRecipes.create);

routes.get('/admin/recipes/:id', adminRecipes.details);

routes.get('/admin/recipes/:id/edit', adminRecipes.edit);

routes.post("/admin/recipes", multer.array("photos", 5), adminRecipes.post);

routes.put('/admin/recipes', multer.array("photos", 5), adminRecipes.put);

routes.delete('/admin/recipes', adminRecipes.delete);

// ADMIN - CHEFS
routes.get('/admin/chefs', adminChefs.show);

routes.get('/admin/chefs/create', adminChefs.create);

routes.get('/admin/chefs/:id', adminChefs.details);

routes.get('/admin/chefs/:id/edit', adminChefs.edit);

routes.post('/admin/chefs', multer.array("avatar", 1), adminChefs.post);

routes.put('/admin/chefs', multer.array("avatar", 1), adminChefs.put);

routes.delete('/admin/chefs', adminChefs.delete);

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;