
const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://zachc:mongopass123@cluster0.bagyi.mongodb.net/ForumApp?retryWrites=true&w=majority', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db