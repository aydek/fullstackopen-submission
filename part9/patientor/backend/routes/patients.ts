import express from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getEntries());
});

router.post('/', (req, res) => {
    try {
        const { name, occupation, ssn, dateOfBirth, gender } = req.body as NewPatientEntry;
        const newEntry = patientsService.addPatient({ name, occupation, ssn, dateOfBirth, gender });
        res.json(newEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;

