//consultationcontroller
const ConsultationRequest = require('../models/Consultation');
const Patient = require('../models/Patient'); 




exports.createRequest = async (req, res) => {
    try {
        if (req.role !== 'patient') {
            return res.status(403).json({ message: 'Only patients can create request.' });
        }

        const request = await ConsultationRequest.create({
            patient_id: req.body.patient_id,
            doctor_id: req.body.doctor_id,
            appointment_time: req.body.appointment_time,
            image_path: req.file.path,
            description:req.body.description,
        });

        res.status(201).json({ message: 'request created ', request });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// exports.updateStatus = async (req, res) => {
//     try {
//         const requestId = req.params.id;


//         if (req.role !== 'doctor') {
//             return res.status(403).json({ message: 'Only doctors can change status.' });
//         }

//         const updatedRequest = await ConsultationRequest.update(
//             { status: req.body.status },
//             { where: { id: requestId } }
//         );

//         if (updatedRequest[0] === 0) {
//             return res.status(404).json({ message: 'Request not found or status not updated.' });
//         }

//         res.status(200).json({ message: 'Status updated' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.updateStatus = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { status } = req.body; // Get the new status from the request body

        // Check if the user is a doctor
        if (req.role !== 'doctor') {
            return res.status(403).json({ message: 'Only doctors can change status.' });
        }

        // Check if the status is valid
        const validStatuses = ['Pending', 'Accepted', 'Rejected', 'Completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        // Update the status in the database
        const updatedRequest = await ConsultationRequest.update(
            { status: status },
            { where: { id: requestId } }
        );

        if (updatedRequest[0] === 0) {
            return res.status(404).json({ message: 'Request not found or status not updated.' });
        }

        res.status(200).json({ message: `Status updated to ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// exports.getRequestsByDoctorId = async (req, res) => {
//     try {

//         if (req.role !== 'doctor') {
//             return res.status(403).json({ message: 'Only doctors can get request.' });
//         }

//         const requests = await ConsultationRequest.findAll({ where: { doctor_id: req.params.id } });
//         res.status(200).json(requests);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.getRequestsByDoctorId = async (req, res) => {
    try {
        if (req.role !== 'doctor') {
            return res.status(403).json({ message: 'Only doctors can get request.' });
        }

        const requests = await ConsultationRequest.findAll({
            where: { doctor_id: req.params.id },
            include: [
                {
                    model: Patient, // Include the Patient model
                    attributes: ['name'], // Fetch only the name of the patient
                },
            ],
        });

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getConsultationStatus = async (req, res) => {
    try {
        const patientId = req.userId; // Corrected to use req.userId from middleware
        const requests = await ConsultationRequest.findAll({
            where: { patient_id: patientId },
            include: [
                {
                    model: Patient, // Include the Patient model to get patient details
                    attributes: ['name'], // Fetch only the patient's name
                },
            ],
        });

        if (!requests.length) {
            return res.status(404).json({ message: 'No consultation requests found for this patient.' });
        }

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
