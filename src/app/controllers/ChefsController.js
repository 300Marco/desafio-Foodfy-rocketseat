const AdminChef = require('../models/AdminChef');
const FileAdminChef = require('../models/FileChef');

const AdminUser = require('../models/AdminUser');

module.exports = {
    async show(req, res) {
        try {
            let results = await AdminChef.all();
            const chefs = results.rows;
    
            if(!chefs) return res.send("Nenhum chef encontrado!");
    
            async function getImageAvatar(chefId) {
                let results = await AdminChef.files(chefId);
                const files = results.rows.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );
    
                return files[0];
            }
    
            const chefsPromise = chefs.map(async chef => {
                chef.img = await getImageAvatar(chef.id);
    
                return chef;
            });
    
            const lastAdded = await Promise.all(chefsPromise);

            // get user
            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
    
            return res.render('adminChefs/index', {chefs: lastAdded, user});
        } catch (err) {
            console.error(err);
        };
    },
    async create(req, res) {
        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        return res.render('adminChefs/create', {user});
    },
    async details(req, res) {
        try {
            let results = await AdminChef.find(req.params.id);
            const chef = results.rows;

            if(!chef) return res.send("Nenhum chef encontrado!");

            // get image avatar
            async function getImageAvatar(chefId) {
                let results = await AdminChef.files(chefId);
                const files = results.rows.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            }

            const avatarPromise = chef.map(async avatar => {
                avatar.img = await getImageAvatar(avatar.id);

                return avatar;
            });

            const lastAvatarAdded = await Promise.all(avatarPromise);

            // get image Recipes
            results = await AdminChef.findRecipe(chef[0].id);
            const recipes = results.rows;

            async function getImageRecipe(recipeId) {
                let results = await AdminChef.filesRecipe(recipeId);
                const files = results.rows.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            }

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

            return res.render('adminChefs/details', {chef: lastAvatarAdded, recipes: lastRecipeAdded, recipesCount, user});
        } catch (err) {
            console.error(err);
            return res.render('adminChefs/not-found');
        };
    },
    // async edit(req, res) {
    //     try {
    //         let results = await AdminChef.find(req.params.id);
    //         const chef = results.rows[0];

    //         if(!chef) return res.send("AdminChef not found!");

    //         // get images
    //         results = await AdminChef.files(chef.id);
    //         let files = results.rows;
    //         files = files.map(file => ({
    //             ...file,
    //             src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    //         }));
            
    //         return res.render('adminChefs/edit', {chef, files});
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    async edit(req, res) {
        try {
            let results = await AdminChef.find(req.params.id);
            const chef = results.rows[0];

            // if(!chef) return res.send("AdminChef not found!");
            if(!chef) return res.render('adminChefs/not-found');

            // get images
            results = await AdminChef.files(chef.id);
            let files = results.rows;
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }));

            // BLOQUEIO DE USUÁRIOS SEM PERMISSÃO
            // PEGA ID DE USUÁRIO LOGADO
            const { userId: id } = req.session;

            const user = await AdminUser.findOne({ where: {id} });

            // PERMISSÃO PARA EDITAR RECEITA
            if(user.is_admin == false) {
                let results = await AdminChef.find(req.params.id);
                const chef = results.rows;

                if(!chef) return res.send("Nenhum chef encontrado!");

                // get image avatar
                async function getImageAvatar(chefId) {
                    let results = await AdminChef.files(chefId);
                    const files = results.rows.map(
                        file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                    );

                    return files[0];
                }

                const avatarPromise = chef.map(async avatar => {
                    avatar.img = await getImageAvatar(avatar.id);

                    return avatar;
                });

                const lastAvatarAdded = await Promise.all(avatarPromise);

                // get image Recipes
                results = await AdminChef.findRecipe(chef[0].id);
                const recipes = results.rows;

                async function getImageRecipe(recipeId) {
                    let results = await AdminChef.filesRecipe(recipeId);
                    const files = results.rows.map(
                        file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                    );

                    return files[0];
                }

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

                return res.render('adminChefs/details', {
                    chef: lastAvatarAdded, recipes: lastRecipeAdded, recipesCount,
                    error: "Você não tem permissões de administrador!"
                });
            };
            
            return res.render('adminChefs/edit', {chef, files, user});
        } catch (err) {
            console.error(err);
            return res.render('adminChefs/not-found');
        };
    },
    // async post(req, res) {
    //     try {
    //         const keys = Object.keys(req.body);
        
    //         for(key of keys) {
    //             if(req.body[key] == "") {
    //                 return res.send("Please fill in all fields");
    //             };
    //         };
    
    //         if(req.files.length == 0) {
    //             return res.send('Please, send at last one image');
    //         };
    
    //         // Create Image
    //         const filesPromise = req.files.map(file => FileAdminChef.create({ ...file }));
    //         let results = await filesPromise[0];
    //         const fileId = results.rows[0].id;

    //         // create chef
    //         results = await AdminChef.create(req.body, fileId);
    //         const chefId = results.rows[0].id;
    
    //         return res.redirect(`/admin/chefs/${chefId}`);
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body);
        
            for(key of keys) {
                if(req.body[key] == "") {
                    return res.send("Please fill in all fields");
                };
            };
    
            if(req.files.length == 0) {
                return res.send('Please, send at last one image');
            };
    
            // Create Image
            const filesPromise = req.files.map(file => FileAdminChef.create({ ...file }));
            let results = await filesPromise[0];
            const fileId = results.rows[0].id;

            // create chef
            results = await AdminChef.create(req.body, fileId);
            const chefId = results.rows[0].id;

            // get chef and recipes
            // Pulling chef data and chef recipes, to render the page with success message
            results = await AdminChef.find(chefId);
            const chef = results.rows;

            if(!chef) return res.send("Nenhum chef encontrado!");

            // get image avatar
            async function getImageAvatar(chefId) {
                let results = await AdminChef.files(chefId);
                const files = results.rows.map(
                    file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                );

                return files[0];
            }

            const avatarPromise = chef.map(async avatar => {
                avatar.img = await getImageAvatar(avatar.id);

                return avatar;
            });

            const lastAvatarAdded = await Promise.all(avatarPromise);

            // get image Recipes
            results = await AdminChef.findRecipe(chefId);
            const recipes = results.rows;

            let recipesCount = 0;

            if(recipes.length == 0) {
                recipesCount;
            }

            const { userId: id } = req.session;
            const user = await AdminUser.findOne({ where: {id} });
    
            return res.render(`adminChefs/details`, {
                chef: lastAvatarAdded,
                recipesCount, 
                user,
                success: "Chef criado com sucesso!"
            });
        } catch (err) {
            console.error(err);
        };
    },
    // async put(req, res) {
    //     try {
    //         const keys = Object.keys(req.body);

    //         for(key of keys) {
    //             if(req.body[key] == "" && key != 'removed_avatar') {
    //                 return res.send("Please fill in all fields");
    //             };
    //         };

    //         // Find Files
    //         let results = await AdminChef.files(req.body.id);
    //         let fileId = results.rows[0].file_id;

    //         // Create nem Image
    //         if(req.files.length != 0) {
    //             console.log('Adicionar imagem');

    //             const oldFiles = await AdminChef.files(fileId);

    //             const totalFiles = oldFiles.rows.length + (req.files.length - 1);

    //             if(totalFiles <= 1) {
    //                 console.log(totalFiles + ' Envia imagem para o banco de dados')
    //                 const newFilesPromise = req.files.map(file => FileAdminChef.create({ ...file }));

    //                 const results = await newFilesPromise[0];
    //                 fileId = results.rows[0].id;
    //             }
    //         };

    //         // removed image
    //         if(req.body.removed_avatar) {
    //             console.log('Remover imagem')

    //             const removedFiles = req.body.removed_avatar.split(',');
    //             const lastIndex = removedFiles.length;

    //             removedFiles.splice(lastIndex, 1);

    //             if(req.files.length == 0) {
    //                 return res.send("Please send one image");
    //             } 

    //             await AdminChef.update(req.body, fileId);
    //             await removedFiles.map(id => FileAdminChef.delete(id));
    //         };

    //         await AdminChef.update(req.body, fileId);

    //         return res.redirect(`/admin/chefs/${req.body.id}`);
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    async put(req, res) {
        try {
            const keys = Object.keys(req.body);

            for(key of keys) {
                if(req.body[key] == "" && key != 'removed_avatar') {
                    return res.send("Please fill in all fields");
                };
            };

            // Find Files
            let results = await AdminChef.files(req.body.id);
            let fileId = results.rows[0].file_id;

            // Create nem Image
            if(req.files.length != 0) {
                // console.log('Adicionar imagem');

                const oldFiles = await AdminChef.files(fileId);

                const totalFiles = oldFiles.rows.length + (req.files.length - 1);

                if(totalFiles <= 1) {
                    // console.log(totalFiles + ' Envia imagem para o banco de dados')
                    const newFilesPromise = req.files.map(file => FileAdminChef.create({ ...file }));

                    const results = await newFilesPromise[0];
                    fileId = results.rows[0].id;
                }
            };

            // removed image
            if(req.body.removed_avatar) {
                // console.log('Remover imagem')

                const removedFiles = req.body.removed_avatar.split(',');
                const lastIndex = removedFiles.length;

                removedFiles.splice(lastIndex, 1);

                if(req.files.length == 0) {
                    return res.send("Please send one image");
                } 

                await AdminChef.update(req.body, fileId);
                await removedFiles.map(id => FileAdminChef.delete(id));
            };

            AdminChef.update(req.body, fileId);
            
            //Middleware
            let { chef, recipes, recipesCount, user } = req.data;       
            
            let fileChef = await AdminChef.files(chef[0].id);
            const files = fileChef.rows.map(
                file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            );
                
            chef[0].name = req.body.name;
            chef[0].img = files;

            return res.render('adminChefs/details', {
                chef,
                recipes,
                recipesCount,
                user,
                success: "Chef atualizado com sucesso!"
            });
        } catch (err) {
            console.error(err);
        };
    },
    // async delete(req, res) {
    //     try {
    //         const results = await AdminChef.chefRecipes(req.body.id);
    //         const chef = results.rows;

    //         if(!chef) return res.send("AdminChef not found!");

    //         const [ {title, recipes_id, file_id} ] = chef;

    //         if(title == null && recipes_id == null) {


    //             // await AdminChef.delete(req.body.id);
    //             // await FileAdminChef.delete(file_id);
    //             return res.redirect('/admin/chefs');
    //         } else {
    //             let results = await AdminChef.find(req.body.id);
    //             const chef = results.rows[0];

    //             // get images
    //             results = await AdminChef.files(chef.id);
    //             let files = results.rows;
    //             files = files.map(file => ({
    //                 ...file,
    //                 src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    //             }));
                
    //             return res.render('adminChefs/edit', {
    //                 chef,
    //                 files,
    //                 error: "Chefes que possuem receitas, não podem ser deletados!"
    //             });
    //         };
    //     } catch (err) {
    //         console.error(err);
    //     };
    // }
    async delete(req, res) {
        try {
            const results = await AdminChef.chefRecipes(req.body.id);
            const chef = results.rows;

            if(!chef) return res.send("AdminChef not found!");

            const [ {title, recipes_id, file_id} ] = chef;

            if(title == null && recipes_id == null) {
                await AdminChef.delete(req.body.id);
                await FileAdminChef.delete(file_id);
                
                let { chefs, user } = req.data;
                
                chefs = chefs.filter((chef) => chef.id != req.body.id);

                return res.render('adminChefs/index', {
                    chefs,
                    user,
                    success: "Chefe deletado com sucesso!"
                });
            } else {
                let results = await AdminChef.find(req.body.id);
                const chef = results.rows[0];

                // get images
                results = await AdminChef.files(chef.id);
                let files = results.rows;
                files = files.map(file => ({
                    ...file,
                    src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                }));
                
                return res.render('adminChefs/edit', {
                    chef,
                    files,
                    error: "Chefes que possuem receitas, não podem ser deletados!"
                });
            };
        } catch (err) {
            console.error(err);
        };
    }
    // async delete(req, res) {
    //     try {
    //         const results = await AdminChef.chefRecipes(req.body.id);
    //         const chef = results.rows;

    //         if(!chef) return res.send("AdminChef not found!");

    //         const [ {title, recipes_id, file_id} ] = chef;

    //         if(title == null && recipes_id == null) {
    //             await AdminChef.delete(req.body.id);
    //             await FileAdminChef.delete(file_id);
    //             return res.redirect('/admin/chefs');
    //         } else {
    //             let results = await AdminChef.find(req.body.id);
    //             const chef = results.rows[0];

    //             // get images
    //             results = await AdminChef.files(chef.id);
    //             let files = results.rows;
    //             files = files.map(file => ({
    //                 ...file,
    //                 src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    //             }));
                
    //             return res.render('adminChefs/edit', {
    //                 chef,
    //                 files,
    //                 error: "Chefes que possuem receitas, não podem ser deletados!"
    //             });
    //         };
    //     } catch (err) {
    //         console.error(err);
    //     };
    // }
}
