const { Pool } = require('pg');

// module.exports = new Pool({
//     user: 'postgres',
//     password:'',
//     host: 'localhost',
//     port: 5432,
//     database: 'foodfy'
// });
module.exports = new Pool({
    user: 'nzifnglxowvmzz',
    password:'eafd9d43f5dab4ec14049ce21e7993672e45adf2f40bd0e885b299aad35b69df',
    host: 'ec2-52-71-23-11.compute-1.amazonaws.com',
    port: 5432,
    database: 'd7v44i3df8e4gc',
    ssl: {      /* <----- Add SSL option */
        require: true, // talvez tire
        rejectUnauthorized: false 
    }
});
