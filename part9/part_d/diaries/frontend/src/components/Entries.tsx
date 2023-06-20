import axios from 'axios';
import { useEffect, useState } from 'react';
import { DiaryEntry } from '../types';
import Entry from './Entry';

const Entries = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    useEffect(() => {
        axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then((response) => {
            setEntries(response.data);
        });
    }, []);
    return (
        <div>
            <h2>Diary entires</h2>
            {entries.map((entry) => (
                <Entry date={entry.date} weather={entry.weather} visibility={entry.visibility} comment={entry.comment} />
            ))}
        </div>
    );
};

export default Entries;
