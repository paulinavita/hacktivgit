const router = require("express").Router()
const authController = require('../../controllers/authController')

router.post('/google-sign-in', authController.googleSignIn)

module.exports = router