const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all() {
        try {
            return db.query(`SELECT * FROM chefs`);
        } catch (err) {
            console.error(err);
        };
    },
    create(data) {
        try {
            const query = `
                INSERT INTO chefs (
                    file_id,
                    name,
                    created_at
                ) VALUES ($1, $2, $3)
                RETURNING id
            `;

            const values = [
                data.fileId,
                data.name,
                date(Date.now()).iso
            ];

            return db.query(query, values);
        } catch(err) {
            console.error(err);
        };
    },
    // create(data, callback) {
    //     const query = `
    //         INSERT INTO chefs (
    //             name,
    //             avatar_url,
    //             created_at
    //         ) VALUES ($1, $2, $3)
    //         RETURNING id
    //     `;

    //     const values = [
    //         data.name,
    //         data.avatar_url,
    //         date(Date.now()).iso
    //     ];

    //     db.query(query, values, (err, results) => {
    //         if(err) throw `Database Error! ${err}`;

    //         callback(results.rows[0]);
    //     });
    // },
    find(id) {
        try {
            return db.query(`
                SELECT *
                FROM chefs
                WHERE id = $1`, [id]);
        } catch (err) {
            console.error(err);
        };
    },
    // find(id, callback) {
    //     db.query(`
    //         SELECT *
    //         FROM chefs
    //         WHERE id = $1`, [id], (err, results) => {
    //             if(err) throw `Database Error! ${err}`;
                
    //             callback(results.rows[0]);
    //     });
    // },
    update(data) {
        try {
            const query = `
                UPDATE chefs SET
                    file_id=($1),
                    name=($2),
                WHERE id = $3
            `;

            const values = [
                data.file_id,
                data.name,
                data.id
            ];

            return db.query(query, values);
        } catch (err) {
            console.error(err);
        };
    },
    // update(data, callback) {
    //     const query = `
    //         UPDATE chefs SET
    //             name=($1),
    //             avatar_url=($2)
    //         WHERE id = $3
    //     `;

    //     const values = [
    //         data.name,
    //         data.avatar_url,
    //         data.id
    //     ];

    //     db.query(query, values, (err, results) => {
    //         if(err) throw `Database Error! ${err}`;

    //         callback();
    //     });
    // },
    delete(id) {
        try {
            return db.query(`
                DELETE FROM chefs
                WHERE id = $1`, [id]);  
        } catch (err) {
            console.error(err);
        };
    },
    // delete(id, callback) {
    //     db.query(`
    //         DELETE FROM chefs
    //         WHERE id = $1`, [id], (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             return callback();
    //     });
    // },
    chefRecipes(id) {
        try {
            return db.query(`
                SELECT chefs.*, recipes.title, recipes.id AS
                recipes_id
                FROM chefs
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                WHERE chefs.id = $1`, [id]);
        } catch (err) {
            console.error(err);
        };
    },
    // chefRecipes(id, callback) {
        
    //     db.query(`
    //         SELECT chefs.*, recipes.title, recipes.id AS recipes_id
    //         FROM chefs
    //         LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    //         WHERE chefs.id = $1`, [id], (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             callback(results.rows);
    //     });

    //     // NÃO EXISTE MAIS O CAMPO DE IMAGEM E RECIPE
    //     // db.query(`
    //     //     SELECT chefs.*, recipes.title, recipes.image, recipes.id AS recipes_id
    //     //     FROM chefs
    //     //     LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    //     //     WHERE chefs.id = $1`, [id], (err, results) => {
    //     //         if(err) throw `Database Error! ${err}`;

    //     //         callback(results.rows);
    //     // });

    //     // Não remover no momento.
    //     // db.query(`
    //     //     SELECT recipes.*, chefs.name, chefs.avatar_url
    //     //     FROM recipes
    //     //     LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    //     //     WHERE chefs.id = $1`, [id], (err, results) => {
    //     //         if(err) throw `Database Error! ${err}`;

    //     //         callback(results.rows);
    //     // });
    // }
    files(id) {
        try {
            return db.query(`
                SELECT chefs.*, files.path
                FROM chefs
                LEFT JOIN files ON (chefs.file_id = files.id)
                WHERE chefs.id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    },
    // filesRecipes(id) {
    //     try {
    //         return db.query(`
    //             SELECT files.*
    //             FROM files
    //             LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
    //             WHERE recipe_files.recipe_id = $1`, [id]);
    //     } catch(err) {
    //         console.error(err);
    //     }
    // },
    // findRecipe(id) {
    //     try {
    //         return db.query(`
    //             SELECT recipes.title, recipes.id AS
    //             recipes_id
    //             FROM recipes
    //             LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    //             WHERE recipes.chef_id = $1`, [id]);
    //     } catch(err) {
    //         console.error(err);
    //     }
    // },


    //TESTES
    findRecipe(id) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.chef_id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    },
    filesRecipe(id) {
        try {
            return db.query(`
                SELECT files.*
                FROM files
                LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
                WHERE recipe_files.recipe_id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    }
}