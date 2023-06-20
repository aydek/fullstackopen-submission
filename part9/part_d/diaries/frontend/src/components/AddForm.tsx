import { useState } from 'react';
import axios from 'axios';
import { DiaryEntry, Visibility, Weather } from '../types';

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

    const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value as Visibility);
    };

    const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value as Weather);
    };

    return (
        <div>
            <h2>Add new entry</h2>
            {error.length > 0 && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div>
                    visibility:
                    {Object.values(Visibility).map((value) => (
                        <label key={value}>
                            <input type="radio" value={value} checked={visibility === value} onChange={handleVisibilityChange} />
                            {value}
                        </label>
                    ))}
                </div>
                <div>
                    weather:
                    {Object.values(Weather).map((value) => (
                        <label key={value}>
                            <input type="radio" value={value} checked={weather === value} onChange={handleWeatherChange} />
                            {value}
                        </label>
                    ))}
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
