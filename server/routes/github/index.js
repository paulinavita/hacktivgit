const router = require("express").Router()
const githubController = require('../../controllers/githubController')

router.get('/myprofile', githubController.getPersonalProfile)
router.get('/starred', githubController.getStarred)
router.get('/starred/:username', githubController.filterStarred)
router.get('/myrepos', githubController.getPersonalRepos)
router.get('/repo/:username', githubController.getUserRepo)
router.post('/createrepo', githubController.createRepos)
router.delete('/unstar/:owner/:repo', githubController.unstarRepo)

module.exports = router