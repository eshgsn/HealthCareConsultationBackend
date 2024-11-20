// // patientcontroller
// const bcrypt = require('bcryptjs');
// const Patient = require('../models/Patient');
// const jwt = require('jsonwebtoken');
// const sendVerificationEmail = require('../mail/email');

// // exports.register = async (req, res) => {
// //     try {
// //         const hashedPassword = bcrypt.hashSync(req.body.password, 8);
// //         const patient = await Patient.create({
// //             name: req.body.name,
// //             email: req.body.email,
// //             password: hashedPassword,
// //             role: req.body.role,
// //         });
// //         res.status(201).json({ message: 'Patient registered', patient });
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // };


// exports.register = async (req, res) => {
//     try {
//         const hashedPassword = bcrypt.hashSync(req.body.password, 8);
//         const patient = await Patient.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword,
//             role: req.body.role,
//         });

//         // Generate a verification token here if needed
//         const payload = { id: patient.id, role: 'patient' }
//         const token = jwt.sign(payload, 'esha', { expiresIn: '1hr' });

//         // Send verification email
//         await sendVerificationEmail(patient.email, token, patient.role);
//         // await Patient.update({verifiedtoken: token} ,{where: {email}})

//         res.status(201).json({ message: 'Patient registered, verification email sent', patient });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.login = async (req, res) => {
//     try {
//         const patient = await Patient.findOne({ where: { email: req.body.email } });
//         if (!patient) return res.status(404).send('User not found');

//         const passwordIsValid = bcrypt.compareSync(req.body.password, patient.password);
//         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

//         const token = jwt.sign({ id: patient.id, role: patient.role }, 'esha', { expiresIn: '1hr' });
//         res.status(200).send({ auth: true, token,id: patient.id });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.verifyEmail = async (req, res) => {
//     const token = req.query.token; // Get token from the URL path
//     console.log('Token', token);
//     if (!token) {
//         return res.status(400).json({ message: 'Token is required' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, 'esha');
//         const { id, role } = decoded;

//         // Update patient record to mark email as verified and clear the token
//         const [updatedRows] = await Patient.update(
//             { is_verified: true, verifiedtoken: null },
//             { where: { id, verifiedtoken: token } }
//         );

//         if (updatedRows === 0) {
//             return res.status(404).json({ message: 'User not found or token invalid' });
//         }

//         res.status(200).json({ message: 'Email verification successful!' });
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: 'Invalid or expired token' });
//     }
// };


// // exports.verifyEmail = async (req, res) => {
// //     const token = req.query.token; // Get token from the URL path
// //     console.log('Token', token);
// //     if (!token) {
// //         return res.status(400).json({ message: 'Token is required' });
// //     }

// //     try {
// //         // Verify the token
// //         const decoded = jwt.verify(token, 'esha');
// //         const {id, role} = decoded;

// //         // Update patient record to mark email as verified and clear the token
// //         const [updatedRows] = await Patient.update(
// //             { is_verified: true, verifiedtoken: null },
// //             { where: { id, verifiedtoken: token } }
// //         );

// //         if (updatedRows === 0) {
// //             return res.status(404).json({ message: 'User not found or token invalid' });
// //         }

// //         res.send(200).json(
            
// //             { message: 'Email verification successful!' });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(400).json({ message: 'Invalid or expired token' });
// //     }
// // };


// patientcontroller
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../mail/email');

// exports.register = async (req, res) => {
//     try {
//         const hashedPassword = bcrypt.hashSync(req.body.password, 8);
//         const patient = await Patient.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword,
//             role: req.body.role,
//         });
//         res.status(201).json({ message: 'Patient registered', patient });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


exports.register = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const patient = await Patient.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        });

        // Generate a verification token here if needed
        const payload = { id: patient.id, role: 'patient' }
        const token = jwt.sign(payload, 'esha', { expiresIn: '1hr' });

        // Send verification email
        await sendVerificationEmail(patient.email, token, patient.role);
        // await Patient.update({verifiedtoken: token} ,{where: {email}})

        res.status(201).json({ message: 'Patient registered, verification email sent', patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const patient = await Patient.findOne({ where: { email: req.body.email } });
        if (!patient) return res.status(404).send('User not found');

        const passwordIsValid = bcrypt.compareSync(req.body.password, patient.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: patient.id, role: patient.role }, 'esha', { expiresIn: '1hr' });
        res.status(200).send({ auth: true, token,id: patient.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.verifyEmail = async (req, res) => {
    const token = req.params.token; // Get token from the URL path

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'esha');
        const {id, role} = decoded;

        // Update patient record to mark email as verified and clear the token
        const [updatedRows] = await Patient.update(
            { is_verified: true, verifiedtoken: null },
            { where: { id, verifiedtoken: token } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found or token invalid' });
        }

        res.status(200).json({ message: 'Email verification successful!' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};