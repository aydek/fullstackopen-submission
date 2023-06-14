import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import Toggable from './Toggable';
import { addBlog } from '../reducers/blogReducer';
import AddBlogForm from './AddBlogForm';

const Bloglist = () => {
    const blogFormRef = useRef();
    const dispatch = useDispatch();

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
                    <Blog key={blog.id} blog={blog} />
                ))}
        </>
    );
};

export default Bloglist;
