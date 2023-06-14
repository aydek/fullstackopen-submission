import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Toggable from './components/Toggable';
import { useDispatch } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import Notification from './components/Notification';

const App = () => {
    const dispatch = useDispatch();

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('blogsUser');
    };

    const handleLike = async (blog) => {
        try {
            const response = await blogService.update(blog.id, { likes: blog.likes + 1 });
            const index = blogs.findIndex((val) => val.id === response.id);
            const copy = blogs;
            copy[index] = response;
            setBlogs([...copy]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.remove(blog.id, user.token);
                const updated = blogs.filter((val) => val.id !== blog.id);
                setBlogs([...updated]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleNewBlog = async (title, author, url) => {
        try {
            const response = await blogService.create(user.token, { title, author, url });
            setBlogs([...blogs, response]);
            dispatch(showNotification(`New blog ${response.title} by ${response.author} added..`, 5));
            blogFormRef.current.toggleVisibility();
        } catch (error) {
            dispatch(showNotification(error.response.statusText, 5, 'error'));
        }
    };

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const blogs = await blogService.getAll();
                setBlogs(blogs);
            } catch (error) {
                console.log(error);
            }
        };

        getBlogs();
    }, []);

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
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />
                ))}
        </div>
    );
};

export default App;
