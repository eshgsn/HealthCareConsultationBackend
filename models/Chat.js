const { DataTypes } = require('sequelize');
const {sequelize } = require('../config/dbconfig'); 

const Chat = sequelize.define('Chat', {
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'chats',
  timestamps: false,
  indexes: [
    {
      unique: false, 
      fields: ['roomId'],
    }
  ],
});

module.exports = Chat;