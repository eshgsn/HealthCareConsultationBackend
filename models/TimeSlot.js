const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconfig');
const Doctor = require('./Doctor');

const TimeSlot = sequelize.define('TimeSlot', {
  doctorId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id',
    },
    onDelete: 'CASCADE', // Deletes time slots if the doctor is deleted
  },
  date: {
    type: DataTypes.DATEONLY, 
    allowNull: false,
  },
  startTime: { 
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: { 
    type: DataTypes.TIME,
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Doctor.hasMany(TimeSlot, {
  foreignKey: 'doctorId',
  onDelete: 'CASCADE', // Ensures cascading delete
});
TimeSlot.belongsTo(Doctor, {
  foreignKey: 'doctorId',
});

module.exports = TimeSlot;
