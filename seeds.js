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

// users
let isAdmin = [true, false];

let usersId = [],
    chefsId = [],
    fileRecipeId = [];

// chefs
let totalUsers = 3,
    totalChefs = 10,
    totalRecipes = 10,
    totalFiles = 50;

// recipes

// let isAdmin = [true, false];
// let usersId = [];
// let totalUsers = 3;

// // chefs
// let chefsId = [];
// let totalChefs = 10;

// // recipes
// let fileRecipeId = [];
// let totalFiles = 50;
// let totalRecipes = 10;

async function createUsers() {
    const users = [];
    const password = await hash('123', 8);

    while(users.length < totalUsers) {
        users.push({
            name: faker.name.findName(),
            email: emailFieldFormatting(faker.internet.email()),
            password,
            is_admin: isAdmin[Math.floor(Math.random() * 2)],
        });
    };

    const usersPromise = users.map(user => AdminUser.create(user));
    usersId = await Promise.all(usersPromise);
};

async function createChefs() {
    // create files
    let files = [];

    while(files.length < totalChefs) {
        files.push({
            name: faker.image.image(),
            path: `public/assets/images/chef-placeholder.png`
        });
    };
    
    const filesPromise = await files.map(file => File.create(file));
    await Promise.all(filesPromise);
    
    // create chefs
    const chefs = [];

    while(chefs.length < totalChefs) {
        chefs.push({
            name: faker.name.findName(),
            file_id: chefs.length + 1
        });
    };
    
    const chefsPromise = chefs.map(chef => AdminChef.create(chef));
    chefsId = await Promise.all(chefsPromise);
};

async function createRecipes(chefs_id, users_id) {
    // create recipes
    const recipes = [];

    while(recipes.length < totalRecipes) {
        recipes.push({
            chef_id: chefs_id[Math.floor(Math.random() * totalChefs)],
            user_id: users_id[Math.floor(Math.random() * totalUsers)],
            title: faker.name.findName(),
            ingredients: faker.helpers.arrayElements(['ingredients', 'ingredients', 'ingredients', 'ingredients', 'ingredients', 'ingredients', 'ingredients', 'ingredients']),
            preparation: faker.helpers.arrayElements(['preparation', 'preparation', 'preparation', 'preparation', 'preparation', 'preparation', 'preparation', 'preparation']),
            information: faker.lorem.paragraph(Math.ceil(Math.random() * 10)).replace(/\./g, '. <br>')
        });
    };
    
    const recipesPromise = recipes.map(recipe => AdminRecipe.create(recipe));
    recipesId = await Promise.all(recipesPromise);

    // create files
    let files = [];

    while(files.length < totalFiles) {
        files.push({
            name: faker.image.image(),
            path: `public/assets/images/recipe-placeholder.png`
        });
    };
    
    const filesPromise = await files.map(file => File.create(file));
    fileRecipeId = await Promise.all(filesPromise);

    // Create Recipe ID and Files
    let arrayId = 0;
    let fileId = Number(fileRecipeId[0]);
    fileRecipeId.map(() => {
        arrayId += 1;
        for(let i = 0; i < 5; i++) {
            if(fileId <= 60) {
                File.createRecipeFiles({
                    recipeId: arrayId,
                    fileId
                });
            }
            fileId += 1;
        };
    });
};

async function init() {
    await createUsers();
    await createChefs();
    await createRecipes(chefsId, usersId);
}

init();


















// // estrutura
// async function createUsers() {
//     const users = []; // recebe os dados de usuários
//     const password = await hash('123', 8);

//     while(users.length < 3) {
//         users.push({

//         });
//     };
// }