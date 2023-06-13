import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addAnecdote(state, action) {
            state.push(asObject(action.payload));
        },
        increaseVote(state, action) {
            const anecdote = state.find((item) => item.id === action.payload);
            if (anecdote) {
                anecdote.votes++;
            }
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { addAnecdote, increaseVote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
