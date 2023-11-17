const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DBConnLink,
    ssl:{
        rejectUnauthorized: false
    }
});

module.exports = pool;