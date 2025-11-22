const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//import routes after adding them in later

//enviroment variables
dotenv.config();

//initializing the app
const app = express();

//maybe add authentication later

app.use(cors()); //frontend requests
app.use(express.json()); //parsing json requests

//testing a basic request route on the root url
app.get('/', (req, res) => {
    res.send("Kippy's Tarot backend server is running");
});

//starting the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});