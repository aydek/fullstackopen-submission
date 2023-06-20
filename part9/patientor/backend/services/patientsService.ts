import { v4 as uuidv4 } from 'uuid';
import patientsData from '../data/patients';
import { GenderTypes, NewPatientEntry, NonSensitivePatientsEntry, PatientsEntry } from '../types';

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getEntries = (): NonSensitivePatientsEntry[] => {
    return getNonSensitiveEntries();
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

export default {
    getEntries,
    addPatient,
};

// {
//     name: 'Jonas Valanciunas',
//     occupation: 'Coocker',
//     ssn: '2321231213',
//     dateOfBirth: '1995-09-10',
//     gender: 'male'
//   }
