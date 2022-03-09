const Chef = require('../models/Chef');
const FileChef = require('../models/FileChef');

module.exports = {
    async show(req, res) {
        let results = await Chef.all();
        const chefs = results.rows;

        if(!chefs) return res.send("Nenhum chef encontrado!");

        async function getAvatar(chefId) {
            let results = await Chef.files(chefId);
            const files = results.rows.map(
                file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            );

            return files[0];
        }

        const chefsPromise = chefs.map(async chef => {
            chef.img = await getAvatar(chef.id);

            return chef;
        });

        const lastAdded = await Promise.all(chefsPromise);

        return res.render('chefs/index', {chefs: lastAdded});

        // Chef.all((chefs) => {
        //     return res.render('chefs/index', {chefs});
        // });
    },
    // async show(req, res) {
    //     let files = [];
    //     let results = await Chef.all();
    //     const chefs = results.rows;

    //     results = chefs.map(chef => {
    //         FileChef.findChefId(chef.id);
    //     });
    //     const promiseChefAndFiles = await Promise.all(chefs);

    //     for(file of promiseChefAndFiles) {
    //         results = await FileChef.findFileForId(file.id);
    //         files.push(results.rows[0]);

    //         // console.log(results.rows[0])
    //         // console.log(file.rows[0].id)
    //     };

    //     files.map(file => 
    //         file.src = `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    //     );

    //     for(index in chefs) {
    //         chefs[index] = {
    //             ...chefs[index],
    //             src: files[index].src
    //         };
    //     };

    //     return res.render('chefs/index', {chefs});

    //     // Chef.all((chefs) => {
    //     //     return res.render('chefs/index', {chefs});
    //     // });
    // },
    // async show(req, res) {
    //     const results = await Chef.all();
    //     const chefs = results.rows;

    //     return res.render('chefs/index', {chefs});

    //     // Chef.all((chefs) => {
    //     //     return res.render('chefs/index', {chefs});
    //     // });
    // },
    create(req, res) {
        return res.render('chefs/create');
    },
    async details(req, res) {
        const results = await Chef.chefRecipes(req.params.id);
        const chef = results.rows;

        if(!chef) return res.send("Chef not found!");

        let recipesCount = 0;
        
        for(let count of chef) {
            if(count.title != null) {
                recipesCount = chef.length;
            } else {
                recipesCount;
            }
        }

        return res.render('chefs/details', {detail: chef, recipesCount});
    },
    // details(req, res) {
    //     Chef.chefRecipes(req.params.id, (chef) => {
    //         if(!chef) return res.send("Chef not found!");

    //         let recipesCount = 0;
            
    //         for(let count of chef) {
    //             if(count.title != null) {
    //                 recipesCount = chef.length;
    //             } else {
    //                 recipesCount;
    //             }
    //         }

    //         return res.render('chefs/details', {detail: chef, recipesCount});
    //     });
    // },
    async edit(req, res) {
        let results = await Chef.find(req.params.id);
        const chef = results.rows[0];

        if(!chef) return res.send("Chef not found!");

        // get images
        results = await Chef.files(chef.id);
        let files = results.rows;
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }));
        
        return res.render('chefs/edit', {chef, files});

        // Chef.find(req.params.id, (chef) => {
        //     if(!chef) return res.send("Chef not found!");

        //     return res.render('chefs/edit', {chef});
        // });
    },
    // METHODS HTTP
    async post(req, res) {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please fill in all fields");
            };
        };

        if(req.files.length == 0) {
            return res.send('Please, send at last one image');
        }

        const results = await Chef.create(req.body);
        const chefId = results.rows[0].id;

        // Send Image
        const filesPromise = req.files.map(file => FileChef.create({
            ...file,
            chefId
        }));
        await Promise.all(filesPromise);

        return res.redirect(`/admin/chefs/${chefId}`);
        // return res.redirect(`/admin/chefs/create`);

        // Chef.create(req.body, (chef) => {
        //     return res.redirect(`/admin/chefs/${chef.id}`);
        // });
    }, 
    // async post(req, res) {
    //     const keys = Object.keys(req.body);
        
    //     for(key of keys) {
    //         if(req.body[key] == "") {
    //             return res.send("Please fill in all fields");
    //         };
    //     };

    //     const results = await Chef.create(req.body);
    //     const chefId = results.rows[0].id;

    //     console.log(results);
    //     console.log(chefId);

    //     return res.redirect(`/admin/chefs/${chefId}`);

    //     // Chef.create(req.body, (chef) => {
    //     //     return res.redirect(`/admin/chefs/${chef.id}`);
    //     // });
    // }, 
    async put(req, res) {
        await Chef.update(req.body);
        return res.redirect(`/admin/chefs/${req.body.id}`);

        // Chef.update(req.body, () => {
        //     return res.redirect(`/admin/chefs/${req.body.id}`);
        // });
    },
    async delete(req, res) {
        const results = await Chef.chefRecipes(req.body.id);
        const chef = results.rows;

        if(!chef) return res.send("Chef not found!");

        const [ {title, recipes_id} ] = chef;

        if(title == null && recipes_id == null) {
            await Chef.delete(req.body.id);
            return res.redirect('/admin/chefs');
        } else {
            return res.send('Chefes que possuem receitas, não podem ser deletados');
        }

        // Chef.chefRecipes(req.body.id, (chef) => {
        //     if(!chef) return res.send("Chef not found!");

        //     const [ {title, recipes_id} ] = chef;

        //     if(title == null && recipes_id == null) {
        //         Chef.delete(req.body.id, () => {
        //             return res.redirect('/admin/chefs');
        //         });
        //     } else {
        //         return res.send('Chefes que possuem receitas, não podem ser deletados');
        //     };
        // });
    }
    // delete(req, res) {
    //     Chef.chefRecipes(req.body.id, (chef) => {
    //         if(!chef) return res.send("Chef not found!");

    //         const [ {title, recipes_id} ] = chef;

    //         if(title == null && recipes_id == null) {
    //             Chef.delete(req.body.id, () => {
    //                 return res.redirect('/admin/chefs');
    //             });
    //         } else {
    //             return res.send('Chefes que possuem receitas, não podem ser deletados');
    //         };
    //     });
    // }
}
