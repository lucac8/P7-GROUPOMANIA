const Post = require('../models/PostModel')
const User = require('../models/UserModel')
const fs = require('fs')

exports.createPost = (req, res) => {
    if (req.file) {
        Post.create({
            ...req.body, idUser: req.auth.idUser, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
            .then(post => res.status(200).json(post))
            .catch(error => res.status(400).json({ error }));
    } else {
        Post.create({
            ...req.body, idUser: req.auth.idUser
        })
            .then(post => res.status(200).json(post))
            .catch(error => res.status(400).json({ error }));
    }

}

exports.getAllPost = (req, res) => { //Info recup username /userid 
    User.findOne({ where: { idUser: req.auth.idUser } })
        .then(user => {
            const Admin = user.isAdmin
            Post.findAll({
                order: [['updatedAt', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['password', 'email'] }
                    }]
            })
                .then(posts => res.status(200).json({ posts, Admin }))
                .catch(error => res.status(400).json({ error }));
        })
}

exports.deletePost = (req, res) => {

    Post.findOne({ where: { idPost: req.params.id } })
        .then(post => {
            if (!post) {
                res.status(404).json({
                    error: new Error('No such post!')
                });
            }
            if (post.idUser == req.auth.idUser) {
                del()
            } else {
                User.findOne({ where: { idUser: req.auth.idUser } })
                    .then(user => {
                        if (user.isAdmin == 1) {
                            del()
                        } else {
                            res.status(400).json({
                                error: new Error('Unauthorized request!')
                            });
                        }
                    })
            }
        }
        )

    const del = () => {
        Post.findOne({ where: { idPost: req.params.id } })
            .then(post => {
                if (post.imageUrl) {
                    const filename = post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Post.destroy({ where: { idPost: req.params.id } })
                            .then(res.status(200).json("Post supprimé"))
                            .catch(error => res.status(400).json({ error }));
                    })
                } else {
                    Post.destroy({ where: { idPost: req.params.id } })
                        .then(res.status(200).json("Post supprimé"))
                        .catch(error => res.status(400).json({ error }));
                }
            }).catch(error => res.status(400).json({ error }));
    }
}
