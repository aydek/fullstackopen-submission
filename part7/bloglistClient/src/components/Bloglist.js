import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Toggable from './Toggable';
import { addBlog } from '../reducers/blogReducer';
import AddBlogForm from './AddBlogForm';

const Bloglist = () => {
    const blogFormRef = useRef();
    const dispatch = useDispatch();

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    };

    const handleNewBlog = (title, author, url) => {
        blogFormRef.current.toggleVisibility();
        dispatch(addBlog(title, author, url));
    };

    const blogs = useSelector((state) => state.blogs);
    return (
        <>
            <Toggable label="New Blog" show={false} hideLabel="Cancel" ref={blogFormRef}>
                <AddBlogForm handleNewBlog={handleNewBlog} />
            </Toggable>
            {blogs
                .slice()
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <div style={blogStyle} key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title} {blog.author}
                        </Link>
                    </div>
                ))}
        </>
    );
};

export default Bloglist;
