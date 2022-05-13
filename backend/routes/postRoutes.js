const router = require('express').Router();
const userCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.get('/', auth, userCtrl.getAllPost)
router.post('/', auth, multer, userCtrl.createPost)

router.delete('/:id', auth, userCtrl.deletePost)


module.exports = router