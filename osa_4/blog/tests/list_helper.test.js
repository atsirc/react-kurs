const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_hepler')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.users)
  const users = await helper.usersInDb()

  await Blog.deleteMany({})
  let i = 0
  for (const blog of helper.blogPosts) {
    blog.userId = users[i%users.length].id
    const blogObject = new Blog(blog)
    await blogObject.save()
    i++
  }
})

describe('total likes', () => {
  const listWithOneBlog = [{
      id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('amount of blogposts', () => {

  test('when given list with 6 blogposts, the result should equal that', async () => {
    //const blogPosts = await api.get('/api/blogs')
    const blogPosts = await helper.blogsInDb()
    expect(blogPosts).toHaveLength(6)
  })
})

describe('has property named id', () => {
  test('check that property contains id not _id', async () => {
    const blogPosts = await api.get('/api/blogs')
    const firstPost = JSON.parse(JSON.stringify(blogPosts.body[0]))
    expect(firstPost.id).toBeDefined()
  })
})

describe('add blog', () => {
  test('when adding a blog, there should be 7 posts', async () => {
    // helper.usersInDb() ger inga passwords eftersom den är beroende av json
    // därför skapar mean en ny som man sparar 
    const newUser = {username: 'ASDJAF', name: 'A Name', password: 'justtesting'}
    const passwordHash = await bcrypt.hash(newUser.password, 10)
    const user = new User({...newUser, passwordHash})
    await user.save()
    const login = await api.post('/api/login')
      .send(newUser) // newUser för att den har password
      .expect(200)
    const blogPost =  {
      title: "Test post",
      author: "No one",
      url: "test.url.com",
      likes: 3,
      userId: user.id // för att user igen har id, men inte password
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + login.body.token)
      .send(blogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(7)
    const titles = blogsAfter.map(b => b.title) 
    expect(titles).toContain('Test post')
  })
})

describe('finding max', () => {

  test('when given a list of blogposts, R C Martin has written most bloposts', async () => {
    const blogPosts = await api.get('/api/blogs')
    const result = listHelper.mostBlogs(blogPosts.body)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('when given a list of blogposts, Dijkstra has most likes', async () => {
    const blogPosts = await api.get('/api/blogs')
    const result = listHelper.mostLikes(blogPosts.body)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17 
    })
  })

  test('when given a list of blogposts, most popular should be Dijkstra', async () => {
    const blogPosts = await helper.blogsInDb()
    const result = listHelper.favoriteBlog(blogPosts)
    const title = result.title
    expect(title).toEqual('Canonical string reduction')
  })

})

describe('empty properties', () => {

  test('when creating a bloglist object without like property likes is set to 0', async () => {
    // helper.usersInDb() ger inga passwords eftersom den är beroende av json
    // därför skapar mean en ny som man sparar 
    const newUser = {username: 'ASDJAF', name: 'A Name', password: 'justtesting'}
    const passwordHash = await bcrypt.hash(newUser.password, 10)
    const user = new User({...newUser, passwordHash})
    await user.save()
    const login = await api.post('/api/login')
      .send(newUser) // newUser för att den har password
      .expect(200)

    const blogPost =   {
      title: "should we consider a for-loop",
      author: "me",
      url: "helsinki.fi/hlskjdoos",
      userId: user.id // user has an id property
    }
    let addedBlog = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + login.body.token)
      .send(blogPost)
      .expect(201)
      .expect('Content-type', /application\/json/)
    addedBlog = JSON.parse(JSON.stringify(addedBlog.body))
    expect(addedBlog.likes).toBeDefined()
  })

  test('empty title and url results in 400 Bad Request', async () => {
    // helper.usersInDb() ger inga passwords eftersom den är beroende av json
    // därför skapar mean en ny som man sparar 
    const newUser = {username: 'ASDJAF', name: 'A Name', password: 'justtesting'}
    const passwordHash = await bcrypt.hash(newUser.password, 10)
    const user = new User({...newUser, passwordHash})
    await user.save()
    const login = await api.post('/api/login')
      .send(newUser) // newUser för att den har password
      .expect(200)

    const blogPost =   {
      title: "",
      author: "christa",
      url: "",
      likes: 10,
      userId: user.id
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + login.body.token)
      .send(blogPost)
      .expect(400)
  })
})

describe('deleting post', () => {
  test(`deleting newly created post returns 204`, async () => {
    const newUser = {username: 'ASDJAF', name: 'A Name', password: 'justtesting'}
    const passwordHash = await bcrypt.hash(newUser.password, 10)
    const user = new User({...newUser, passwordHash})
    await user.save()
    const login = await api.post('/api/login')
      .send(newUser) // newUser för att den har password
      .expect(200)

    const blogPost = {
      title: "to be removed",
      author: "christa",
      url: "skldjfl@html.com",
      likes: 10,
      userId: user.id
    }
    const post = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + login.body.token)
      .send(blogPost)

    await api
      .delete(`/api/blogs/${post.body.id}`)
      .set('Authorization', 'bearer ' + login.body.token)
      .expect(204)
  })

  test(`deleting without token returns 401`, async () => {
    await api
      .delete(`/api/blogs/19028918`)
      .expect(401)
  })
})

describe('change content', () => {
  test('changing content of post with id 5a422a851b54a676234d17f7 returns the updated post', async () => {
    let post = await api.get('/api/blogs/5a422a851b54a676234d17f7')
    post = JSON.parse(JSON.stringify(post.body))
    post.likes += 3
    const result = await api
      .put('/api/blogs/5a422a851b54a676234d17f7' )
      .send(post)
      .expect(200)
    const changedBlog = JSON.parse(JSON.stringify(result.body))
    expect(changedBlog.likes).toBe(post.likes)
  })

  test('changing content of post with unexisting 352a2a851b54a676234d17f7 404', async () => {
    const updatedPost = {
      id: '352a2a851b54a676234d17f7',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
    }
    await api
      .put('/api/blogs/352a2a851b54a676234d17f7' )
      .send(updatedPost)
      .expect(404)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
