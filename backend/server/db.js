const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "doorpaste",
    host: "35.188.252.102",
    port: "5432",
    database: "projetgodb"
});

module.exports = pool;