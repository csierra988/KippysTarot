const express = require('express');
const router = express.Router();

const readingsController = require('../controllers/readingsController');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Readings route is working!' });
});

router.get('/reading/:id', readingsController.getReading);

router.get('/:firebase_uid', readingsController.getReadings);

router.put('/reading/:id', readingsController.saveEntry);

router.post('/', readingsController.saveReading);

module.exports = router;