//Based on Sam Barros' MEAN stack tutorial
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const userRouter = require('./routes/user-router')
const postRouter = require('./routes/post-router')

const app = express()
const apiPort = 3232

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//Implement more/other routers and possibly change this endpoint
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))