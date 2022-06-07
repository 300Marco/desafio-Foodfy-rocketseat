const { hash } = require('bcryptjs');
const { unlinkSync } = require('fs');
const { faker } = require('@faker-js/faker');

const File = require('./src/app/models/File');
const FileAdminChef = require('./src/app/models/FileChef');
const AdminUser = require('./src/app/models/AdminUser');
const AdminRecipe = require('./src/app/models/AdminRecipe');
const AdminChef = require('./src/app/models/AdminChef');


function emailFieldFormatting(text) {
    return text.toLowerCase();
}

let isAdmin = [true, false];
let usersId = []; // recebe os IDs de usuários
let totalUsers = 3;
let chefsId = []; // recebe os IDs de usuários
let totalChefs = 10;

async function createUsers() {
    const users = []; // recebe os dados de usuários
    const password = await hash('123', 8);

    while(users.length < totalUsers) {
        users.push({
            name: faker.name.findName(),
            email: emailFieldFormatting(faker.internet.email()),
            password,
            is_admin: isAdmin[Math.floor(Math.random() * 2)],
        });
    };

    // const usersPromise = users.map(user => {
    //     console.log(user);
    // });
    const usersPromise = users.map(user => AdminUser.create(user));
    usersId = await Promise.all(usersPromise);
};

async function createChefs() {
    let files = [];

    while(files.length < totalChefs) {
        files.push({
            name: faker.image.image(),
            path: `public/assets/images/placeholder.png`
        });
    };
    
    // const filesPromise = await files.map(file => {
    //     // console.log(file);
    // });
    
    const filesPromise = await files.map(file => File.create(file));
    await Promise.all(filesPromise);

    // return
    
    const chefs = []; // recebe os dados de usuários

    while(chefs.length < totalChefs) {
        chefs.push({
            name: faker.name.findName(),
            file_id: chefs.length + 1
            // file_id: chefsId[Math.floor(Math.random() * totalChefs)]
        });
    };

    // const chefsPromise = chefs.map(chef => {
    //     console.log(chef);
    // });
    
    const chefsPromise = chefs.map(chef => AdminChef.create(chef));
    await Promise.all(chefsPromise);
};

createChefs();

// createUsers();





















// // estrutura
// async function createUsers() {
//     const users = []; // recebe os dados de usuários
//     const password = await hash('123', 8);

//     while(users.length < 3) {
//         users.push({

//         });
//     };
// }