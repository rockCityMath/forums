//Based on Sam Barros' MEAN stack tutorial
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bearerToken = require('express-bearer-token')

const db = require('./db')

const userRouter = require('./routes/user-router')
const postRouter = require('./routes/post-router')
const likeRouter = require('./routes/like-router')
const commentRouter = require('./routes/comment-router')
const authRouter = require('./routes/auth-router')

const app = express()
const apiPort = 3232

const corsOptions ={
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bearerToken())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/like', likeRouter)
app.use('/api/comment', commentRouter)
app.use('/auth', authRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))