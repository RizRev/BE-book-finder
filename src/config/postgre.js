const { Pool } = require('pg')
const pool = new Pool({
    user: 'ptiszeex',
    host: 'rosie.db.elephantsql.com',
    database: 'ptiszeex',
    password: 'pRwfTBWx0yZACYmdG5EoAyopFwuwzebL',
    port: 5432,
})

module.exports = pool