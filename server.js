const express = require('express');
const server = express();

server.get('/', (req, res) => {
    return res.send('Olá! tudo certo');
});

server.listen(5000, () => {
    console.log("Server is running!");
});