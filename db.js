// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('healthCare_app', 'amitkumar', 'amit@123', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
