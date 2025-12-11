//kippys tarot database
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

//connecting to database using env
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT,
    ssl: { rejectUnauthorized: false }
});

//testing connection
// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected");
// });

module.exports = pool;