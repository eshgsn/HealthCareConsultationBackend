// patientroutes
const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post('/register', patientController.register);
router.post('/login', patientController.login);


// Add the verify email route
//router.get('/verify-email', patientController.verifyEmail);

module.exports = router;
