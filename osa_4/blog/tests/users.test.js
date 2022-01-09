const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_hepler')
const app = require('../app')
const api = supertest(app)
//const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of helper.users) {
    const newUser= new User(user)
    await newUser.save()
  }
})

describe('add user', () => {
  test('when adding a user, there should be 3 posts', async () => {
    const user =  {
      name: "Test User",
      username: "test",
      password: "testuserpassword",
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(3)
  })

  test('when adding a user with a too short password to the database expect 401', async () => {
    const user =  {
      name: "Test User",
      username: "test",
      password: "e",
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(401)
  }) 

  test('when adding a new user with same username as an existing expect that User returns a duplicate key error', async () => {
    const user =  {
      name: "Test User",
      username: "tt1",
      password: "testuserpassword",
    }
    const newUser = new User(user)
    try {
      await newUser.save()
    } catch (err) {
      expect(err.message).toMatch(new RegExp('duplicate key error'))
    }

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(2)
  })

  test('when adding a new user to the database with same username as an existing expect 401', async () => {
    const user =  {
      name: "Test User",
      username: "tt1",
      password: "testuserpassword",
    }

    await api.post('/api/users')
             .send(user)
             .expect(401)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(2)
  })

  test('when trying to add user with a too short name expect 401', async () => {
    const user =  {
      name: "Test User",
      username: "tt",
      password: "testuserpassword",
    }
    const answ = await api
      .post('/api/users')
      .send(user)
      .expect(401)
    
    expect(answ.text).toMatch(new RegExp('validation failed'))
  })


})


//describe('empty properties', () => {

//  test('when creating a bloglist object without like property likes is set to 0', async () => {
//    const blogPost =   {
//      title: "should we consider a for-loop",
//      author: "me",
//      url: "helsinki.fi/hlskjdoos",
//    }
//    let addedBlog = await api
//      .post('/api/blogs')
//      .send(blogPost)
//      .expect(201)
//      .expect('Content-type', /application\/json/)
//    addedBlog = JSON.parse(JSON.stringify(addedBlog.body))
//    expect(addedBlog.likes).toBeDefined()
//  })

//  test('empty title and url results in 400 Bad Request', async () => {
//    const blogPost =   {
//      title: "",
//      author: "christa",
//      url: "",
//      likes: 10
//    }
//    await api
//      .post('/api/blogs')
//      .send(blogPost)
//      .expect(400)
//  })
//})

//describe('deleting post', () => {
//  test('deleting post with id 5a422a851b54a676234d17f7 returns 204', async () => {
//    await api
//      .delete('/api/blogs/5a422a851b54a676234d17f7' )
//      .expect(204)
//  })
//})



afterAll(() => {
  mongoose.connection.close()
})
