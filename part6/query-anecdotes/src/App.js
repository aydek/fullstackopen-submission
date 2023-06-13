import Notification from './components/Notification';
import { NotificationProvider } from './context/notificationContext';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
    return (
        <NotificationProvider>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            <AnecdoteList />
        </NotificationProvider>
    );
};

export default App;
