export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface BaseEntry {
    id: string;
    date: string;
    type: string;
    specialist: string;
    diagnosisCodes?: DiagnosesEntry['code'][];
    description?: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge: Discharge;
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating?: HealthCheckRating;
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

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

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}
