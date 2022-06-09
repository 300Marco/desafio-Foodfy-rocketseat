const db = require('../../config/db');
const Base = require('./Base');

Base.init({ table:'recipes' });

module.exports = {
    ...Base,
    async totalRecipes() {
        try {
            const results = await db.query(`
                SELECT chefs.*, count(recipes) AS total_recipes 
                FROM chefs 
                LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
                GROUP BY chefs.id
                ORDER BY total_recipes DESC
            `);

            return results.rows;
        } catch(err) {
            console.error(err);
        };
    },
    async paginate(params) {
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
                ORDER BY updated_at DESC LIMIT $1 OFFSET $2`;

            const results = await db.query(query, [limit, offset]);
            return results.rows;
        } catch (err) {
            console.error(err);
        };
    },
    async files(id) {
        try {
            const results = await db.query(`
                SELECT files.*
                FROM files
                LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
                WHERE recipe_files.recipe_id = $1`, [id]);
            
                return results.rows;
        } catch(err) {
            console.error(err);
        };
    },
    async chefFiles(id) {
        try {
            const results = await db.query(`
                SELECT chefs.*, files.path
                FROM chefs
                LEFT JOIN files ON (chefs.file_id = files.id)
                WHERE chefs.id = $1`, [id]);

            return results.rows;
        } catch (err) {
            console.error(err);
        };
    }
}
