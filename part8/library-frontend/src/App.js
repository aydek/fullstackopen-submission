import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import LoginForm from './components/LoginFrom';
import { useApolloClient } from '@apollo/client';

const App = () => {
    const [token, setToken] = useState(null);
    const client = useApolloClient();

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    useEffect(() => {
        const storageToken = localStorage.getItem('library-app-token');
        if (storageToken) setToken(storageToken);
    }, []);

    return (
        <Router>
            <Nav token={token} logout={logout} />
            <Routes>
                <Route path="/" element={<Authors token={token} />} />
                <Route path="/books" element={<Books />} />
                <Route path="/add" element={<NewBook />} />
                {!token && <Route path="/login" element={<LoginForm setToken={setToken} />} />}
            </Routes>
        </Router>
    );
};

export default App;
