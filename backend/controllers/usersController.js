const db = require('../db.js');

// //getting users from database
// exports.getUsers = async (req, res) => {
//     try {
//         const { rows } = await db.query('SELECT * FROM users');
//         res.json(rows);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

//adding user to the database
exports.addUser = async (req, res) => {
    const { firebase_uid, name } = req.body;

    if (!firebase_uid || !name) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try{
    const { rows } = await db.query('INSERT INTO users (firebase_uid, name) VALUES ($1, $2) RETURNING *',
      [firebase_uid, name]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('database error: ', err);
    res.status(500).json({ error: err.message });
  }
};

//updating email and name for user in db
exports.updateUser = async (req, res) => {
    const firebase_uid = req.params.firebase_uid;
    const {name} = req.body;

    if (!name) {
      return res.status(400).json({error: "missing required fields"});
    }

    try {
      const { rows } = await db.query('UPDATE users SET name = $1 WHERE firebase_uid = $2 RETURNING *',
        [name, firebase_uid]
      );
      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error('db error: ', err);
      res.status(500).json({error: err.message});
    }
};

//deletes user (and their readings through cascade) from db
exports.deleteUser = async (req, res) => {
    const firebase_uid = req.params.firebase_uid;
    try {
      const { rowCount } = await db.query('DELETE FROM users WHERE firebase_uid = $1', 
        [firebase_uid]);
      
      //making sure user was deleted
      if (rowCount === 0) {
        return res.status(404).json({error: 'user not found'});
      }

      return res.status(200).json({message: "user successfully deleted"});

    } catch (err) {
        console.error('db error: ', err);
        res.status(500).json({error: err.message});
    }

};