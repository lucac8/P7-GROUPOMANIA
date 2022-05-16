const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '6893NFhQ4ykvYdD2');
        const idUser = decodedToken.idUser;
        req.auth = { idUser };
        if (req.body.idUser && req.body.idUser !== idUser) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};