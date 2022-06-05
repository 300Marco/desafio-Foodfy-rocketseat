const db = require('../../config/db');
const Base = require('./Base');

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
        // return results.rows;
    }
}

// const db = require('../../config/db');
// const fs = require('fs');

// module.exports = {
//     async create({filename, path, recipeId}) {
//         try {
//             let query = `
//                 INSERT INTO files (
//                     name, 
//                     path
//                 ) VALUES ($1, $2)
//                 RETURNING id
//             `;

//             let values = [
//                 filename,
//                 path
//             ];

//             const results = await db.query(query, values);
//             const fileId = results.rows[0].id;
//             if(recipeId) {
//                 query = `
//                     INSERT INTO recipe_files (
//                         recipe_id, 
//                         file_id
//                     ) VALUES ($1, $2)
//                     RETURNING id
//                 `;
                
//                 values = [
//                     recipeId,
//                     fileId
//                 ];
//             };

//             return db.query(query, values);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     async delete(id) {
//         try {
//             let result = await db.query(`
//                 SELECT * FROM recipe_files
//                 WHERE file_id = $1
//             `, [id]);

//             if(result.rows[0]) {
//                 // get the id from recipe_files
//                 const recipeFilesTableId = result.rows[0].id;

//                 await db.query(`
//                     DELETE FROM recipe_files WHERE id = $1
//                 `, [recipeFilesTableId]);
//             };

//             result = await db.query(`
//                 SELECT * FROM files WHERE id = $1`, [id]);
//             const file = result.rows[0];

//             fs.unlinkSync(file.path);

//             return db.query(`
//                 DELETE FROM files WHERE id = $1`, [id]);
//         } catch(err) {
//             console.error(err);
//         };
//     }
// }