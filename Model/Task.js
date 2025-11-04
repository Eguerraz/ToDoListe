const sequelize = require('../core/ORM.js');
const { DataTypes } = require('sequelize');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true }
}, { 
  timestamps: false,
  freezeTableName: true  // ✅ empêche Sequelize de pluraliser "Task" en "Tasks"
});

module.exports = Task;
