// doctorroutes
const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/register', doctorController.register);
router.post('/login', doctorController.login);

router.get('/doctors', doctorController.getAllDoctors);

router.get('/verify-email/:token', doctorController.verifyEmail);

// Add the verify email route
//router.get('/verify-email', doctorController.verifyEmail);



module.exports = router;
