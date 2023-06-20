import axios from 'axios';
import { useEffect } from 'react';
import { DiaryEntry } from './types';

function App() {
    useEffect(() => {
        axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then((response) => {
            console.log(response.data);
        });
    }, []);

    return (
        <>
            <div>app</div>
        </>
    );
}

export default App;
