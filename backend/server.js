const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const serverless = require('serverless-http');

const usersRoutes = require('./routes/usersRoutes');
const readingsRoutes = require('./routes/readingsRoutes');

//enviroment variables
dotenv.config();
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
// let serviceAccount = JSON.stringify(process.env.FIREBASE_SERVICE_KEY);
// serviceAccount = JSON.parse(serviceAccount);

//initializing the app
const app = express();

//initialize firebase only when needed
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
}

app.use(cors()); //frontend requests
app.use(express.json()); //parsing json requests

//access to the database
app.use('/users', usersRoutes);
app.use('/readings', readingsRoutes);

//testing a basic request route on the root url
app.get('/', (req, res) => {
    res.send("Kippy's Tarot backend server is running");
});

// //starting the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

//hosting on vercel
const handler = serverless(app);
module.exports = handler;