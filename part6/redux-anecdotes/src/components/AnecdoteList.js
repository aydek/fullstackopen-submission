import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseVote, setAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
    });
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(increaseVote(anecdote.id));
        dispatch(setNotification(`you voted '${anecdote.content}'`));
    };

    useEffect(() => {
        anecdoteService.getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
