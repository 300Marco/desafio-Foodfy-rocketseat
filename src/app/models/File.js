const db = require('../../config/db');
const Base = require('./Base');
const { unlinkSync } = require('fs')

Base.init({ table:'files' });

module.exports = {
    ...Base,
    createRecipeFiles({recipeId, fileId}) {
        const query = `
            INSERT INTO recipe_files (
                recipe_id, 
                file_id
            ) VALUES ($1, $2)
            RETURNING id
        `;
            
        values = [
            recipeId,
            fileId
        ];

        return db.query(query, values);
    },
    async deleteRecipeFiles(id) {
        try {
            let result = await db.query(`
                SELECT * FROM recipe_files
                WHERE file_id = $1
            `, [id]);

            if(result.rows[0]) {
                // get the id from recipe_files
                const recipeFilesTableId = result.rows[0].id;

                await db.query(`
                    DELETE FROM recipe_files WHERE id = $1
                `, [recipeFilesTableId]);
            };

            result = await db.query(`
                SELECT * FROM files WHERE id = $1`, [id]);
            const file = result.rows[0];

            unlinkSync(file.path);

            return db.query(`
                DELETE FROM files WHERE id = $1`, [id]);
        } catch(err) {
            console.error(err);
        };
    }
}
