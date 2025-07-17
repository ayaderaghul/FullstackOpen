import blogService from '../services/blogs'
import { useState } from 'react'
import BlogStats from './BlogStats'
import Togglable from './Togglable'

const Blog = ({ blog, blogs, setBlogs, user = null, handleDelete }) => { 
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setLikes(returnedBlog.likes)
      const updatedBlogs = blogs.map(b => b.id === blog.id ? returnedBlog : b)
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const showDeleteButton = user 
    && blog.user 
    && user.username 
    && blog.user.username 
    && user.username === blog.user.username

  const blogStyle = { 
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogTitle'>TITLE: {blog.title}</div>
      <div className='blogAuthor'>AUTHOR: {blog.author}</div>

      <Togglable buttonLabel="viewStats">
        <BlogStats 
          blog={blog}
          likes={likes}
          handleLike={handleLike}
          showDeleteButton={showDeleteButton}
          handleDelete={handleDelete}
        />
      </Togglable>
    </div>
  )
}

export default Blog
