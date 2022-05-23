const express = require('express');
const routes = express.Router();

const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');
const ProfileController = require('../app/controllers/ProfileController');

const UserValidator = require('../app/validators/adminUser');
const SessionValidator = require('../app/validators/session');
const ProfileValidator = require('../app/validators/adminProfile');

const { onlyUsers, isLoggedRedirectToProfile, checkIsAdmin } = require('../app/middlewares/session');

// login/logout
routes.get('/users/login', isLoggedRedirectToProfile, SessionController.loginForm); // login do usuário
routes.post('/users/login', SessionValidator.login, SessionController.login); // logout do usuário
routes.post('/users/logout', SessionController.logout); // logout do usuário

// reset password / forgot
routes.get('/forgot-password', SessionController.forgotForm);
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot);
routes.get('/password-reset', SessionController.resetForm);
routes.post('/password-reset', SessionValidator.reset, SessionController.reset);

// logged in user profile
routes.get('/profile', onlyUsers, ProfileValidator.edit, ProfileController.edit);
routes.put('/profile', ProfileValidator.update, ProfileController.update);

// user register UserController
routes.get('/users/create', onlyUsers, checkIsAdmin, UserController.create); // Formulário de Criação
routes.post('/users', UserValidator.post, UserController.post); // Método de cadastro

routes.get('/users/:id/edit', onlyUsers, checkIsAdmin, UserValidator.edit, UserController.edit); // ou (UserController.show) formulário de edição do usuário
routes.get('/users', onlyUsers, checkIsAdmin, UserController.list); // Mostrar a lista de usuários cadastrados
routes.put('/users/:id', UserValidator.put, UserController.put); // Editar um usuário
routes.delete('/users/:id', UserController.delete); // Deletar um usuário

routes.delete('/users', UserController.deleteUserList); // Deletar na lista de usuários

routes.use((req, res) => {
    return res.status(404).render('adminUsers/not-found');
});

module.exports = routes;