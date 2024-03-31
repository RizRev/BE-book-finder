const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: '202.10.36.151',
    database: 'book-finder',
    password: 'postgres',
    port: 5432,
})

module.exports = pool