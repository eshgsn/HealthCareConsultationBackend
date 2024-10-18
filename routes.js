const express = require('express');
const multer = require('multer');
const patientController = require('./controllers/patientController');
const doctorController = require('./controllers/doctorController');
const consultationController = require('./controllers/consultationController');
const verifyToken = require('./middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

// Patient routes.....
router.post('/patients/register', patientController.register);
router.post('/patients/login', patientController.login);

// Doctor routes.....
router.post('/doctors/register', doctorController.register);
router.post('/doctors/login', doctorController.login);

// Consultation routes....
router.post('/consultations/createRequest',verifyToken,upload.single('image_path'), consultationController.createRequest);
router.put('/consultations/:id/updateStatus', verifyToken, consultationController.updateStatus);
router.get('/doctors/:id/getRequestsByDoctorId', verifyToken, consultationController.getRequestsByDoctorId);

module.exports = router;
