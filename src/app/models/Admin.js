const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all() {
        return db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        `);
    },
    // all(callback) {
    //     db.query(`
    //         SELECT recipes.*, chefs.name AS chefs_name
    //         FROM recipes
    //         LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    //     `, (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             callback(results.rows);
    //     });
    // },
    find(id) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1`, [id]
            );
        } catch(err) {
            console.error(err);
        }
    },
    // find(id, callback) {
    //     db.query(`
    //         SELECT recipes.*, chefs.name AS chefs_name
    //         FROM recipes
    //         LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    //         WHERE recipes.id = $1`, [id], (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             callback(results.rows[0]);
    //     });
    // },
    chefsSelectOptions() {
        try {
            return db.query(`SELECT name, id FROM chefs`);
        } catch(err) {
            console.error(err);
        }
    },
    // chefsSelectOptions(callback) {
    //     db.query(`
    //         SELECT name, id
    //         FROM chefs`, (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             callback(results.rows);
    //         });
    // }
    files(id) {
        try {
            return db.query(`
                SELECT files.*
                FROM files
                LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
                WHERE recipe_files.recipe_id = $1`, [id]);
        } catch(err) {
            console.error(err);
        }
    },
    create(data) {
        try {
            const query = `
                INSERT INTO recipes (
                    chef_id,
                    title,
                    ingredients,
                    preparation,
                    information,
                    created_at
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id
            `;

            const values = [
                data.chef,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                date(Date.now()).iso
            ];

            return db.query(query, values);
        } catch(err) {
            console.error(err);
        }

        // Conceito antigo
        // const query = `
        //     INSERT INTO recipes (
        //         image,
        //         title,
        //         ingredients,
        //         preparation,
        //         information,
        //         chef_id,
        //         created_at
        //     ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        //     RETURNING id
        // `;

        // const values = [
        //     data.image,
        //     data.title,
        //     data.ingredients,
        //     data.preparation,
        //     data.information,
        //     data.chef,
        //     date(Date.now()).iso
        // ];

        // db.query(query, values, (err, results) => {
        //     if(err) throw `Database Error! ${err}`;

        //     callback(results.rows[0]);
        // });
    },
    // create(data) {
    //     const query = `
    //         INSERT INTO recipes (
    //             chef_id,
    //             title,
    //             ingredients,
    //             preparation,
    //             information,
    //             created_at
    //         ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    //         RETURNING id
    //     `;

    //     const values = [
    //         data.image,
    //         data.title,
    //         data.ingredients,
    //         data.preparation,
    //         data.information,
    //         data.chef,
    //         date(Date.now()).iso
    //     ];

    //     return db.query(query, values);



    //     // Conceito antigo
    //     // const query = `
    //     //     INSERT INTO recipes (
    //     //         image,
    //     //         title,
    //     //         ingredients,
    //     //         preparation,
    //     //         information,
    //     //         chef_id,
    //     //         created_at
    //     //     ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    //     //     RETURNING id
    //     // `;

    //     // const values = [
    //     //     data.image,
    //     //     data.title,
    //     //     data.ingredients,
    //     //     data.preparation,
    //     //     data.information,
    //     //     data.chef,
    //     //     date(Date.now()).iso
    //     // ];

    //     // db.query(query, values, (err, results) => {
    //     //     if(err) throw `Database Error! ${err}`;

    //     //     callback(results.rows[0]);
    //     // });
    // },
    update(data) {
        try {
            const query = `
                UPDATE recipes SET
                    chef_id=($1),
                    title=($2),
                    ingredients=($3),
                    preparation=($4),
                    information=($5)
                WHERE id = $6
            `;

            const values = [
                data.chef,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                data.id
            ];

            return db.query(query, values);
        } catch(err) {
            console.error(err);
        }
    }, 
    // update(data, callback) {
    //     const query = `
    //         UPDATE recipes SET
    //             image=($1),
    //             title=($2),
    //             ingredients=($3),
    //             preparation=($4),
    //             information=($5),
    //             chef_id=($6)
    //         WHERE id = $7
    //     `;

    //     const values = [
    //         data.image,
    //         data.title,
    //         data.ingredients,
    //         data.preparation,
    //         data.information,
    //         data.chef,
    //         data.id
    //     ];

    //     db.query(query, values, (err, results) => {
    //         if(err) throw `Database Error! ${err}`;

    //         callback();
    //     });
    // },
    delete(id) {
        try {
            db.query(`DELETE FROM recipes WHERE id = $1`, [id])
        } catch(err) {
            console.error(err);
        }
    }
    // delete(id, callback) {
    //     db.query(`
    //         DELETE FROM recipes
    //         WHERE id = $1`, [id], (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             return callback();
    //     });
    // }
}