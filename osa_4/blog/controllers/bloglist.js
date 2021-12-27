const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const blog = request.body
  if (!blog.url || !blog.title) {
    response.status(400).end()
  } else {
    blog.likes = blog.likes || 0
    const savedBlog = await new Blog(request.body).save()
    response.status(201).json(savedBlog)
  }
})

bloglistRouter.get('/:id', async (request, response) => {
  const post = await Blog.findById(request.params.id)
  if (post) {
    response.status(200).json(post)
  } else {
    response.status(404).end()
  }
})

bloglistRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedPost = await Blog.findByIdAndUpdate(id, blog, {new: true})
  if (updatedPost) {
    response.json(updatedPost)
  } else {
    response.status(404).end()
  }    
})

bloglistRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
module.exports = bloglistRouter
