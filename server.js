const express = require('express');
const nunjucks = require('nunjucks');
// const data = require('./data');
const routes = require('./routes');
const methodOverride = require('method-override');
const server = express();

server.use(express.urlencoded({extend:true}));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);
server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(5000, () => {
    console.log("Server is running!");
});
