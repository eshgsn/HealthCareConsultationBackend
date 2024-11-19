//doctorcontroller
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendVerificationEmail = require('../mail/email');
const tokenSecret = 'esha';

// exports.register = async (req, res) => {
//     try {
//         const hashedPassword = bcrypt.hashSync(req.body.password, 8);
//         const doctor = await Doctor.create({
//             name: req.body.name,
//             specialization: req.body.specialization,
//             email: req.body.email,
//             password: hashedPassword,
//             role: req.body.role, 
//             availability_Start: req.body.availability_Start, 
//             availability_End: req.body.availability_End, 
//         });
//         res.status(201).json({ message: 'Doctor registered successfully', doctor });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

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

        // Generate a verification token here if needed
        const payload = {id: doctor.id, role: 'doctor'}
        const token = jwt.sign(payload, 'esha', { expiresIn: '1hr' });
        // console.log(token);
        
        // Send verification email
        await sendVerificationEmail(doctor.email, token, doctor.role);
        // await sendVerificationEmail(doctor.email, token, doctor);

        // const user = await Doctor.update({verifiedtoken : token}, {where : {email}})

        res.status(201).json({ message: 'Doctor registered, verification email sent', doctor });
        // console.log(doctor)
        // localStorage.setItem('role', doctor.role);
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


exports.verifyEmail = async (req, res) => {
    const token = req.params.token;  // Get token from the URL path
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, 'esha');
      const {id, role} = decoded;
  
      // Update user record to mark email as verified and clear the token
      const [updatedRows] = await Doctor.update(
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
