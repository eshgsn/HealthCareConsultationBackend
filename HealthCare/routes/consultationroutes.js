const express = require('express');
const multer = require('multer');
const consultationController = require('../controllers/consultationController');
const verify = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/createRequest', verify, upload.single('image_path'), consultationController.createRequest);
router.put('/:id/update', verify, consultationController.updateStatus);
router.get('/doctors/:id/getRequests', verify, consultationController.getRequestsByDoctorId);

module.exports = router;
