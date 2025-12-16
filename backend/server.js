const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const usersRoutes = require('./routes/usersRoutes');
const readingsRoutes = require('./routes/readingsRoutes');

const db = require('./db');

//enviroment variables
dotenv.config();
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

//initializing the app
const app = express();

//initialize authentication
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors()); //frontend requests
app.use(express.json()); //parsing json requests

app.get('/api/ping', (req, res) => {
  console.log('PING HIT');
  res.json({ ok: true });
});

//access to the database
app.use('/api/users', usersRoutes);
app.use('/api/readings', readingsRoutes);

//testing a basic request route on the root url
app.get('/', (req, res) => {
    res.send("Kippy's Tarot backend server is running");
});

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT version()');
    console.log('db connection successful')
    res.json({ version: result.rows[0].version });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});

// db.query('SELECT version()', (err, res) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('Connected to PostgreSQL:', res.rows[0].version);
//     }
// });


// //starting the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

//hosting on vercel
module.exports = app;