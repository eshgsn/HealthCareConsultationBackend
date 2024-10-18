const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const ConsultationRequest = sequelize.define('ConsultationRequest', {
  appointment_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Accepted', 'Rejected', 'Completed'),
    defaultValue: 'Pending',
  },
});

// Associations
ConsultationRequest.belongsTo(Patient, { foreignKey: 'patient_id' });
ConsultationRequest.belongsTo(Doctor, { foreignKey: 'doctor_id' });

module.exports = ConsultationRequest;
