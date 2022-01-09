const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bloglistRouter = require('./controllers/bloglist')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', bloglistRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
