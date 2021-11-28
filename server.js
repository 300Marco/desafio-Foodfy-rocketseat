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

server.get('/revenues', (req, res) => {
    return res.render('revenues', {revenues: data});
});

server.get('/revenues/:index', (req, res) => {
    const revenues = data;
    const revenuesIndex = req.params.index;

    return res.send(revenues[revenuesIndex]);
});

server.get('/about', (req, res) => {
    return res.render('about');
});

server.use((req, res) => {
    return res.status(404).render('not-found');
});

server.listen(5000, () => {
    console.log("Server is running!");
});