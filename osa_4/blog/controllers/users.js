const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(_req, res) => {
  const users = await User.find({}).populate('blogs', {url:1, title:1, author:1})
  console.log(users)
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body
  console.log(body)
  if (!body['password']){
    return res.status(401).json({error: 'Password is required'})
  } else if (body['password'].length < 3) {
    return res.status(401).json({error: 'Password is too short'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User ({
    username: body.username,
    name: body.name,
    passwordHash
  })
  try {
      const savedUser = await user.save()
      res.status(201).json(savedUser)
    } catch (err) {
      res.status(401).json({error: err.message})
    }
})

module.exports = usersRouter
