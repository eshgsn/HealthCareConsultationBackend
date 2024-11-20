// // Doctor
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/dbconfig');

// const Doctor = sequelize.define('Doctor', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   specialization: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: { 
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   availability_Start: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   availability_End: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   is_verified: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false, 
//   },
//   verifiedtoken: {
//     type: DataTypes.STRING,
//   },

// });

// module.exports = Doctor;


const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconfig');

const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
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
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
  verifiedtoken: {
    type: DataTypes.STRING,
  },
});

module.exports = Doctor;
