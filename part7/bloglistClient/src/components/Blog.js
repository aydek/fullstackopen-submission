import { useDispatch, useSelector } from 'react-redux';
import Toggable from './Toggable';
import PropTypes from 'prop-types';
import { addLike, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleLike = (blog) => {
        dispatch(addLike(blog));
    };

    const handleRemove = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog));
        }
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
};
