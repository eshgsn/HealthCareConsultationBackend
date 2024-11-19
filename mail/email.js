const nodemailer = require('nodemailer');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
require('dotenv').config(); 

const sendVerificationEmail = async (email, token, role) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        logger: true,
        debug: true
    });
    
    // Ensure that process.env.FRONTEND_URL does not contain /verify-email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking on the following link:</p> <a href="${verificationUrl}">verify email</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        
        // Update the user's verifiedtoken in the database
        if (role === 'doctor') {
            await Doctor.update({verifiedtoken: token}, {where: {email}});
        } else {
            await Patient.update({verifiedtoken: token}, {where: {email}});
        }

        // console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
    }
};


module.exports = sendVerificationEmail;
