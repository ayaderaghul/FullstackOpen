const BlogForm = ({ 
    handleCreate,
    newBlogTitle,
    newBlogAuthor,
    newBlogUrl
}) => { 
    return (
        <form onSubmit={handleCreate}>
        <div>
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            placeholder="Blog title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            placeholder="Blog author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={newBlogUrl}
            name="URL"
            placeholder="Blog URL"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
}

export default BlogForm