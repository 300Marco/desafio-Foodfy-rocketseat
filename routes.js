const express = require('express');
const routes = express.Router();
const data = require('./data');

routes.get('/', (req, res) => {
    return res.render('recipes/index', {revenues: data});
});

routes.get('/about', (req, res) => {
    return res.render('recipes/about');
});

routes.get('/revenues', (req, res) => {
    return res.render('recipes/revenues', {revenues: data});
});

routes.get('/revenue/:index', (req, res) => {
    const revenue = data;
    const revenueIndex = req.params.index;
    const revenueItems = revenue[revenueIndex];

    if(revenueItems == undefined) {
        return res.render('not-found');
    }

    return res.render('recipes/revenue', {revenue: revenueItems});
});

// ADMIN
routes.get('/admin/revenues', (req, res) => {
    return res.render('admin/admin');
});

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;