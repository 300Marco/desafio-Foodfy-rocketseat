const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: 'smtp.gmail.com', // colocar o SMTP do Google aqui
    port: 465, // a porta aqui
    auth: { // usuário e password fornecidos pelo SMTP do google
        user: 'casa.testes300@gmail.com',
        pass: '#))sparta34815461'
    }
});