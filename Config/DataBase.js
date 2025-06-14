const mysql = require('mysql2');
const chalk = require('chalk');

// ✅ Create the connection object
const db = mysql.createConnection({
  host: 'b0hlru4zn10bbwlt4crd-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uysi3iard7aglisl',
  password: 'gRbaOI6kX9Ed3atQ5NP1',
  database: 'b0hlru4zn10bbwlt4crd'
});

// ✅ Now use the correct variable name
db.connect(err => {
  if (err) {
    console.error('❌ Error connecting to MySQL database:', err);
    return;
  }
  console.log(chalk.blue.italic.inverse('✅ Connected to MySQL database....'));
});

// ✅ Export the db object
module.exports = { db };
