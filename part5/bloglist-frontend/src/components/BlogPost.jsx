import Blog from './Blog'
const BlogPost = ({ 
    blog, blogs, user, setBlogs
}) => { 
    return (
        <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} user={ user} />
    )
}

export default BlogPost