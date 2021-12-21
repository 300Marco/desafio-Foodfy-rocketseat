const db = require('../../config/db');

module.exports = {
    all(callback) {
        db.query(`
            SELECT * FROM recipes
        `, (err, results) => {
            if(err) throw 'Database Error!';

            callback(results.rows);
        });
    }
}