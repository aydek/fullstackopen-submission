import React from 'react';
import { useContext } from 'react';
import NotificationContext from '../context/notificationContext';
import { useMutation, useQuery } from 'react-query';
import { getAnecdotes, updateAnecdote } from '../requests';

const AnecdoteList = () => {
    const { setNotification } = useContext(NotificationContext);
    const result = useQuery('anecdotes', getAnecdotes, { refetchOnWindowFocus: false, retry: false });
    const updateAnecdoteMutation = useMutation(updateAnecdote);

    if (result.isLoading) {
        return <div>loading data...</div>;
    }

    const anecdotes = result.data;

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({ ...anecdote, votes: (anecdote.votes += 1) });
        setNotification(`voted on: ${anecdote.content}`);
    };
    return anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </div>
    ));
};

export default AnecdoteList;
