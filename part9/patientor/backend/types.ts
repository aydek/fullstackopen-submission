export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
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
