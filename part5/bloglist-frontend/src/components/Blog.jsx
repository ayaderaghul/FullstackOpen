import blogService from '../services/blogs'
import { useState } from 'react'
import BlogStats from './BlogStats'
import Togglable from './Togglable'

const Blog = ({ blog, blogs, setBlogs, user = null,  handleLike: externalLike  }) => { 
  const [likes, setLikes] = useState(blog.likes)
  const showDeleteButton = user 
  && blog.user 
  && user.username 
  && blog.user.username
  && user.username === blog.user.username

  const blogStyle = { 
    paddingTop:10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    if (externalLike) return externalLike()
    const updatedBlog = { 
      title: blog.title,
      author: blog.author,
      url: blog.url, 
      likes: likes + 1, 
      user: blog.id }
    try { 
      await blogService.update(blog.id, updatedBlog)
      setLikes(likes + 1)
    } catch (error) { 
      console.error('Error updating blog:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        // Optionally, you can also update the state to remove the blog from the UI
        console.log(`Blog ${blog.title} deleted`)
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }
  
  return (
  <div style={ blogStyle} className='blog'>
    <div className='blogTitle'> 
      TITLE: {blog.title} 
    </div>
    <div className='blogAuthor'> 
      AUTHOR: {blog.author} 
    </div>
     
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