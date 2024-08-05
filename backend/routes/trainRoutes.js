const express = require('express');
const { addTrain, getAvailability,searchTrains,getTrainById } = require('../controllers/trainController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, addTrain);
router.get('/availability', getAvailability);
router.get('/search', searchTrains);
router.get('/:id', getTrainById);

module.exports = router;
