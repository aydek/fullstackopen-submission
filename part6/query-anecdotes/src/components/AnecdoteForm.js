import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import NotificationContext from '../context/notificationContext';

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const { setNotification } = useContext(NotificationContext);

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData('anecdotes');
            queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate({ content, id: `${(100000 * Math.random()).toFixed(0)}`, votes: 0 });
        setNotification(`Created: ${content}`);
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
