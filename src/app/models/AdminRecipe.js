const db = require('../../config/db');
const Base = require('./Base');

Base.init({ table:'recipes' });

module.exports = {
    ...Base,
    async allUserRecipes(id) {
        try {
            const results = await db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN users ON (recipes.user_id = users.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.user_id = $1
                ORDER BY created_at DESC`, [id]);

            return results.rows;
        } catch(err) {
            console.error(err);
        };
    },
    async chefsSelectOptions() {
        try {
            const results = await db.query(`SELECT name, id FROM chefs`);

            return results.rows;
        } catch(err) {
            console.error(err);
        };
    },
    async files(id) {
        try {
            const results = await db.query(`
                SELECT files.*
                FROM files
                LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
                WHERE recipe_files.recipe_id = $1`, [id]);
            
            return results.rows;
        } catch(err) {
            console.error(err);
        };
    }
}
