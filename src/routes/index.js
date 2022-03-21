const express = require('express');
const HomeController = require('../app/controllers/HomeController');
const routes = express.Router();

const recipes = require('../routes/recipes');
const adminRecipes = require('../routes/adminRecipes');
const adminChefs = require('../routes/adminChefs');

// WEB PAGE
routes.get('/', HomeController.index);
// routes.get('/', recipes.index);

// RECIPES
routes.use('', recipes);

// ADMIN - RECIPES
routes.use('/admin', adminRecipes);

// ADMIN - CHEFS
routes.use('/admin', adminChefs);


routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;