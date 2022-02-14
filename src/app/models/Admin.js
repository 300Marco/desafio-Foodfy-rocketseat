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
    create(data) {
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
    find(id) {
        return db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id]
        );
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
    update(data) {
        const query = `
            UPDATE recipes SET
                image=($1),
                title=($2),
                ingredients=($3),
                preparation=($4),
                information=($5),
                chef_id=($6)
            WHERE id = $7
        `;

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id
        ];

        return db.query(query, values);
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
        db.query(`DELETE FROM recipes WHERE id = $1`, [id])
    },
    // delete(id, callback) {
    //     db.query(`
    //         DELETE FROM recipes
    //         WHERE id = $1`, [id], (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             return callback();
    //     });
    // },
    chefsSelectOptions() {
        return db.query(`SELECT name, id FROM chefs`);
    }
    // chefsSelectOptions(callback) {
    //     db.query(`
    //         SELECT name, id
    //         FROM chefs`, (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             callback(results.rows);
    //         });
    // }
}