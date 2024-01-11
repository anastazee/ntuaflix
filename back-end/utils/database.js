const mysql = require('mysql2');
const env = require('dotenv');

/* create connection and export it */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB || 'softeng',
});

module.exports = { pool };