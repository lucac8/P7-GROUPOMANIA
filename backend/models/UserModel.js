const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {

    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = User

