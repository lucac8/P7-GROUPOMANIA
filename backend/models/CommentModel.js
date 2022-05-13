const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./PostModel');
const User = require('./UserModel');

const Comment = sequelize.define('Comment', {
    idComment: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

Comment.belongsTo(User, { foreignKey: 'idUser', onDelete: 'cascade' });
Comment.belongsTo(Post, { foreignKey: 'idPost', onDelete: 'cascade' });

module.exports = Comment;