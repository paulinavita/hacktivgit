const Axios = require('axios')
let axios = Axios.create({
    baseURL : 'https://api.github.com'
})

axios.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;

class GithubController {

    static getPersonalProfile(req,res) {
        console.log('my profile')
        axios
        .get("/user")
        .then(({data}) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json({err : err.message})
        })
    }

    static getStarred(req, res) {
        console.log('get my starred list')
        axios
        .get("/user/starred")
        .then(({data}) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json({err : err.message})
        })
    }

    static filterStarred (req, res) {
        console.log('filter starred by', req.params.username)
        axios
        .get("/user/starred")
        .then(({data}) => {
            let result = []
            data.forEach(el => {
                if (el.owner.login == req.params.username) {
                    result.push(el)
                }
            });
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json({err : err.message})
        })
    }

    static getPersonalRepos(req,res) {
        console.log('get my repo list')
        axios
        .get("/user/repos")
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({err : err.message})
        })
    }

    static createRepos(req, res) {
        let {name, description} = req.body
        console.log('creating a new repo', req.body)
        axios
        .post("/user/repos", {name, description})
        .then(({data}) => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({err : err.message})
        })
    }

    static getUserRepo(req,res) {
        console.log('listing repository of', req.params.username)
        axios
        .get(`users/${req.params.username}/repos`)
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({err : err.message})
        })
    }

    static unstarRepo(req, res) {
        console.log('unstarring repository', req.params.owner, '||', req.params.repo)
        axios
        .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
        .then(({data}) =>{
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({err : err.message})
        })
    }
}

module.exports = GithubController