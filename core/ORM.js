const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('taches', 'symfony', 'Este2003.', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;