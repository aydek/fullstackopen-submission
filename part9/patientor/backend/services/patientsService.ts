import { v4 as uuidv4 } from 'uuid';
import patientsData from '../data/patients';
import { EntryWithoutId, GenderTypes, NewPatientEntry, NonSensitivePatientsEntry, PatientsEntry } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getEntries = (): NonSensitivePatientsEntry[] => {
    return getNonSensitiveEntries();
};

const findById = (id: string): PatientsEntry | undefined => {
    const entry = patientsData.find((d) => d.id === id);
    return entry;
};

const addPatient = (args: NewPatientEntry): PatientsEntry => {
    if (
        !Object.values(GenderTypes)
            .map((v) => v.toString())
            .includes(args.gender)
    )
        throw new Error('Gender not available');

    const newEntry: PatientsEntry = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        id: uuidv4(),
        ...args,
    };

    patientsData.push(newEntry);

    return newEntry;
};

const addEntry = (id: string, entry: EntryWithoutId) => {
    const patient = patientsData.find((p) => p.id === id);
    if (!patient) throw new Error('Patient not found');
    const newEntry = { id: uuidv4(), ...entry };

    if (newEntry.type === 'HealthCheck') {
        if (!newEntry.healthCheckRating) throw new Error('Missing parameters');
        if (newEntry.healthCheckRating > 3 || newEntry.healthCheckRating < 0) throw new Error('Value of healthCheckRating incorect');
    }

    if (newEntry.type === 'Hospital') {
        if (!newEntry.discharge) throw new Error('Missing parameters');
    }

    if (newEntry.type === 'OccupationalHealthcare') {
        if (!newEntry.employerName || !newEntry.sickLeave) throw new Error('Missing parameters');
    }

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getEntries,
    addPatient,
    findById,
    addEntry,
};
