const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-key.json');

const usersRoutes = require('./routes/usersRoutes');
const readingsRoutes = require('./routes/readingsRoutes');

//enviroment variables
dotenv.config();

//initializing the app
const app = express();

//initialize authentication
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.use(cors()); //frontend requests
app.use(express.json()); //parsing json requests

//access to the database
app.use('/users', usersRoutes);
app.use('/readings', readingsRoutes);

//testing a basic request route on the root url
app.get('/', (req, res) => {
    res.send("Kippy's Tarot backend server is running");
});

//starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});