const router = require("express").Router()
const gitRoutes = require('./github')
const authRoutes = require("./authentication")

router.get("/", (req, res) => {
    res.status(200).json({msg : 'connected'})
})

router.use("/github", gitRoutes)
router.use("/auth", authRoutes)

module.exports = router