const express = require('express');
const {
    createTimeSlots,
    getTimeSlots,
    updateTimeSlot,
    deleteTimeSlot,
} = require('../controllers/timeslotController');

const router = express.Router();

router.post('/:doctorId', createTimeSlots);
router.get('/:doctorId', getTimeSlots);
router.put('/:doctorId/:timeSlotId', updateTimeSlot);
router.delete('/:doctorId/:timeSlotId', deleteTimeSlot);

module.exports = router;
