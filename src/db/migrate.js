require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const migrate = async () => {
    const client = await pool.connect()
    try {
        console.log('Connecting to:', process.env.DB_HOST, '/', process.env.DB_DATABASE)

        await client.query(`
            CREATE TABLE IF NOT EXISTS "favorite" (
                id      VARCHAR PRIMARY KEY,
                title   VARCHAR NOT NULL,
                author  VARCHAR,
                image   VARCHAR
            )
        `)

        console.log('Migration selesai: tabel "favorite" siap.')
    } catch (err) {
        console.error('Migration gagal:', err.message)
        process.exit(1)
    } finally {
        client.release()
        await pool.end()
    }
}

migrate()
