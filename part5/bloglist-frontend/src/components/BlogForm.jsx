const BlogForm = ({ 
    handleCreate,
    newBlogTitle,
    newBlogAuthor,
    newBlogUrl,
    setNewBlogTitle,
    setNewBlogAuthor,
    setNewBlogUrl
}) => { 
    return (
        <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            data-testid="title"
            type="text"
            value={newBlogTitle}
            id="title"
            placeholder="Blog title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            data-testid="author"
            type="text"
            value={newBlogAuthor}
            id="author"
            placeholder="Blog author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>

          <input
            data-testid="url"
            type="text"
            value={newBlogUrl}
            id="url"
            placeholder="Blog URL"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
}

export default BlogForm