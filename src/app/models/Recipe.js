const db = require('../../config/db');

module.exports = {
    all(callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        `, (err, results) => {
                if(err) throw `Database Error! ${err}`;

                callback(results.rows);
        });
    },
    find(id, callback) {
        db.query(`
            SELECT recipes.*, chefs.name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], (err, results) => {
                if(err) throw `Database Error! ${err}`;

                callback(results.rows);
        });
    },
    findBy(search, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${search}%'`, (err, results) => {
                if(err) throw `Database Error! ${err}`;

                callback(results.rows);
            });
    },
    totalRecipes(callback) {
        db.query(`
            SELECT chefs.*, count(recipes) AS total_recipes 
            FROM chefs 
            LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
            GROUP BY chefs.id
            ORDER BY total_recipes DESC`, (err, results) => {
                if(err) throw `Database Error! ${err}`;
                
                callback(results.rows);
        });
    },
    paginate(params) {
        const { search, limit, offset, callback } = params;

        let query = `
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`
        
        if(search) {
            query = `${query}
                WHERE recipes.title ILIKE '%${search}%'`
        };

        query = `${query}
        GROUP BY recipes.id, chefs.name LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], (err, results) => {
            if(err) throw `Database Error! ${err}`;

            callback(results.rows);
        });
    }
}