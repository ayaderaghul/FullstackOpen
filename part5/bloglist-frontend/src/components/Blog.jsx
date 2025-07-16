import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, blogs, setBlogs, user = null }) => { 
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
  <div style={ blogStyle}>
    TITLE: {blog.title} 
    AUTHOR: {blog.author} 
    URL: { blog.url} 
    LIKES: { likes } 
    <button onClick={handleLike} type="submit">like</button>
    { showDeleteButton && (
      <button onClick={handleDelete}>delete</button>)}
  </div>  
  )
}

export default Blog