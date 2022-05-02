const express = require('express');
const routes = express.Router();

const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');
const ProfileController = require('../app/controllers/ProfileController');

const UserValidator = require('../app/validators/adminUser');
const SessionValidator = require('../app/validators/session');

const { onlyUsers } = require('../app/middlewares/session');


// login/logout
routes.get('/users/login', SessionController.loginForm); // login do usuário
routes.post('/users/login', SessionValidator.login, SessionController.login); // logout do usuário
routes.post('/users/logout', SessionController.logout); // logout do usuário

// reset password / forgot

// logged in user profile
routes.get('/profile', ProfileController.edit);
// routes.put('/user/profile', ProfileController, update);

// user register UserController
routes.get('/users/create', onlyUsers, UserController.create) // Formulário de Criação
routes.post('/users', UserValidator.post, UserController.post) // Método de cadastro

routes.get('/users/:id/edit', onlyUsers, UserValidator.edit, UserController.edit) // ou (UserController.show) formulário de edição do usuário
// routes.get('/users', UserController.list) // Mostrar a lista de usuários cadastrados
routes.put('/users/:id', UserValidator.update, UserController.update) // Editar um usuário
// routes.delete('/users/:id', UserController.delete) // Deletar um usuário

module.exports = routes;