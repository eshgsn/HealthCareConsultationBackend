const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const doctor = await Doctor.create({
            name: req.body.name,
            specialization: req.body.specialization,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role, 
            availability_Start: req.body.availability_Start, 
            availability_End: req.body.availability_End, 
        });
        res.status(201).json({ message: 'Doctor registered successfully', doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ where: { email: req.body.email } });
        if (!doctor) return res.status(404).send('User not found');

        const passwordIsValid = bcrypt.compareSync(req.body.password, doctor.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: doctor.id, role: doctor.role }, 'esha', { expiresIn: '1hr' }); // Include role in the token
        res.status(200).send({ auth: true, token, id:doctor.id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// // Import bcrypt, the Doctor model, JWT, and the sendVerificationEmail function
// const bcrypt = require('bcryptjs');
// const Doctor = require('../models/Doctor');
// const jwt = require('jsonwebtoken');
// const sendVerificationEmail = require('../mail/email'); // Import sendVerificationEmail

// // Register API for doctor
// exports.register = async (req, res) => {
//     try {
//         // Hash the password using bcrypt
//         const hashedPassword = bcrypt.hashSync(req.body.password, 8);

//         // Create a new doctor entry in the database
//         const doctor = await Doctor.create({
//             name: req.body.name,
//             specialization: req.body.specialization,
//             email: req.body.email,
//             password: hashedPassword,
//             role: req.body.role, 
//             availability_Start: req.body.availability_Start, 
//             availability_End: req.body.availability_End, 
//         });

//         // Generate an email verification token using JWT
//         const verificationToken = jwt.sign({ id: doctor.id, email: doctor.email }, 'your_jwt_secret_key', { expiresIn: '1d' });

//         // Send the verification email with the generated token
//         await sendVerificationEmail(doctor.email, verificationToken);

//         // Send a success response back to the client
//         res.status(201).json({ message: 'Doctor registered successfully. Please check your email to verify your account.', doctor });
//     } catch (error) {
//         // Handle any errors and send error response
//         res.status(500).json({ error: error.message });
//     }
// };
