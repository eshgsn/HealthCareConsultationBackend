const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/register', doctorController.register);
router.post('/login', doctorController.login);

router.get('/doctors', doctorController.getAllDoctors);

module.exports = router;
