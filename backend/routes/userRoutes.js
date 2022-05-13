const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')


router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

router.get('/:id', auth, userCtrl.userInfo)    //Info utilisateur 
router.put('/:id', auth, userCtrl.userUpdate)   //Modif info utilisateur
router.delete('/:id', auth, userCtrl.userDelete)

module.exports = router; 