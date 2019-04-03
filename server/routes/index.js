const router = require("express").Router()
const gitRoutes = require('./github')

router.get("/", (req, res) => {
    res.status(200).json({msg : 'connected'})
})

router.use("/github", gitRoutes)

module.exports = router