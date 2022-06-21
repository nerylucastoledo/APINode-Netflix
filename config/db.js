const mongoose = require('mongoose')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

function connectDB() {
  mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.dtyd58f.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
}

module.exports = connectDB