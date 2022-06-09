const db = require('../../config/db');
const Base = require('./Base');

Base.init({ table:'chefs' });

module.exports = {
    ...Base,
    async chefRecipes(id) {
        try {
            const results = await db.query(`
                SELECT * FROM recipes 
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE chefs.id = $1`, [id]);
        
                return results.rows;
            } catch (err) {
            console.error(err);
        };
    },
    async files(id) {
        try {
            const results = await db.query(`
                SELECT chefs.*, files.path
                FROM chefs
                LEFT JOIN files ON (chefs.file_id = files.id)
                WHERE chefs.id = $1`, [id]);
            
                return results.rows;
        } catch(err) {
            console.error(err);
        };
    },
    async findRecipe(id) {
        try {
            const results = await db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.chef_id = $1
                ORDER BY created_at DESC
            `, [id]);

            return results.rows;
        } catch(err) {
            console.error(err);
        };
    },
    async filesRecipe(id) {
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
