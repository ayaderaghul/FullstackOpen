import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
// import BlogPost from './components/BlogPost'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')  
  const [newBlogUrl, setNewBlogUrl] = useState('')
  // const [blogFormVisible, setBlogFormVisible] = useState(false)
  // const [blogPostVisible, setBlogPostVisible] = useState(false)

  const sortBlogsByLikes = (blogsToSort) => { 
    return [...blogsToSort].sort((a,b) => b.likes - a.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogsByLikes(blogs) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setBlogs( blogs )

    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('hello from handlelogin')
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      setBlogs(sortBlogsByLikes(blogs))
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setBlogs([])
    setErrorMessage('Logged out successfully')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }



  const handleDelete = async (blog) => {
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


  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      user:{ 
        username: user.username,
        name: user.name,
        id: user.id
      } 
    }
    try {
      const createdBlog = await blogService.create(newBlog)
      


      setBlogs(blogs.concat(createdBlog))   
      setNewBlogTitle('')
      setNewBlogAuthor('')  
      setNewBlogUrl('')
      setErrorMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      } , 5000)
    } catch (exception) { 
      setErrorMessage('Failed to create blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

      const sortedBlogs = sortBlogsByLikes(blogs)


  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  

  return (
    <div>
      <Notification message={errorMessage} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button> </p>
      <h2>blogs</h2>

      
    <Togglable buttonLabel='create blog'>
      <BlogForm 
        handleCreate={handleCreate}
        newBlogTitle={newBlogTitle}
        newBlogAuthor={newBlogAuthor}
        newBlogUrl={newBlogUrl}
        setNewBlogTitle={setNewBlogTitle}
        setNewBlogAuthor={setNewBlogAuthor}
        setNewBlogUrl={setNewBlogUrl}
      />
    </Togglable>



      {sortedBlogs.map(blog =>
        // <Togglable key={blog.id} buttonLabel='view post'>
          /* <BlogPost blog={blog} blogs={ blogs} setBlogs={setBlogs} user={ user }  /> */
          <Blog 
          key={blog.id} 
          blog={blog} 
          blogs={blogs}
          handleDelete={() => handleDelete(blog)}
          setBlogs={setBlogs} 
          user={ user} />
        
        
        // </Togglable>
      )}
    </div>
  )
}

export default App