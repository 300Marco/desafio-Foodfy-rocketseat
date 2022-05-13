const express = require('express');
const routes = express.Router();

const ChefsController = require('../app/controllers/ChefsController');

const multer = require('../app/middlewares/multer');
const { onlyUsers, checkIsAdmin } = require('../app/middlewares/session');

// test
const { dataToEdit, dataToUpdate, dataToDelete } = require('../app/middlewares/chefSendData');


routes.get('/chefs', onlyUsers, ChefsController.show);

routes.get('/chefs/create', onlyUsers, checkIsAdmin, ChefsController.create);

routes.get('/chefs/:id', onlyUsers, ChefsController.details);

routes.get('/chefs/:id/edit', onlyUsers, dataToEdit, ChefsController.edit);

routes.post('/chefs', multer.array("avatar", 1), onlyUsers, ChefsController.post);

routes.put('/chefs', multer.array("avatar", 1), onlyUsers, dataToUpdate, ChefsController.put);

routes.delete('/chefs', onlyUsers, dataToDelete, ChefsController.delete);

module.exports = routes;
