const routes = require("express").Router()
const multer = require("multer")
const multerConfig = require("../config/multer")

routes.post('/create', multer(multerConfig).single("file"), async (req, res) => {
    const { location: url = ""} = req.file
    const { name, lastname }= req.body

    console.log(name, lastname, url)
})

module.exports = routes