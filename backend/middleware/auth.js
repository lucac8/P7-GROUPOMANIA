const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];     //On recupere seulement le token chiffré 
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const idUser = decodedToken.idUser;
        req.auth = { idUser }; //On transmet l'userId 
        if (req.body.idUser && req.body.idUser !== idUser) { //Si la requete a un id et qu'il est different de celui du token => error
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