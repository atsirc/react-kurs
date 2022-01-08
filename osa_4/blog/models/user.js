const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

//userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (_document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
    delete returnObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
