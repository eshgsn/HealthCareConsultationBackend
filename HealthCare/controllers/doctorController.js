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
        res.status(200).send({ auth: true, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


