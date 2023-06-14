import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Toggable from './components/Toggable';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import { addBlog, addLike, initializeBlogs, removeBlog } from './reducers/blogReducer';

const App = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);

    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('blogsUser');
    };

    const handleLike = (blog) => {
        dispatch(addLike(blog));
    };

    const handleRemove = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog, user));
        }
    };

    const handleNewBlog = (title, author, url) => {
        blogFormRef.current.toggleVisibility();
        dispatch(addBlog(user, title, author, url));
    };

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        if (user) return;
        const loggeduser = window.localStorage.getItem('blogsUser');
        if (loggeduser) {
            const user = JSON.parse(loggeduser);
            setUser(user);
        }
    }, [user]);

    return !user ? (
        <LoginForm setUser={setUser} />
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
                    <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />
                ))}
        </div>
    );
};

export default App;
