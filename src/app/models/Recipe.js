const db = require('../../config/db');

module.exports = {
    all() {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            `);
        } catch(err) {
            console.error(err);
        }
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
                SELECT recipes.*, chefs.name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1`, [id]);
        } catch(err) {
            console.error(err);
        }
    },
    // find(id, callback) {
    //     db.query(`
    //         SELECT recipes.*, chefs.name
    //         FROM recipes
    //         LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    //         WHERE recipes.id = $1`, [id], (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             callback(results.rows);
    //     });
    // },
    findBy(search) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.title ILIKE '%${search}%'`);   
        } catch (err) {
            console.error(err);
        }
    },
    // findBy(search, callback) {
    //     db.query(`
    //         SELECT recipes.*, chefs.name AS chefs_name
    //         FROM recipes
    //         LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
    //         WHERE recipes.title ILIKE '%${search}%'`, (err, results) => {
    //             if(err) throw `Database Error! ${err}`;

    //             callback(results.rows);
    //         });
    // },
    totalRecipes() {
        try {
            return db.query(`
                SELECT chefs.*, count(recipes) AS total_recipes 
                FROM chefs 
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id
                ORDER BY total_recipes DESC`);
        } catch(err) {
            console.error(err);
        }
    },
    paginate(params) {
        const { search, limit, offset, callback } = params;

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`
        
        if(search) {
            filterQuery = `
                WHERE recipes.title ILIKE '%${search}%'`
            
            totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
            ) AS total`
        };

        query = `
            SELECT recipes.*, chefs.name AS chefs_name, ${totalQuery}
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            GROUP BY recipes.id, chefs.name LIMIT $1 OFFSET $2`;

        db.query(query, [limit, offset], (err, results) => {
            if(err) throw `Database Error! ${err}`;

            callback(results.rows);
        });
    },
    files(id) {
        try {
            return db.query(`
                SELECT files.*
                FROM files
                LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                WHERE recipe_files.recipe_id = $1`, [id]);
        } catch(err) {
            console.error(err);
        }
    }
}