const Sequelize = require('sequelize')

const sequelize = new Sequelize('groupomania', 'root', 'UO7aMHWPokxLdT6N', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize

