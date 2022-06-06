const AdminChef = require('../models/AdminChef');
const FileAdminChef = require('../models/FileChef');
const File = require('../models/File');

const AdminUser = require('../models/AdminUser');

const { unlinkSync } = require('fs');

module.exports = {
    async show(req, res) {
        try {
            let chefs = await AdminChef.findAll();
            // const chefs = results.rows;
    
            if(!chefs) return res.render('adminChefs/not-found');
    
            async function getImageAvatar(chefId) {
                let files = await AdminChef.files(chefId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );
    
                return files[0];
            };
    
            const chefsPromise = chefs.map(async chef => {
                chef.img = await getImageAvatar(chef.id);
    
                return chef;
            });
    
            const lastAdded = await Promise.all(chefsPromise);

            // get user
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
    
            return res.render('adminChefs/index', { chefs: lastAdded, user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async create(req, res) {
        try {
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminChefs/create', { user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async details(req, res) {
        try {
            let chef = await AdminChef.find(req.params.id);
            // const chef = results.rows;

            if(!chef) return res.render('adminChefs/not-found');

            // get image avatar
            async function getImageAvatar(chefId) {
                let files = await AdminChef.files(chefId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                // console.log(files[0]);
                return files[0];
            };

            // let img = await getImageAvatar(chef.id);
            // chef.img = img;
            chef.img = await getImageAvatar(chef.id);

            // get image Recipes
            const recipes = await AdminChef.findRecipe(chef.id);
            // const recipes = results.rows;

            async function getImageRecipe(recipeId) {
                let files = await AdminChef.filesRecipe(recipeId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            const recipePromise = recipes.map(async recipe => {
                recipe.img = await getImageRecipe(recipe.id);

                return recipe;
            });

            const lastRecipeAdded = await Promise.all(recipePromise);

            let recipesCount = 0;

            if(lastRecipeAdded.length == 0) {
                recipesCount;
            } else {
                recipesCount = lastRecipeAdded.length;
            };

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminChefs/details', {
                // chef: lastAvatarAdded, 
                chef, 
                recipes: lastRecipeAdded, 
                recipesCount, 
                user
            });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async edit(req, res) {
        try {
            let chef = await AdminChef.find(req.params.id);
            // const chef = results.rows[0];

            if(!chef) return res.render('adminChefs/not-found');

            // get images
            let files = await AdminChef.files(chef.id);
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // middleware
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
            
            return res.render('adminChefs/edit', { chef, files, user });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async post(req, res) {
        try {
            // Create Image
            const filesPromise = req.files.map(file => FileAdminChef.create({ 
                name: file.filename,
                path: file.path
            }));

            const filesId = await Promise.all(filesPromise);
            // let results = await filesPromise[0];
            // const fileId = results.rows[0].id;


            // create chef
            const chefId = await AdminChef.create({
                name: req.body.name,
                file_id: filesId
            });


            // renderizar front end

            // get chef and recipes
            // Pulling chef data and chef recipes, to render the page with success message
            const chef = await AdminChef.find(chefId);

            if(!chef) return res.render('adminChefs/not-found');

            // get image avatar
            async function getImageAvatar(chefId) {
                let files = await AdminChef.files(chefId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            chef.img = await getImageAvatar(chef.id);

            // const avatarPromise = chef.map(async avatar => {
            //     avatar.img = await getImageAvatar(avatar.id);

            //     return avatar;
            // });

            // const lastAvatarAdded = await Promise.all(avatarPromise);

            // get image Recipes
            const recipes = await AdminChef.findRecipe(chefId);
            // recipes = results.rows;

            // async function getImageRecipe(recipeId) {
            //     let files = await AdminChef.filesRecipe(recipeId);
            //     files = files.map(
            //         file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            //     );

            //     return files[0];
            // };

            // const recipePromise = recipes.map(async recipe => {
            //     recipe.img = await getImageRecipe(recipe.id);

            //     return recipe;
            // });

            // const lastRecipeAdded = await Promise.all(recipePromise);

            let recipesCount = 0;

            if(recipes.length == 0) {
                recipesCount;
            };

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
    
            return res.render(`adminChefs/details`, {
                chef,
                recipesCount,
                user,
                success: "Chef criado com sucesso!"
            });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    // async put(req, res) {
    //     try {

    //         // Marco amanhã pense o seguinte para coneguir atualizar a imagem do chef.

    //         // Busque primeiro o chef, isso você já esta fazendo.
    //         let chef = await AdminChef.files(req.body.id);
    //         const fileId = chef[0].file_id;
    //         const filePath = chef[0].path;
    //         // Pegue o id do chef.
    //         console.log(fileId);
    //         console.log(filePath);

    //         // Crie uma nova imagem e, pegue o ID desta nova imagem
    //         // Create nem Image
    //         if(req.files.length != 0) {
    //             // const oldFiles = await AdminChef.files(fileId);
    //             // const totalFiles = oldFiles.length + (req.files.length - 1);

    //             // if(totalFiles <= 1) {
    //             const filesPromise = req.files.map(file => File.create({
    //                 name: file.filename,
    //                 path: file.path
    //             }));

    //             file = await Promise.all(filesPromise);

    //             await file.map(id => AdminChef.update(req.body.id, {
    //                 name: req.body.name,
    //                 file_id: id
    //             }));
    //         };

    //         // Realize o update em chefs, atualizando nome e file_id!!!!!!!
    //         // console.log('New File: ');
    //         // console.log(file);
            
            
    //         // Por último remova a imagem antiga
    //         // removed image
    //         if(req.body.removed_avatar) {
    //             await File.delete(fileId);
    //             unlinkSync(chef[0].path);
    //         };

            


    //         // renderizar novos dados
    //         // Middleware
    //         // const newChef = await AdminChef.find(req.body.id);
    //         // console.log(newChef);
    //         return
            
    //         // let fileChef = await AdminChef.files(req.body.id);
    //         // fileChef = fileChef.map(
    //         //     file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    //         // );

    //         // chef[0].img = fileChef;


            
    //         // for(let count in recipes) {
    //         //     recipes[count].chefs_name = req.body.name;
    //         // };

    //         return res.render('adminChefs/details', {
    //             chef,
    //             // recipes,
    //             // recipesCount,
    //             // user,
    //             success: "Chef atualizado com sucesso!"
    //         });
    //     } catch(err) {
    //         console.error(err);
    //         return res.render('adminUsers/not-found');
    //     };
    // },
    async put(req, res) {
        try {
            let chef = await AdminChef.files(req.body.id);
            const fileId = chef[0].file_id;

            // Create nem Image and remove old image
            if(req.files.length != 0) {
                const filesPromise = req.files.map(file => File.create({
                    name: file.filename,
                    path: file.path
                }));

                let file = await Promise.all(filesPromise);

                let filePromise = file.map(id => AdminChef.update(req.body.id, {
                    file_id: id
                }));

                await Promise.all(filePromise);

                File.delete(fileId);
                unlinkSync(chef[0].path);
            };

            await AdminChef.update(req.body.id, {
                name: req.body.name
            });

            // get chef and recipes
            // Pulling chef data and chef recipes, to render the page with success message
            const newChef = await AdminChef.find(req.body.id);

            if(!chef) return res.render('adminChefs/not-found');

            async function getImageAvatar(chefId) {
                let file = await AdminChef.files(chefId);
                file = file.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return file[0];
            };

            newChef.name = req.body.name;
            newChef.img = await getImageAvatar(newChef.id);

            // Get recipes from the chef
            const recipes = await AdminChef.findRecipe(newChef.id);

            async function getImageRecipe(recipeId) {
                let files = await AdminChef.filesRecipe(recipeId);
                files = files.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            };

            const recipePromise = recipes.map(async recipe => {
                recipe.img = await getImageRecipe(recipe.id);

                return recipe;
            });

            const lastRecipeAdded = await Promise.all(recipePromise);

            let recipesCount = 0;

            if(lastRecipeAdded.length == 0) {
                recipesCount;
            } else {
                recipesCount = lastRecipeAdded.length;
            };

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });

            return res.render('adminChefs/details', {
                chef: newChef,
                recipes: lastRecipeAdded, 
                recipesCount,
                user,
                success: "Chef atualizado com sucesso!"
            });
        } catch(err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    },
    async delete(req, res) {
        try {
            const files = await AdminChef.files(req.body.id);

            const chefRecipes = await AdminChef.chefRecipes(req.body.id);

            if(chefRecipes.length == 0) {
                await AdminChef.delete(req.body.id);
                
                files.map(file => {
                    try {
                        File.delete(file.file_id);
                        unlinkSync(file.path);
                    } catch(err) {
                        console.error(err);
                    };
                });

                // busca dados para renderizar
                let chefs = await AdminChef.findAll();

                if(!chefs) return res.render('adminChefs/not-found');
    
                async function getImageAvatar(chefId) {
                    let files = await AdminChef.files(chefId);
                    files = files.map(
                        file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                    );
        
                    return files[0];
                };
        
                const chefsPromise = chefs.map(async chef => {
                    chef.img = await getImageAvatar(chef.id);
        
                    return chef;
                });
    
                const lastAdded = await Promise.all(chefsPromise);
    
                // get user
                const { userId: id } = req.session;
                const user = await AdminUser.findOne({ where: {id} });
    
                return res.render('adminChefs/index', {
                    chefs: lastAdded,
                    user,
                    success: "Chef deletado com sucesso!"
                });
            } else {
                let chef = await AdminChef.find(req.body.id);

                let files = await AdminChef.files(chef.id);
                files = files.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                }));

                const { userId: id } = req.session;
                const user = await AdminUser.findOne({ where: {id} });

                return res.render('adminChefs/edit', {
                    chef,
                    files,
                    user,
                    error: 'Chefs que possuem receitas, não podem ser deletados!'
                });
            };

            // const chef = await AdminChef.chefRecipes(req.body.id);
            // const chef = results.rows;

            // if(!chef) return res.render('adminChefs/not-found');

            // const [ {title, recipes_id, file_id} ] = chef;

            // if(title == null && recipes_id == null) {
            //     await AdminChef.delete(req.body.id);
            //     await FileAdminChef.delete(file_id);
                
            //     let { chefs, user } = req.data;
                
            //     chefs = chefs.filter((chef) => chef.id != req.body.id);

            //     return res.render('adminChefs/index', {
            //         chefs,
            //         user,
            //         success: "Chef deletado com sucesso!"
            //     });
            // } else {
            //     let results = await AdminChef.find(req.body.id);
            //     const chef = results.rows[0];

            //     // get images
            //     results = await AdminChef.files(chef.id);
            //     let files = results.rows;
            //     files = files.map(file => ({
            //         ...file,
            //         src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            //     }));
                
            //     return res.render('adminChefs/edit', {
            //         chef,
            //         files,
            //         error: "Chefs que possuem receitas, não podem ser deletados!"
            //     });
            // };
        } catch (err) {
            console.error(err);
            return res.render('adminUsers/not-found');
        };
    }
}
// module.exports = {
//     async show(req, res) {
//         try {
//             let results = await AdminChef.all();
//             const chefs = results.rows;
    
//             if(!chefs) return res.render('adminChefs/not-found');
    
//             async function getImageAvatar(chefId) {
//                 let results = await AdminChef.files(chefId);
//                 const files = results.rows.map(
//                     file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//                 );
    
//                 return files[0];
//             };
    
//             const chefsPromise = chefs.map(async chef => {
//                 chef.img = await getImageAvatar(chef.id);
    
//                 return chef;
//             });
    
//             const lastAdded = await Promise.all(chefsPromise);

//             // get user
//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });
    
//             return res.render('adminChefs/index', { chefs: lastAdded, user });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async create(req, res) {
//         try {
//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render('adminChefs/create', { user });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async details(req, res) {
//         try {
//             let results = await AdminChef.find(req.params.id);
//             const chef = results.rows;

//             if(!chef) return res.render('adminChefs/not-found');

//             // get image avatar
//             async function getImageAvatar(chefId) {
//                 let results = await AdminChef.files(chefId);
//                 const files = results.rows.map(
//                     file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//                 );

//                 return files[0];
//             };

//             const avatarPromise = chef.map(async avatar => {
//                 avatar.img = await getImageAvatar(avatar.id);

//                 return avatar;
//             });

//             const lastAvatarAdded = await Promise.all(avatarPromise);

//             // get image Recipes
//             results = await AdminChef.findRecipe(chef[0].id);
//             const recipes = results.rows;

//             async function getImageRecipe(recipeId) {
//                 let results = await AdminChef.filesRecipe(recipeId);
//                 const files = results.rows.map(
//                     file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//                 );

//                 return files[0];
//             };

//             const recipePromise = recipes.map(async recipe => {
//                 recipe.img = await getImageRecipe(recipe.id);

//                 return recipe;
//             });

//             const lastRecipeAdded = await Promise.all(recipePromise);

//             let recipesCount = 0;

//             if(lastRecipeAdded.length == 0) {
//                 recipesCount;
//             } else {
//                 recipesCount = lastRecipeAdded.length;
//             };

//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });

//             return res.render('adminChefs/details', {
//                 chef: lastAvatarAdded, 
//                 recipes: lastRecipeAdded, 
//                 recipesCount, 
//                 user
//             });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async edit(req, res) {
//         try {
//             let results = await AdminChef.find(req.params.id);
//             const chef = results.rows[0];

//             if(!chef) return res.render('adminChefs/not-found');

//             // get images
//             results = await AdminChef.files(chef.id);
//             let files = results.rows;
//             files = files.map(file => ({
//                 ...file,
//                 src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//             }));

//             // middleware
//             const user = req.data;
            
//             return res.render('adminChefs/edit', { chef, files, user });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async post(req, res) {
//         try {
//             // Create Image
//             const filesPromise = req.files.map(file => FileAdminChef.create({ ...file }));
//             let results = await filesPromise[0];
//             const fileId = results.rows[0].id;

//             // create chef
//             results = await AdminChef.create(req.body, fileId);
//             const chefId = results.rows[0].id;

//             // get chef and recipes
//             // Pulling chef data and chef recipes, to render the page with success message
//             results = await AdminChef.find(chefId);
//             const chef = results.rows;

//             if(!chef) return res.render('adminChefs/not-found');

//             // get image avatar
//             async function getImageAvatar(chefId) {
//                 let results = await AdminChef.files(chefId);
//                 const files = results.rows.map(
//                     file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//                 );

//                 return files[0];
//             };

//             const avatarPromise = chef.map(async avatar => {
//                 avatar.img = await getImageAvatar(avatar.id);

//                 return avatar;
//             });

//             const lastAvatarAdded = await Promise.all(avatarPromise);

//             // get image Recipes
//             results = await AdminChef.findRecipe(chefId);
//             const recipes = results.rows;

//             let recipesCount = 0;

//             if(recipes.length == 0) {
//                 recipesCount;
//             };

//             const { userId: id } = req.session;
//             const user = await AdminUser.findOne({ where: {id} });
    
//             return res.render(`adminChefs/details`, {
//                 chef: lastAvatarAdded,
//                 recipesCount, 
//                 user,
//                 success: "Chef criado com sucesso!"
//             });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async put(req, res) {
//         try {
//             // Find Files
//             let results = await AdminChef.files(req.body.id);
//             let fileId = results.rows[0].file_id;

//             // Create nem Image
//             if(req.files.length != 0) {
//                 const oldFiles = await AdminChef.files(fileId);

//                 const totalFiles = oldFiles.rows.length + (req.files.length - 1);

//                 if(totalFiles <= 1) {
//                     const newFilesPromise = req.files.map(file => FileAdminChef.create({ ...file }));

//                     const results = await newFilesPromise[0];
//                     fileId = results.rows[0].id;
//                 };
//             };

//             // removed image
//             if(req.body.removed_avatar) {
//                 const removedFiles = req.body.removed_avatar.split(',');
//                 const lastIndex = removedFiles.length;

//                 removedFiles.splice(lastIndex, 1);

//                 if(req.files.length == 0) {
//                     let result = await AdminChef.find(req.body.id);
//                     const chef = result.rows[0];

//                     // get images
//                     result = await AdminChef.files(chef.id);
//                     let files = result.rows;
//                     files = files.map(file => ({
//                         ...file,
//                         src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//                     }));

//                     return res.render("adminChefs/edit", {
//                         chef: req.body,
//                         files,
//                         error: "Por favor, escolha um avatar!"
//                     });
//                 };

//                 await AdminChef.update(req.body, fileId);
//                 await removedFiles.map(id => FileAdminChef.delete(id));
//             };

//             AdminChef.update(req.body, fileId);
            
//             // Middleware
//             let { chef, recipes, recipesCount, user } = req.data;       
            
//             let fileChef = await AdminChef.files(chef[0].id);
//             const files = fileChef.rows.map(
//                 file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//             );
                
//             chef[0].name = req.body.name;
//             chef[0].img = files;

//             for(let count in recipes) {
//                 recipes[count].chefs_name = req.body.name;
//             };

//             return res.render('adminChefs/details', {
//                 chef,
//                 recipes,
//                 recipesCount,
//                 user,
//                 success: "Chef atualizado com sucesso!"
//             });
//         } catch(err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     },
//     async delete(req, res) {
//         try {
//             const results = await AdminChef.chefRecipes(req.body.id);
//             const chef = results.rows;

//             if(!chef) return res.render('adminChefs/not-found');

//             const [ {title, recipes_id, file_id} ] = chef;

//             if(title == null && recipes_id == null) {
//                 await AdminChef.delete(req.body.id);
//                 await FileAdminChef.delete(file_id);
                
//                 let { chefs, user } = req.data;
                
//                 chefs = chefs.filter((chef) => chef.id != req.body.id);

//                 return res.render('adminChefs/index', {
//                     chefs,
//                     user,
//                     success: "Chef deletado com sucesso!"
//                 });
//             } else {
//                 let results = await AdminChef.find(req.body.id);
//                 const chef = results.rows[0];

//                 // get images
//                 results = await AdminChef.files(chef.id);
//                 let files = results.rows;
//                 files = files.map(file => ({
//                     ...file,
//                     src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
//                 }));
                
//                 return res.render('adminChefs/edit', {
//                     chef,
//                     files,
//                     error: "Chefs que possuem receitas, não podem ser deletados!"
//                 });
//             };
//         } catch (err) {
//             console.error(err);
//             return res.render('adminUsers/not-found');
//         };
//     }
// }
