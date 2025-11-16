import pg from 'pg';
import dotenv from 'dotenv/config';

const { Pool } = pg;

const dbPool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

dbPool.on('error', (err, client) => {
  console.error('Unexpected error on idle database client: ', {
    message: err.message,
    stack: err.stack
  });
})

export default dbPool;