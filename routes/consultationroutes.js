// consultationroutes
const express = require('express');

const consultationController = require('../controllers/consultationController');
const verify = require('../middleware/auth');
// const upload = require('../middleware/multerConfig')
const { uploadMultiple } = require('../middleware/multerConfig'); // Updated to include multiple uploads
const router = express.Router();


// router.post('/createRequest', verify, upload.single('image_path'), consultationController.createRequest);

// router.post('/createRequest', uploadMultiple, consultationController.createRequest); // Updated to handle multiple image uploads

router.post('/createRequest', verify, uploadMultiple, consultationController.createRequest);

router.put('/:id/update', verify, consultationController.updateStatus);
router.get('/doctors/:id/getRequests', verify, consultationController.getRequestsByDoctorId);
router.get('/consultationStatus', verify, consultationController.getConsultationStatus);


module.exports = router;
