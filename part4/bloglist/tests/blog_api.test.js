const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  assert.strictEqual(titles.includes('HTML is easy'), true)
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'thu nguyen',
    url: 'https',
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('async/await simplifies making async calls'))
})

test('the identifier is id', async () => {
  const newBlog = {
    title: 'Test Blog for likes = 0',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 2
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  assert(response.body.id !== undefined)
  assert(response.body._id === undefined)
  // expect(response.body.id).toBeDefined();
  // expect(response.body._id).toBeUndefined();
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'sim nguyen'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]


  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]


  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('if not set, likes = 0', async () => {
  const newBlog = {
    title: 'Test Blog for likes = 0',
    author: 'Test Author',
    url: 'http://testurl.com',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);


  assert.strictEqual(response.body.likes, 0)
  // expect(response.body.id).toBeDefined();
  // expect(response.body._id).toBeUndefined();
});

test('if not title, get 400', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'http://testurl.com',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});

test('if not url, get 400', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'http://testurl.com',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/);
});


after(async () => {
  await mongoose.connection.close()
})