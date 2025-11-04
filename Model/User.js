const sequelize = require('../core/ORM.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
}, { 
  timestamps: false,
  freezeTableName: true 
});

module.exports = User;
