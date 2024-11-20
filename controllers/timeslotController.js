const TimeSlot = require('../models/TimeSlot');
const Doctor = require('../models/Doctor');

// Create multiple time slots for a doctor
const createTimeSlots = async (req, res) => {
    const { doctorId } = req.params;
    const { slots } = req.body; // Array of slots with date, startTime, endTime, isAvailable

    try {
        // Check if the doctor exists
        const doctor = await Doctor.findByPk(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Create the time slots
        const createdSlots = await Promise.all(
            slots.map(slot => TimeSlot.create({
                doctorId,
                date: slot.date,
                startTime: slot.startTime,
                endTime: slot.endTime,
                isAvailable: slot.isAvailable || true, // Default to true
            }))
        );

        res.status(201).json({
            message: 'Time slots created successfully',
            slots: createdSlots,
        });
    } catch (error) {
        console.error('Error creating time slots:', error);
        res.status(500).json({ error: 'Failed to create time slots' });
    }
};

// Get all time slots for a specific doctor
const getTimeSlots = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const slots = await TimeSlot.findAll({
            where: { doctorId },
            order: [['date', 'ASC'], ['startTime', 'ASC']],
        });

        if (!slots.length) {
            return res.status(404).json({ message: 'No time slots found for this doctor' });
        }

        res.status(200).json({ slots });
    } catch (error) {
        console.error('Error fetching time slots:', error);
        res.status(500).json({ error: 'Failed to fetch time slots' });
    }
};

// Update a specific time slot
const updateTimeSlot = async (req, res) => {
    const { doctorId, timeSlotId } = req.params;
    const { date, startTime, endTime, isAvailable } = req.body;

    try {
        const timeSlot = await TimeSlot.findOne({ where: { id: timeSlotId, doctorId } });

        if (!timeSlot) {
            return res.status(404).json({ error: 'Time slot not found' });
        }

        // Update time slot details
        timeSlot.date = date || timeSlot.date;
        timeSlot.startTime = startTime || timeSlot.startTime;
        timeSlot.endTime = endTime || timeSlot.endTime;
        timeSlot.isAvailable = isAvailable !== undefined ? isAvailable : timeSlot.isAvailable;

        await timeSlot.save();

        res.status(200).json({ message: 'Time slot updated successfully', slot: timeSlot });
    } catch (error) {
        console.error('Error updating time slot:', error);
        res.status(500).json({ error: 'Failed to update time slot' });
    }
};

// Delete a specific time slot
const deleteTimeSlot = async (req, res) => {
    const { doctorId, timeSlotId } = req.params;

    try {
        const timeSlot = await TimeSlot.findOne({ where: { id: timeSlotId, doctorId } });

        if (!timeSlot) {
            return res.status(404).json({ error: 'Time slot not found' });
        }

        // Delete the time slot
        await timeSlot.destroy();

        res.status(200).json({ message: 'Time slot deleted successfully' });
    } catch (error) {
        console.error('Error deleting time slot:', error);
        res.status(500).json({ error: 'Failed to delete time slot' });
    }
};

module.exports = {
    createTimeSlots,
    getTimeSlots,
    updateTimeSlot,
    deleteTimeSlot,
};
