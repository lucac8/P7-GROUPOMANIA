const Comment = require('../models/CommentModel')
const User = require('../models/UserModel')
const Post = require('../models/PostModel')

exports.createComment = (req, res) => {
    Comment.create({ ...req.body, idUser: req.auth.idUser, idPost: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllComment = (req, res) => {
    User.findOne({ where: { idUser: req.auth.idUser } })
        .then(user => {
            const Admin = user.isAdmin
            Comment.findAll({
                where: { idPost: req.params.id }, include: [
                    {
                        model: User,
                        attributes: { exclude: ['password'] }
                    }],
                order: [['updatedAt', 'DESC']]
            })
                .then(comment => res.status(200).json({ comment, Admin }))
                .catch(error => res.status(400).json({ error }))
        })
}

exports.deleteComment = (req, res) => {
    Comment.findOne({ where: { idComment: req.params.id } })
        .then(comment => {
            if (!comment) {
                res.status(404).json({
                    error: new Error('No such comment!')
                });
            }
            if (comment.idUser == req.auth.idUser) {
                Comment.destroy({ where: { idComment: req.params.id } })
                    .then(res.status(200).json("Commentaire supprimé"))
                    .catch(error => res.status(400).json({ error }));
            } else {
                User.findOne({ where: { idUser: req.auth.idUser } })
                    .then(user => {
                        if (user.isAdmin == 1) {
                            Comment.destroy({ where: { idComment: req.params.id } })
                                .then(res.status(200).json("Commentaire supprimé"))
                                .catch(error => res.status(400).json({ error }));
                        } else {
                            res.status(400).json({
                                error: new Error('Unauthorized request!')
                            });
                        }
                    })
            }
        }
        )
}

