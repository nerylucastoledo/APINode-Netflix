require('dotenv').config()

const express = require('express')
const app = express()
const connectDB = require('./config/db')
const morgan = require('morgan')
const path = require('path')

// Config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
)

app.use(require("./routes/routes"))
app.use(require("./routes/routerLogin"))

connectDB()
app.listen(3000, () => console.log(`http://localhost:3000`))