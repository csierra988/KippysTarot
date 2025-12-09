const express = require('express');
const router = express.Router();

const readingsController = require('../controllers/readingsController');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Readings route is working!' });
});

router.get('/:firebase_uid', readingsController.getReadings);

router.post('/', readingsController.saveReading);

router.get('/reading/:id', readingsController.getReading);

module.exports = router;