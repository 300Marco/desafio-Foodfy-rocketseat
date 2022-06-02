const db = require('../../config/db');
const Base = require('./Base');

Base.init({ table:'recipes' });

module.exports = {
    ...Base,
    allUserRecipes(id) {
        try {
            return db.query(`
                SELECT recipes.*, chefs.name AS chefs_name
                FROM recipes
                LEFT JOIN users ON (recipes.user_id = users.id)
                LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                WHERE recipes.user_id = $1
                ORDER BY created_at DESC`, [id]);
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
    }
}

// const db = require('../../config/db');
// const fs = require('fs');

// module.exports = {
//     allUserRecipes(id) {
//         try {
//             return db.query(`
//                 SELECT recipes.*, chefs.name AS chefs_name
//                 FROM recipes
//                 LEFT JOIN users ON (recipes.user_id = users.id)
//                 LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
//                 WHERE recipes.user_id = $1
//                 ORDER BY created_at DESC`, [id]);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     all() {
//         try {
//             return db.query(`
//                 SELECT recipes.*, chefs.name AS chefs_name
//                 FROM recipes
//                 LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
//                 ORDER BY created_at DESC
//             `);
//         } catch (err) {
//             console.error(err);
//         };
//     },
//     find(id) {
//         try {
//             return db.query(`
//                 SELECT recipes.*, chefs.name AS chefs_name
//                 FROM recipes
//                 LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
//                 WHERE recipes.id = $1`, [id]);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     chefsSelectOptions() {
//         try {
//             return db.query(`SELECT name, id FROM chefs`);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     files(id) {
//         try {
//             return db.query(`
//                 SELECT files.*
//                 FROM files
//                 LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
//                 WHERE recipe_files.recipe_id = $1`, [id]);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     create(data) {
//         try {
//             const query = `
//                 INSERT INTO recipes (
//                     chef_id,
//                     title,
//                     ingredients,
//                     preparation,
//                     information,
//                     user_id
//                 ) VALUES ($1, $2, $3, $4, $5, $6)
//                 RETURNING id
//             `;

//             const values = [
//                 data.chef,
//                 data.title,
//                 data.ingredients,
//                 data.preparation,
//                 data.information,
//                 data.user_id
//             ];

//             return db.query(query, values);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     update(data) {
//         try {
//             const query = `
//                 UPDATE recipes SET
//                     chef_id=($1),
//                     title=($2),
//                     ingredients=($3),
//                     preparation=($4),
//                     information=($5)
//                 WHERE id = $6
//             `;

//             const values = [
//                 data.chef,
//                 data.title,
//                 data.ingredients,
//                 data.preparation,
//                 data.information,
//                 data.id
//             ];

//             return db.query(query, values);
//         } catch(err) {
//             console.error(err);
//         };
//     },
//     async delete(id) {
//         try {
//             let results = await db.query(`
//                 SELECT * FROM files 
//                 LEFT JOIN recipe_files ON (files.id = recipe_files.file_id)
//                 WHERE recipe_id = $1`, [id]);
        
//             let files = results.rows;
    
//             for(let file of files) {
//                 await db.query(`DELETE FROM files WHERE files.id = $1`, [file.file_id]);
//                 fs.unlinkSync(file.path);
//             };

//             return db.query(`
//                 DELETE FROM recipes WHERE recipes.id = $1`, [id]);
//         } catch(err) {
//             console.error(err);
//         };
//     }
// }