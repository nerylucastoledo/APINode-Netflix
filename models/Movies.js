const moongose = require('mongoose')

const Movie = moongose.model('Movie', {
    logo: String,
    title: String,
    description: String,
    category: String,
    year: Number,
    genre: String,
    director: String,
    actors: [String],
    country: String,
    avg_rating: Number
})

module.exports = Movie