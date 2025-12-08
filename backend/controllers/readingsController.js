const db = require('../db.js');

//return all of a users saved readings
exports.getReadings = async (req, res) => {
    //the primary key
    const firebase_uid = req.params.firebase_uid;

    // //making a variable to add a users firebase uid (the primary key)
    // let readingsQuery = `SELECT readings.title, readings.date FROM readings`;
    // //going to give the firebase uid to the database for the query
    // let params = [];

    // if (firebase_uid) {
    //     readingsQuery += 'WHERE readings.firebase_uid = ?';
    //     params.push(firebase_uid);
    // }

    try {
        //retrieving the title and date for the saved readings
        // const results = await db.query('SELECT readings.title, readings.date FROM readings, users WHERE readings.firebase_uid = users.firebase_uid');
        //querying(is this even a word??) using variable with params 
        const [results] = await db.query('SELECT readings.title, readings.date FROM readings WHERE firebase_uid = ?',
            [firebase_uid]
        );
        res.json(results);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//save reading to the database
exports.saveReading = async (req, res) => {
    const { firebase_uid, title, card1, card2, card3 } = req.body;
    //if somehow missing ?
    if (!firebase_uid || !title || !card1 || !card2 || !card3) {
        return res.status(400).json({ error: "missing required fields" });
    } 

    try {
        const [result] = await db.query('INSERT INTO readings (firebase_uid, title, card1, card2, card3) VALUES (?, ?, ?, ?, ?)',
            [firebase_uid, title, card1, card2, card3]
        );
    } catch (err) {
        console.error('database error: ', err);
        res.status(500).json({error: err.message});
    }
};

exports.deleteReading = () => {
    //do later after setting up history page
};