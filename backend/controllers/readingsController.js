const db = require('../db.js');

//return all of a users saved readings
exports.getReadings = async (req, res) => {
    //the primary key
    const firebase_uid = req.params.firebase_uid;

    try {
        //retrieving the title and date for the saved readings
        // const rows = await db.query('SELECT readings.title, readings.date FROM readings, users WHERE readings.firebase_uid = users.firebase_uid');
        //querying(is this even a word??) using variable with params 
        const { rows } = await db.query('SELECT readings.id, readings.title, readings.date FROM readings WHERE firebase_uid = $1',
            [firebase_uid]
        );
        res.json(rows);

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
        const { rows } = await db.query('INSERT INTO readings (firebase_uid, title, card1, card2, card3) VALUES ($1, $2, $3, $4, $5)',
            [firebase_uid, title, card1, card2, card3]
        );
        res.status(201).json({ 
            message: 'reading saved successfully',
            id: rows[0].id
        });
    } catch (err) {
        console.error('database error: ', err);
        res.status(500).json({error: err.message});
    }
};

//gets a single reading by its reading id
exports.getReading = async (req, res) => {
    const reading_id = req.params.id;
    const firebase_uid = req.query.firebase_uid;

    try {
        const { rows } = await db.query('SELECT * FROM readings WHERE firebase_uid = $1 AND id = $2',
            [firebase_uid, reading_id]
        );
        //returning the one reading
        res.json(rows[0]);
    } catch (err) {
        console.error('database error: ', err);
        res.status(500).json({error: err.message});
    }

};

//saving/updating a journal entry
exports.saveEntry = async () => {

};

exports.deleteReading = () => {
    //do later after setting up history page
};