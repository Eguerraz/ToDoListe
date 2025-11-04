const sequelize = require('../core/ORM.js');

const Task = require('./Task');
const User = require('./User');
const Tag  = require('./Tag');

Task.belongsTo(User);
User.hasMany(Task);

Tag.belongsToMany(Task, { through: 'TaskTags' });
Task.belongsToMany(Tag, { through: 'TaskTags' });

sequelize.sync({ alter: true });

module.exports = {
    'Task': Task, 
    'User': User,
    'Tag':Tag
};
