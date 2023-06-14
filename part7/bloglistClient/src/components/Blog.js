import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addLike, removeBlog } from '../reducers/blogReducer';
import BlogComments from './BlogComments';

const Blog = () => {
    const id = useParams().id;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const blogs = useSelector((state) => state.blogs);

    const blog = blogs.find((blog) => blog.id === id);

    if (!blog) return;

    const handleLike = (blog) => {
        dispatch(addLike(blog));
    };

    const handleRemove = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog));
        }
    };

    return (
        <div className="blog">
            <h2>
                {blog.title} {blog.author}
            </h2>
            <a href={blog.url}>{blog.url}</a>
            <div>
                likes <span>{blog.likes}</span>
                <button onClick={() => handleLike(blog)}>like</button>
            </div>
            <div>adde by: {blog.user && blog.user.name}</div>
            {blog.user && blog.user.username === user.username ? <button onClick={() => handleRemove(blog)}>Delete</button> : null}
            <BlogComments blog={blog} />
        </div>
    );
};

export default Blog;
