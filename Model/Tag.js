const sequelize = require('../core/ORM.js');
const { DataTypes } = require('sequelize');

const Tag = sequelize.define('Tag', {
  name: { type: DataTypes.STRING, allowNull: false }
}, { 
  timestamps: false,
  freezeTableName: true  
});

module.exports = Tag;
