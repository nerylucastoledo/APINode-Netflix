const routes = require("express").Router()
const multer = require("multer")
const multerConfig = require("../config/multer")
const Movie = require("../models/Movies")

routes.post('/admin/create', multer(multerConfig).single("file"), async (req, res) => {
    const { location: url = ""} = req.file
    const { title, description, category, year, genre, director, actors, country } = req.body

    if (!url || !title || !description || !category || !year || !genre || !director || !actors || !country) {
        return res.status(400).json({ error: "Preencha todos os campos!" })
    }

    const movie = new Movie({
        logo: url,
        title,
        description,
        category,
        year,
        genre,
        director,
        actors,
        country,
        avg_rating: 0
    })

    try {
        await movie.save()
        return res.status(201).json({ sucesso: "Filme criado!" })
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

routes.get('/allMovies', async (req, res) => {
    try {
        const movies = await Movie.find()
        return res.status(200).json(movies)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

routes.get('/movies/:id', async (req, res) => {
    const { id } = req.params

    try {
        const movie = await Movie.findById(id)
        return res.status(200).json(movie)
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
})

routes.put('/admin/update/:id', multer(multerConfig).single("file"), async (req, res) => {
    const { id } = req.params
    const body = req.body

    if (req.file !== undefined) {
        const { location: url = ""} = req.file
        body.logo = url
    }

    try {
        await Movie.findOneAndUpdate({ _id: id }, body, { new: true })
        return res.status(200).json({ sucesso: "Filme atualizado!" })
    } catch( error ){
        return res.status(500).json({ msg: error })
    }


})

module.exports = routes