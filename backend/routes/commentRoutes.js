const router = require('express').Router();
const userCtrl = require('../controllers/commentCtrl')
const auth = require('../middleware/auth')

router.post('/:id', auth, userCtrl.createComment)
router.delete('/:id', auth, userCtrl.deleteComment)
router.get('/:id', auth, userCtrl.getAllComment)

module.exports = router 