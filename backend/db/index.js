const { Pool } = require('pg');
require('dotenv/config');

const poolConfig = process.env.DB_CONNECTION ? {
    connectionString: process.env.DB_CONNECTION,
} : {
    user: "postgres",
    password: "doorpaste",
    host: "35.188.252.102",
    port: "5432",
    database: "projetgodb"
};
const pool = new Pool(poolConfig);

module.exports = pool; 