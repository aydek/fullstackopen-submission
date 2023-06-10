import Toggable from './Toggable';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, handleLike, handleRemove }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div style={blogStyle} className="blog">
            <span>{blog.title}</span> <span>{blog.author}</span>
            <Toggable label="View" show={false} buttonAtTop={true} className="view-button">
                <div>{blog.url}</div>
                <div>
                    likes <span>{blog.likes}</span>
                    <button onClick={() => handleLike(blog)}>like</button>
                </div>
                <div>{blog.user && blog.user.username}</div>
                {blog.user && blog.user.username === user.username ? <button onClick={() => handleRemove(blog)}>Delete</button> : null}
            </Toggable>
        </div>
    );
};

export default Blog;

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
};
