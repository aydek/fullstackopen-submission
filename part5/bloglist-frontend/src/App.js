import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('blogsUser');
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
            //noteService.setToken(user.token);
        }
    }, [user]);

    return !user ? (
        <LoginForm setUser={setUser} />
    ) : (
        <div>
            <h2>blogs</h2>
            <p>
                {user.name} logged in <button onClick={handleLogout}>Logout</button>
            </p>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
