const mysql = require('mysql2');
const chalk = require('chalk');

// ✅ Create a connection pool
const db = mysql.createPool({
  host: 'b0hlru4zn10bbwlt4crd-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uysi3iard7aglisl',
  password: 'gRbaOI6kX9Ed3atQ5NP1',
  database: 'b0hlru4zn10bbwlt4crd',
  waitForConnections: true,
  connectionLimit: 5,  // max from Clever Cloud free plan
  queueLimit: 0
});

// ✅ Test a connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL database:', err);
    return;
  }
  console.log(chalk.blue.italic.inverse('✅ Connected to MySQL database (via pool)...'));
  connection.release(); // Always release!
});

module.exports = { db };
