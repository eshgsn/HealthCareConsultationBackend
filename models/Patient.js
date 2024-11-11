const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconfig');

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: { 
    type: DataTypes.STRING,
    allowNull: false,
  }
 
});

module.exports = Patient;
