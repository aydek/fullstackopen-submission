import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseVote, initializeAnecdotes } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
    });
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(increaseVote(anecdote));
        dispatch(showNotification(`you voted '${anecdote.content}'`, 5));
    };

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);

    return anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
            <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        ));
};

export default AnecdoteList;
