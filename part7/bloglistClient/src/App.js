import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { initUser } from './reducers/userReducer';
import Bloglist from './components/Bloglist';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Nav from './components/Nav';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initUser());
    }, [dispatch]);

    return !user ? (
        <LoginForm />
    ) : (
        <Router>
            <Nav />

            <Notification />

            <Routes>
                <Route path="/" element={<Bloglist />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
        </Router>
    );
};

export default App;
