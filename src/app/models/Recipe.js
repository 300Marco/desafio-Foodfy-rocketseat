const db = require('../../config/db');

module.exports = {
    all(callback) {
        db.query(`
            SELECT * FROM recipes`, (err, results) => {
            if(err) throw 'Database Error!';

            callback(results.rows);
        });
    },
    find(id, callback) {
        db.query(`
            SELECT * 
            FROM recipes
            WHERE id = $1`, [id], (err, results) => {
                if(err) throw 'Database Error!';

                callback(results.rows[0]);
        });
    }
}