const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a655e65b5b1d96",
        pass: "377d02665554cc"
    }
});

