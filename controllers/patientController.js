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
        const token = jwt.sign({ id: patient.id, role: patient.role }, 'esha', { expiresIn: '1hr' });

        // Send verification email
        await sendVerificationEmail(patient.email, token);
        await Patient.update({verifiedtoken: token} ,{where: {email}})

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
