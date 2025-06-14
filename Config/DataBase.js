const mysql = require('mysql2/promise'); // ⬅️ notice 'promise'
const chalk = require('chalk');

const db = mysql.createPool({
  host: 'b0hlru4zn10bbwlt4crd-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uysi3iard7aglisl',
  password: 'gRbaOI6kX9Ed3atQ5NP1',
  database: 'b0hlru4zn10bbwlt4crd',
  waitForConnections: true,
  connectionLimit: 5, // max allowed
  queueLimit: 0
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log(chalk.green.inverse('✅ Connected to MySQL (Render-safe)'));
    connection.release();
  } catch (err) {
    console.error('❌ Connection error:', err);
  }
})();

module.exports = { db };
