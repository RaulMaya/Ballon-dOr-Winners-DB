// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Mykons#1995',
    database: 'ballon_dor_db'
  },
  console.log(`Connected to the ballon_dor_db database.`)
);

module.exports = db;
