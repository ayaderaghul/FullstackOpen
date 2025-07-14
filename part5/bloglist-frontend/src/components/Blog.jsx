const Blog = ({ blog }) => (
  <div>
    TITLE: {blog.title} AUTHOR: {blog.author} URL: { blog.url} LIKES: { blog.likes }
  </div>  
)

export default Blog