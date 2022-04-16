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
        };
    },
    find(id) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    },
    totalRecipes() {
        try {
            return db.query(`
                SELECT chefs.*, count(recipes) AS total_recipes 
                FROM chefs 
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id
                ORDER BY total_recipes DESC
            `);
        } catch(err) {
            console.error(err);
        };
    },
    paginate(params) {
        try {
            const { search, limit, offset } = params;

            let query = "",
                filterQuery = "",
                totalQuery = `(
                    SELECT count(*) FROM recipes
                ) AS total`;
            
            if(search) {
                filterQuery = `
                    WHERE recipes.title ILIKE '%${search}%'`;
                
                totalQuery = `(
                    SELECT count(*) FROM recipes
                    ${filterQuery}
                ) AS total`;
            };

            query = `
                SELECT recipes.*, chefs.name AS chefs_name, ${totalQuery}
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ${filterQuery}
                GROUP BY recipes.id, chefs.name LIMIT $1 OFFSET $2`;

            return db.query(query, [limit, offset]);
        } catch (err) {
            console.error(err);
        };
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
        };
    },
    chefFiles(id) {
        try {
            return db.query(`
                SELECT chefs.*, files.path
                FROM chefs
                LEFT JOIN files ON (chefs.file_id = files.id)
                WHERE chefs.id = $1`, [id]);
        } catch (err) {
            console.error(err);
        };
    }
}