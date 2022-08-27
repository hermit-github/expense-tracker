const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
require("dotenv").config()
//require("./config/db")()

// regular middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

// morgan middleware
app.use(morgan('tiny'))


// routes
const routes = require("./routes/routes")
app.use("/api/v1",routes)



module.exports = app