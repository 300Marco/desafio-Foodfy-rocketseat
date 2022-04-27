const db = require('../../config/db');

module.exports = {
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
    }
}