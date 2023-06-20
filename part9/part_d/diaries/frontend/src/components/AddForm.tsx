import { useState } from 'react';
import axios from 'axios';
import { DiaryEntry } from '../types';

const AddForm = ({ entries, setEntries }: { entries: DiaryEntry[]; setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>> }) => {
    const [error, setError] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('');
    const [weather, setWeather] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        axios
            .post<DiaryEntry>('http://localhost:3000/api/diaries', { date, visibility, weather, comment })
            .then((response) => {
                setDate('');
                setVisibility('');
                setWeather('');
                setComment('');
                setEntries([...entries, response.data]);
            })
            .catch((error) => setError(error.response.data));
    };

    return (
        <div>
            <h2>Add new entry</h2>
            {error.length > 0 && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    date: <input type="text" value={date} onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div>
                    visibility: <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)}></input>
                </div>
                <div>
                    weather: <input type="text" value={weather} onChange={(e) => setWeather(e.target.value)}></input>
                </div>
                <div>
                    comment: <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}></input>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddForm;
