const db = require('../db.js');

//getting users from database
exports.getUsers = async (req, res) => {
    try {
        const { results } = await db.query('SELECT * FROM users');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//adding user to the database
exports.addUser = async (req, res) => {
    const { firebase_uid, email, name } = req.body;

    if (!firebase_uid || !email || !name) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try{
    const { result } = await db.query('INSERT INTO users (firebase_uid, email, name) VALUES ($1, $2, $3)',
      [firebase_uid, email, name]
    );
    res.status(201).json({
      id: result.insertId,
      firebase_uid,
      email,
      name
    });
  } catch (err) {
    console.error('database error: ', err);
    res.status(500).json({ error: err.message });
  }
};