const db = require('../../config/db');
const { hash } = require('bcryptjs');

module.exports = {
    async all() {
        try {
            return db.query(`SELECT * FROM users`);
        } catch(err) {
            console.error(err);
        }
    },
    async findOne(filters) {
        try {
            let query = "SELECT * FROM users";


            // This structure does not need to be dynamic as it contains only the 'where' condition. But I will leave it this way, in case there is any additional field in the future.
            Object.keys(filters).map(key => {
                query = `${query}
                    ${key}
                `

                Object.keys(filters[key]).map(field => {
                    query = `${query} ${field} = '${filters[key][field]}'`
                });
            });

            const results = await db.query(query);
            
            return results.rows[0];
        } catch (err) {
            console.error(err);
        };
    },
    async create(data) {
        try {
            const query = `
                INSERT INTO users (
                    name,
                    email,
                    password,
                    is_admin
                ) VALUES ($1, $2, $3, $4)
                RETURNING id
            `;
            
            // let random = Math.random().toString(36).substring(0, 8);
            // let password = random.replace(/^../, "");

            let password = '123';

            // hash of password
            const passwordHash = await hash(password, 8);

            const values = [
                data.name,
                data.email,
                passwordHash,
                data.is_admin
            ];

            const results = await db.query(query, values);
            return results.rows[0].id;
        } catch(err) {
            console.error(err);
        }
    },
    async update(id, fields) {
        let query = 'UPDATE users SET';

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${fields[key]}',
                `;
            } else {
                query = `${query}
                    ${key} = '${fields[key]}'
                    WHERE id = ${id}
                `;
            };
        });

        await db.query(query);
        return;
    },
    delete(id) {
        try {
            return db.query(`
                DELETE FROM users WHERE id = $1`, [id]);
        } catch(err) {
            console.error(err);
        }
    }
}