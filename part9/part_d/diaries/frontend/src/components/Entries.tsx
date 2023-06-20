import { DiaryEntry } from '../types';
import Entry from './Entry';

const Entries = ({ entries }: { entries: DiaryEntry[] }) => {
    return (
        <div>
            <h2>Diary entires</h2>
            {entries.map((entry) => (
                <Entry key={entry.id} date={entry.date} weather={entry.weather} visibility={entry.visibility} comment={entry.comment} />
            ))}
        </div>
    );
};

export default Entries;
