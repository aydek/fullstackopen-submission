import { v4 as uuidv4 } from 'uuid';
import patientsData from '../data/patients';
import { Entry, EntryWithoutId, GenderTypes, NewPatientEntry, NonSensitivePatientsEntry, PatientsEntry } from '../types';

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

    const baseEntry = {
        id: uuidv4(),
        description: entry.description,
        type: entry.type,
        date: entry.date,
        specialist: entry.specialist,
    };

    let newEntry: Entry;
    if (entry.type === 'HealthCheck') {
        if (!entry.healthCheckRating) throw new Error('Missing parameters');
        if (Number(entry.healthCheckRating) > 3 || Number(entry.healthCheckRating) < 0) throw new Error('Value of healthCheckRating incorect');
        newEntry = { ...baseEntry, type: entry.type, healthCheckRating: Number(entry.healthCheckRating) };
    } else if (entry.type === 'Hospital') {
        if (!entry.discharge) throw new Error('Missing parameters');
        newEntry = { ...baseEntry, type: entry.type, discharge: entry.discharge };
    } else if (entry.type === 'OccupationalHealthcare') {
        if (!entry.employerName || !entry.sickLeave) throw new Error('Missing parameters');
        newEntry = { ...baseEntry, type: entry.type, employerName: entry.employerName, sickLeave: entry.sickLeave };
    } else {
        throw new Error('Entry type undefined');
    }

    patient.entries.push(newEntry);

    console.log(patient);

    return newEntry;
};

export default {
    getEntries,
    addPatient,
    findById,
    addEntry,
};
