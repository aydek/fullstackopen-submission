import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { deleteUserData, initUser } from './reducers/userReducer';
import Bloglist from './components/Bloglist';
import Users from './components/Users';
import User from './components/User';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(deleteUserData());
    };

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initUser());
    }, [dispatch]);

    return !user ? (
        <LoginForm />
    ) : (
        <Router>
            <h2>blogs</h2>
            <Notification />
            <p>
                {user.name} logged in <button onClick={handleLogout}>Logout</button>
            </p>

            <Routes>
                <Route path="/" element={<Bloglist />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
            </Routes>
        </Router>
    );
};

export default App;
