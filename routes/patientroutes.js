// // patientroutes
// const express = require('express');
// const patientController = require('../controllers/patientController');

// const router = express.Router();

// router.post('/register', patientController.register);
// router.post('/login', patientController.login);



// // Route to verify patient email
// router.post('/verify-email', patientController.verifyEmail);

// // Add the verify email route

// module.exports = router;

// patientroutes
const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.post('/register', patientController.register);
router.post('/login', patientController.login);



// Route to verify patient email
router.get('/verify-email/:token', patientController.verifyEmail);

// Add the verify email route
//router.get('/verify-email', patientController.verifyEmail);

module.exports = router;