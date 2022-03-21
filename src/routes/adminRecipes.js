const express = require('express');
const routes = express.Router();

const AdminRecipesController = require('../app/controllers/AdminRecipesController');
const multer = require('../app/middlewares/multer');


routes.get('/recipes', AdminRecipesController.show);

routes.get('/recipes/create', AdminRecipesController.create);

routes.get('/recipes/:id', AdminRecipesController.details);

routes.get('/recipes/:id/edit', AdminRecipesController.edit);

routes.post("/recipes", multer.array("photos", 5), AdminRecipesController.post);

routes.put('/recipes', multer.array("photos", 5), AdminRecipesController.put);

routes.delete('/recipes', AdminRecipesController.delete);

module.exports = routes;
