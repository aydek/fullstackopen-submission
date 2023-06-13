import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

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
        increaseVoteSuccess(state, action) {
            const { id } = action.payload;
            const anecdote = state.find((item) => item.id === id);
            if (anecdote) {
                anecdote.votes++;
            }
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
        appendAnecdotes(state, action) {
            state.push(action.payload);
        },
    },
});

export const { increaseVoteSuccess, setAnecdotes, appendAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const addAnecdote = (anecdote) => {
    return async (dispatch) => {
        const response = await anecdoteService.createNew(asObject(anecdote));
        dispatch(appendAnecdotes(response));
    };
};

export const increaseVote = (anecdote) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 });
        dispatch(increaseVoteSuccess(updatedAnecdote));
    };
};
