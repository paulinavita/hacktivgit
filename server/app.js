require('dotenv').config()
const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

app.use("/", routes)

console.log('listening 4000..')
app.listen(4000)