const express = require('express');
const routes = express.Router();

const AdminRecipesController = require('../app/controllers/AdminRecipesController');

const multer = require('../app/middlewares/multer');
const { onlyUsers } = require('../app/middlewares/session');


routes.get('/recipes', onlyUsers, AdminRecipesController.show);

routes.get('/recipes/create', onlyUsers, AdminRecipesController.create);

routes.get('/recipes/:id', onlyUsers, AdminRecipesController.details);

routes.get('/recipes/:id/edit', onlyUsers, AdminRecipesController.edit);

routes.post("/recipes", multer.array("photos", 5), AdminRecipesController.post);

routes.put('/recipes', multer.array("photos", 5), AdminRecipesController.put);

routes.delete('/recipes', AdminRecipesController.delete);

module.exports = routes;
