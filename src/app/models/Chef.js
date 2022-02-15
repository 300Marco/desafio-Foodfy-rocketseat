const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all() {
        try {
            return db.query(`SELECT * FROM chefs`);
        } catch (err) {
            console.error(err);
        }
    },
    create(data) {
        try {
            const query = `
                INSERT INTO chefs (
                    name,
                    avatar_url,
                    created_at
                ) VALUES ($1, $2, $3)
                RETURNING id
            `;

            const values = [
                data.name,
                data.avatar_url,
                date(Date.now()).iso
            ];

            return db.query(query, values);
        } catch(err) {
            console.error(err);
        }
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
        return db.query(`
            SELECT *
            FROM chefs
            WHERE id = $1`, [id]);
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
                    name=($1),
                    avatar_url=($2)
                WHERE id = $3
            `;

            const values = [
                data.name,
                data.avatar_url,
                data.id
            ];

            return db.query(query, values);
        } catch (err) {
            console.error(err);
        }
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
        return db.query(`
            DELETE FROM chefs
            WHERE id = $1`, [id]);
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
        }
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
}