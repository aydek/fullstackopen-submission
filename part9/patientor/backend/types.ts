export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

interface Entry {
    id: string;
    date: string;
    specialist: string;
    type: string;
    diagnosisCodes?: string[];
    description?: string;
    discharge?: {
        date: string;
        criteria: string;
    };
    employerName?: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
    healthCheckRating?: number;
}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: GenderTypes;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientsEntry, 'id'>;

export enum GenderTypes {
    male = 'male',
    female = 'female',
    other = 'other',
}
