import axios from 'axios';
import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import AddForm from './components/AddForm';
import Entries from './components/Entries';

function App() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    useEffect(() => {
        axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then((response) => {
            setEntries(response.data);
        });
    }, []);
    return (
        <>
            <AddForm entries={entries} setEntries={setEntries} />
            <Entries entries={entries} />
        </>
    );
}

export default App;
