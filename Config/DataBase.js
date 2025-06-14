const mysql = require('mysql2');
const chalk = require('chalk');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
   PORT:  process.env.DB_PORT
});


db.connect(err => {
    if (err) {
        console.error('❌ Error connecting to MySQL database :', err);
        return;
    }
    console.log(chalk.blue.italic.inverse('✅ Connected to MySQL database....'));
});

module.exports = { db };
