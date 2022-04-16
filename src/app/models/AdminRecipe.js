const db = require('../../config/db');

module.exports = {
    all() {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            `);
        } catch (err) {
            console.error(err);
        };
    },
    find(id) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    },
    chefsSelectOptions() {
        try {
            return db.query(`SELECT name, id FROM chefs`);
        } catch(err) {
            console.error(err);
        };
    },
    files(id) {
        try {
            return db.query(`
                SELECT files.*
                FROM files
                LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
                WHERE recipe_files.recipe_id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    },
    create(data) {
        try {
            const query = `
                INSERT INTO recipes (
                    chef_id,
                    title,
                    ingredients,
                    preparation,
                    information
                ) VALUES ($1, $2, $3, $4, $5)
                RETURNING id
            `;

            const values = [
                data.chef,
                data.title,
                data.ingredients,
                data.preparation,
                data.information
            ];

            return db.query(query, values);
        } catch(err) {
            console.error(err);
        };
    },
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
        };
    },
    delete(id) {
        try {
            db.query(`DELETE FROM recipes WHERE id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    }
}