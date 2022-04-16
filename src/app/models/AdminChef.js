const db = require('../../config/db');

module.exports = {
    all() {
        try {
            return db.query(`SELECT * FROM chefs`);
        } catch (err) {
            console.error(err);
        };
    },
    // create(data) {
    //     try {
    //         const query = `
    //             INSERT INTO chefs (
    //                 file_id,
    //                 name
    //             ) VALUES ($1, $2)
    //             RETURNING id
    //         `;

    //         const values = [
    //             data.fileId,
    //             data.name
    //         ];

    //         return db.query(query, values);
    //     } catch(err) {
    //         console.error(err);
    //     };
    // },
    create(data, file_id) {
        try {
            const query = `
                INSERT INTO chefs (
                    name,
                    file_id
                ) VALUES ($1, $2)
                RETURNING id
            `;

            const values = [
                data.name,
                file_id
            ];

            return db.query(query, values);
        } catch(err) {
            console.error(err);
        };
    },
    find(id) {
        try {
            return db.query(`
                SELECT * FROM chefs WHERE id = $1`, [id]);
        } catch (err) {
            console.error(err);
        };
    },
    // update(data) {
    //     try {
    //         const query = `
    //             UPDATE chefs SET
    //                 name=($1),
    //                 file_id=($2)
    //             WHERE id = $3
    //         `;

    //         const values = [
    //             data.name,
    //             data.file_id,
    //             data.id
    //         ];

    //         return db.query(query, values);
    //     } catch (err) {
    //         console.error(err);
    //     };
    // },
    update(data, file_id) {
        try {
            const query = `
                UPDATE chefs SET
                    name=($1),
                    file_id=($2)
                WHERE id = $3
            `;

            const values = [
                data.name,
                file_id,
                data.id
            ];

            return db.query(query, values);
        } catch (err) {
            console.error(err);
        };
    },
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
        };
    },
    files(id) {
        try {
            return db.query(`
                SELECT chefs.*, files.path
                FROM chefs
                LEFT JOIN files ON (chefs.file_id = files.id)
                WHERE chefs.id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    },
    findRecipe(id) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.chef_id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    },
    filesRecipe(id) {
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
    delete(id) {
        try {
            return db.query(`
                DELETE FROM chefs WHERE id = $1`, [id]);  
        } catch (err) {
            console.error(err);
        };
    }
}