const db = require('../../config/db');

module.exports = {
    all(callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        `, (err, results) => {
                if(err) throw 'Database Error!';

                callback(results.rows);
        });
    },
    find(id, callback) {
        db.query(`
            SELECT recipes.*, chefs.name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], (err, results) => {
                if(err) throw 'Database Error!';

                callback(results.rows);
        });
    },
    findBy(search, callback) {
        db.query(`
            SELECT recipes.*, chefs.name AS chefs_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.title ILIKE '%${search}%'`, (err, results) => {
                if(err) throw 'Database Error!';

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
                if(err) throw 'Database Error!';
                
                callback(results.rows);
        });
    }
}