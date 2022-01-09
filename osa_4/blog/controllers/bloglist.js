const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const {userExtractor}= require('../middleware/middleware')

//Note to self: om man lägger till den såhär så är den aktiv för alla sitationer
//bloglistRouter.use(authorize)

bloglistRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name:1, id:1})
  response.json(blogs.map(b => b.toJSON()))
})

bloglistRouter.post('/', userExtractor, async (request, response) => {
  const blog = request.body
  const user = request.user
  if (!blog.url || !blog.title) {
    return response.status(400).end()
  } else {
    blog.likes = blog.likes || 0
    if (blog.userId !== request.user.id) {
      throw Error('Unauthorized')
    }
    try {
      delete blog.userId
      blog.user = user.id
      const savedBlog = await new Blog(blog).save()
      //jo, bra o bli o fundera på det här i evighteter... man måste alltså lägga till en referense till bloggarn i användarens info 
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      return response.status(201).json(savedBlog)
    } catch (error) {
      return response.status(401).json(error.message)
    }
  }
})

bloglistRouter.get('/:id', async (request, response) => {
  const post = await Blog.findById(request.params.id).populate('user', {username: 1, name:1, id:1})
  if (post) {
    response.status(200).json(post)
  } else {
    response.status(404).end()
  }
})

bloglistRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  //const user = await User.findById(body.userId)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    //user: user._id
  }
  const updatedPost = await Blog.findByIdAndUpdate(id, blog, {new: true})
  if (updatedPost) {
    response.json(updatedPost)
  } else {
    response.status(404).end()
  }    
})

bloglistRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === request.user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})

module.exports = bloglistRouter

