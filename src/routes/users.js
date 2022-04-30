const express = require('express');
const routes = express.Router();

const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');

const Validator = require('../app/validators/adminUser');


// login/logout

// reset password / forgot
routes.post('/users/logout', SessionController.logout);

// user register UserController
routes.get('/users/create', UserController.create) // Formulário de Criação
routes.post('/users', Validator.post, UserController.post) // Método de cadastro

routes.get('/users/:id/edit', Validator.edit, UserController.edit) // ou (UserController.show) formulário de edição do usuário
// routes.get('/users', UserController.list) // Mostrar a lista de usuários cadastrados
routes.put('/users/:id', Validator.update, UserController.update) // Editar um usuário
// routes.delete('/users/:id', UserController.delete) // Deletar um usuário

module.exports = routes;