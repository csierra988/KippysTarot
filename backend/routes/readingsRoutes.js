const express = require('express');
const router = express.Router();

const readingsController = require('../controllers/readingsController');

router.get('/reading/:id', readingsController.getReading);

router.get('/:firebase_uid', readingsController.getReadings);

router.put('/reading/:id', readingsController.saveEntry);

router.post('/', readingsController.saveReading);

router.delete('/:id', readingsController.deleteReading);

module.exports = router;