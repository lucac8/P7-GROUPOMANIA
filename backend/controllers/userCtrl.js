const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({ ...req.body, password: hash })
                .then(newUser => { res.status(201).json({ 'id': newUser.idUser }) })
                .catch(err => {
                    res.status(500).json({ err })
                }).catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}


exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        idUser: user.idUser,
                        token: jwt.sign(
                            { idUser: user.idUser },
                            '6893NFhQ4ykvYdD2',
                            { expiresIn: '100d' })
                    })
                })
        })
        .catch(error => res.status(500).json({ error }));
}

exports.userInfo = (req, res) => {
    User.findOne({ where: { idUser: req.params.id }, attributes: { exclude: ['password'] } })
        .then(userInfo => {
            res.status(200).json(userInfo)
        })
        .catch(error => res.status(404).json({ error }));
}

exports.userUpdate = (req, res) => {
    User.update({ ...req.body }, { where: { idUser: req.auth.idUser } })
        .then(userInfo => res.status(200).json(userInfo))
        .catch(error => res.status(404).json({ error }));
}

exports.userDelete = (req, res) => {
    if (req.params.id == req.auth.idUser) {
        User.destroy({ where: { idUser: req.auth.idUser } })
            .then(res.status(200).json("Compte supprimé"))
            .catch(error => res.status(400).json({ error }));
    } else {
        console.log('Error')
    }

}