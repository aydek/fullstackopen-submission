import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notificationText, setNotificationText] = useState('');
    const [notificationType, setNotificationType] = useState('info');

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('blogsUser');
    };

    const setNotification = (text, type = 'info') => {
        setNotificationText(text);
        setNotificationType(type);
        setTimeout(() => {
            setNotificationText('');
        }, 4000);
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
            {notificationText.length > 0 ? <h2 style={{ color: notificationType === 'error' ? '#aa0000' : '#00aa00' }}>{notificationText}</h2> : null}
            <p>
                {user.name} logged in <button onClick={handleLogout}>Logout</button>
            </p>
            <AddBlogForm user={user} blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
