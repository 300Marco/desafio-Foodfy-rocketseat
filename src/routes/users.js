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
routes.get('/users/login', isLoggedRedirectToProfile, SessionController.loginForm); 
routes.post('/users/login', SessionValidator.login, SessionController.login); 
routes.post('/users/logout', SessionController.logout); 

// reset password / forgot
routes.get('/forgot-password', SessionController.forgotForm);
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot);
routes.get('/password-reset', SessionController.resetForm);
routes.post('/password-reset', SessionValidator.reset, SessionController.reset);

// logged in user profile
routes.get('/profile', onlyUsers, ProfileValidator.edit, ProfileController.edit);
routes.put('/profile', ProfileValidator.update, ProfileController.update);

// user register UserController
routes.get('/users/create', onlyUsers, checkIsAdmin, UserController.create); 
routes.post('/users', UserValidator.post, UserController.post); 

routes.get('/users/:id/edit', onlyUsers, checkIsAdmin, UserValidator.edit, UserController.edit); 
routes.get('/users', onlyUsers, checkIsAdmin, UserController.list); 
routes.put('/users/:id', UserValidator.put, UserController.put); 
routes.delete('/users/:id', UserController.delete); 

routes.delete('/users', UserController.deleteUserList); 

routes.use((req, res) => {
    return res.status(404).render('adminUsers/not-found');
});

module.exports = routes;