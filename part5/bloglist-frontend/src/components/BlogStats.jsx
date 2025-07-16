
const BlogStats = ({ 
    blog, likes, handleLike, showDeleteButton, handleDelete
}) => { 
    return (
        <div>
            <div className='blogUrl'>URL: { blog.url}</div> 
            <div className='blogLikes'>
            LIKES: { likes } 
            </div>
            <button onClick={handleLike} type="submit">like</button>
            { showDeleteButton && (
            <button onClick={handleDelete}>delete</button>)}
        </div>
    )
}

export default BlogStats