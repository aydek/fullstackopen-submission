import patientsData from '../data/patients';
import { NonSensitivePatientsEntry } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getEntries = (): NonSensitivePatientsEntry[] => {
    return getNonSensitiveEntries();
};

export default {
    getEntries,
};
