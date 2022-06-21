const moongose = require('mongoose')

const User = moongose.model('User', {
    email: String,
    password: String,
    peoples: Array
})

module.exports = User