const db = require('../../config/db');

module.exports = {
    async create({filename, path, recipeId}) {
        let query = `
            INSERT INTO files (
                name, 
                path
            ) VALUES ($1, $2)
            RETURNING id
        `

        let values = [
            filename,
            path
        ]

        const results = await db.query(query, values);
        const fileId = results.rows[0].id;
        if(recipeId) {
            query = `
                INSERT INTO recipe_files (
                    recipe_id, file_id
                ) VALUES ($1, $2)
                RETURNING id`
            
            values = [
                recipeId, 
                fileId
            ]
        }

        return db.query(query, values);
    }
}