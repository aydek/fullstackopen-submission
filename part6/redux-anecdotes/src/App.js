import { useSelector, useDispatch } from 'react-redux';
import { increaseVote, newAnecdote } from './reducers/anecdoteReducer';

const App = () => {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch();

    const vote = (id) => {
        dispatch(increaseVote(id));
    };

    const anecdoteSubmit = (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(newAnecdote(content));
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                ))}
            <h2>create new</h2>
            <form onSubmit={anecdoteSubmit}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default App;