const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const User = require('./UserModel');

const Post = sequelize.define('Post', {

    idPost: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },

    imageUrl: {
        type: Sequelize.STRING
    },

})

Post.belongsTo(User, { foreignKey: 'idUser', onDelete: 'cascade' });


module.exports = Post;