const Base = require('./Base');

Base.init({ table:'users' });

module.exports = {
    ...Base,
}


// const db = require('../../config/db');
// const { hash } = require('bcryptjs');
// const fs = require('fs');
// module.exports = {
//     async all() {
//         try {
//             return db.query(`SELECT * FROM users ORDER BY users.created_at DESC`);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     async findOne(filters) {
//         try {
//             let query = "SELECT * FROM users";

//             // This structure does not need to be dynamic as it contains only the 'where' condition. But I will leave it this way, in case there is any additional field in the future.
//             Object.keys(filters).map(key => {
//                 query = `${query}
//                     ${key}
//                 `;

//                 Object.keys(filters[key]).map(field => {
//                     query = `${query} ${field} = '${filters[key][field]}'`
//                 });
//             });

//             const results = await db.query(query);
            
//             return results.rows[0];
//         } catch (err) {
//             console.error(err);
//         };
//     },
//     async create(data, password) {
//         try {
//             const query = `
//                 INSERT INTO users (
//                     name,
//                     email,
//                     password,
//                     is_admin
//                 ) VALUES ($1, $2, $3, $4)
//                 RETURNING id
//             `;

//             // hash of password
//             const passwordHash = await hash(password, 8);

//             const values = [
//                 data.name,
//                 data.email,
//                 passwordHash,
//                 data.is_admin
//             ];

//             const results = await db.query(query, values);
//             return results.rows[0].id;
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     async update(id, fields) {
//         let query = 'UPDATE users SET';

//         Object.keys(fields).map((key, index, array) => {
//             if((index + 1) < array.length) {
//                 query = `${query}
//                     ${key} = '${fields[key]}',
//                 `;
//             } else {
//                 query = `${query}
//                     ${key} = '${fields[key]}'
//                     WHERE id = ${id}
//                 `;
//             };
//         });

//         await db.query(query);
//         return;
//     },
//     async delete(id) {
//         try {
//             let results = await db.query(`
//                 SELECT recipes.*
//                 FROM recipes 
//                 LEFT JOIN users ON (users.id = recipes.user_id)
//                 WHERE users.id = $1`, [id]);

//             let recipes = results.rows;
//             let files = '';

//             for(let recipe of recipes) {
//                 results = await db.query(`
//                     SELECT * FROM files 
//                     LEFT JOIN recipe_files ON (files.id = recipe_files.file_id )
//                     WHERE recipe_id = $1
//                 `, [recipe.id]);

//                 files = results.rows;

//                 for(let file of files) {
//                     await db.query(`DELETE FROM files WHERE files.id = $1`, [file.file_id]);
//                     fs.unlinkSync(file.path);
//                 };
//             };

//             return db.query(`
//                 DELETE FROM users WHERE id = $1`, [id]);
//         } catch(err) {
//             console.error(err);
//         };
//     }
// }