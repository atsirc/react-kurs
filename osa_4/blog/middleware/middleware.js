const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authorize = (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.replace('bearer ', '')
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (token && decodedToken.id) {
          next() 
      }
    }
  } catch (error) {
      return response.status(401).json({error: error.message})
  }
}

const userExtractor = async (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    const token = authorization.replace('bearer ', '')
    const decodedToken = jwt.verify(token, process.env.SECRET)
    // OBS behöver ju söka id för den kodade jwt:n innehåller ju ett objekt, inte en id
    const user = await User.findById(decodedToken.id)
    request.user = user
    next() 
  } catch (error) {
    return response.status(401).json({error: error.message})
  }
}

module.exports = {authorize, userExtractor}
