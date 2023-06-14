import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Toggable from './components/Toggable';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import { addBlog, initializeBlogs } from './reducers/blogReducer';
import { deleteUserData, initUser } from './reducers/userReducer';

const App = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.user);

    const blogFormRef = useRef();

    const handleLogout = () => {
        dispatch(deleteUserData());
    };

    const handleNewBlog = (title, author, url) => {
        blogFormRef.current.toggleVisibility();
        dispatch(addBlog(title, author, url));
    };

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initUser());
    }, [dispatch]);

    return !user ? (
        <LoginForm />
    ) : (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in <button onClick={handleLogout}>Logout</button>
            </p>
            <Toggable label="New Blog" show={false} hideLabel="Cancel" ref={blogFormRef}>
                <AddBlogForm handleNewBlog={handleNewBlog} />
            </Toggable>

            {blogs
                .slice()
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
        </div>
    );
};

export default App;
