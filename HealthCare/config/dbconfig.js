
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('healthcare_db', 'root', 'smart@2099', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established .');
  } catch (error) {
    console.error('Unable to connect database:', error);
  }
};

module.exports = { sequelize, connectDB };
