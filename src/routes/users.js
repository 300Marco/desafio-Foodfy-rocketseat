const express = require('express');
const routes = express.Router();

const UserController = require('../app/controllers/UserController');


// login/logout

// reset password / forgot

// user register UserController
routes.get('/users/create', UserController.create) // Formulário de Criação
// routes.post('/users', UserController.post) // Método de cadastro

// routes.get('/users/:id/edit', UserController.edit) // ou (UserController.show) formulário de edição do usuário
// routes.get('/users', UserController.list) // Mostrar a lista de usuários cadastrados
// routes.put('/users/:id', UserController.put) // Editar um usuário
// routes.delete('/users/:id', UserController.delete) // Deletar um usuário

module.exports = routes;