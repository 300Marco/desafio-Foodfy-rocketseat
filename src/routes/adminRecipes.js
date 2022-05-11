const express = require('express');
const routes = express.Router();

const AdminRecipesController = require('../app/controllers/AdminRecipesController');

const multer = require('../app/middlewares/multer');
const { onlyUsers } = require('../app/middlewares/session');

const recipeValidator = require('../app/validators/adminRecipe');

routes.get('/recipes', onlyUsers, AdminRecipesController.show);

routes.get('/recipes/create', onlyUsers, AdminRecipesController.create);

routes.get('/recipes/:id', onlyUsers, AdminRecipesController.details);

routes.get('/recipes/:id/edit', onlyUsers, AdminRecipesController.edit);

routes.post("/recipes", multer.array("photos", 5), onlyUsers, recipeValidator.post, AdminRecipesController.post);

routes.put('/recipes', multer.array("photos", 5), onlyUsers, recipeValidator.put, AdminRecipesController.put);

routes.delete('/recipes', onlyUsers, AdminRecipesController.delete);

// User Recipes
routes.get('/user/recipes', onlyUsers, AdminRecipesController.showUserRecipe);


module.exports = routes;
