const express = require('express');
const nunjucks = require('nunjucks');
const data = require('./data');
const server = express();

server.set('view engine', 'njk');
server.use(express.static('public'));

nunjucks.configure('views', {
    express: server
});

server.get('/', (req, res) => {
    return res.render('home', {revenues: data});
});

server.get('/about', (req, res) => {
    return res.render('about');
});

server.get('/revenues', (req, res) => {
    return res.render('revenues', {revenues: data});
});

server.get('/revenue/:index', (req, res) => {
    const revenue = data;
    const revenueIndex = req.params.index;
    const revenueItems = revenue[revenueIndex];

    if(revenueItems == undefined) {
        return res.render('not-found');
    }

    return res.render('revenue', {revenue: revenueItems});
});

server.use((req, res) => {
    return res.status(404).render('not-found');
});

server.listen(5000, () => {
    console.log("Server is running!");
});
