import { Entry } from '../../types';
import HealthCheck from './Entries/HeathCheck';
import Hospital from './Entries/Hospital';
import OccupationalHealthcare from './Entries/OccupationalHealthcare';

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'OccupationalHealthcare':
            return <OccupationalHealthcare entry={entry} />;
        case 'HealthCheck':
            return <HealthCheck entry={entry} />;
        case 'Hospital':
            return <Hospital entry={entry} />;
        default:
            return null;
    }
};

export default EntryDetails;
