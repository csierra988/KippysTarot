//kippys tarot database
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

//connecting to database using env
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//testing connection
// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected");
// });

module.exports = pool;