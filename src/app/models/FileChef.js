const db = require('../../config/db');
const fs = require('fs');

module.exports = {
    async create({ filename, path }) {
        try {
            let query = `
                INSERT INTO files (
                    name, 
                    path
                ) VALUES ($1, $2)
                RETURNING id
            `;

            let values = [
                filename,
                path
            ];

            // const results = await db.query(query, values);
            // const fileId = results.rows[0].id;
            // if(chefId) {
            //     query = `
            //         UPDATE chefs SET 
            //             file_id=($1)
            //         WHERE id = $2
            //     `
            //     values = [
            //         fileId,
            //         chefId
            //     ]
            // };

            return db.query(query, values);  
        } catch (err) {
            console.error(err);
        };
    },
    async delete(id) {
        try {
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
            const file = result.rows[0];

            fs.unlinkSync(file.path);

            return db.query(`DELETE FROM files WHERE id = $1`, [id]);
        } catch(err) {
            console.error(err);
        }
    }
};