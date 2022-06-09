const db = require('../../config/db');

function find(filters, table) {
    try {
        let query = '';
        if(table == 'recipes') {
            if(filters) {
                // page details
                let id = filters.where.id;
                filters = undefined;
                query = `
                    SELECT ${table}.*, chefs.name
                    FROM ${table}
                    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                    WHERE recipes.id = ${id}
                `;
            } else {
                query = `
                    SELECT ${table}.*, chefs.name AS chefs_name 
                    FROM ${table}
                    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                    ORDER BY created_at DESC
                `;
            };
        } else {
            query = `SELECT * FROM ${table}`;
        };

        if(filters) {
            Object.keys(filters).map(key => {
                query = `${query}
                    ${key}
                `;
    
                Object.keys(filters[key]).map(field => {
                    query = `${query} ${field} = '${filters[key][field]}'`
                });
            });
        };

        return db.query(query);
    } catch (err) {
        console.error(err);
    };
}
const Base = {
    init({ table }) {
        if(!table) throw new Error('Invalid Params');

        this.table = table;

        return this;
    },
    async findAll(filters) {
        const results = await find(filters, this.table);
        
        return results.rows;
    },
    async find(id) {
        const results = await find({ where: {id} }, this.table);

        return results.rows[0];
    },
    async findOne(filters) {
        try {
            const results = await find(filters, this.table);
        
            return results.rows[0];
        } catch (err) {
            console.error(err);
        };
    },
    async create(fields) {
        try {
            let keys = [],
                values = [];

            Object.keys(fields).map(key => {
                keys.push(key);
                if(key == 'ingredients') {
                    values.push(`'{${fields[key]}}'`);
                } else if(key == 'preparation') {
                    values.push(`'{${fields[key]}}'`);
                } else {
                    values.push(`'${fields[key]}'`);
                };
            });
            
            const query = `
                INSERT INTO ${this.table} (
                    ${keys.join(',')}
                ) VALUES (${values.join(',')})
                RETURNING id
            `;

            const results = await db.query(query);
            return results.rows[0].id;
        } catch(err) {
            console.error(err);
        };
    },
    update(id, fields) {
        try {
            let update = [];

            Object.keys(fields).map(key => {
                let line = `${key} = '${fields[key]}'`;
                if(line.includes('ingredients')) {
                    line = `${key} = '{${fields[key]}}'`;
                } else if(line.includes('preparation')) {
                    line = `${key} = '{${fields[key]}}'`;
                }

                update.push(line);
            });

            let query = `
            UPDATE ${this.table} SET
                ${update.join(',')}
            WHERE id = ${id}
            `;

            return db.query(query);
        } catch (err) {
            console.error(err);
        };
    },
    delete(id) {
        return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    }
}

module.exports = Base;