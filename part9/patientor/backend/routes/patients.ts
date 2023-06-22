import express from 'express';
import patientsService from '../services/patientsService';
import { EntryWithoutId, NewPatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
    if (!req.params.id) {
        res.sendStatus(404);
    } else {
        const patient = patientsService.findById(req.params.id);

        if (patient) {
            res.send(patient);
        } else {
            res.sendStatus(404);
        }
    }
});

router.post('/', (req, res) => {
    try {
        const { name, occupation, ssn, dateOfBirth, gender, entries } = req.body as NewPatientEntry;
        const newEntry = patientsService.addPatient({ name, occupation, ssn, dateOfBirth, gender, entries });
        res.json(newEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const { id } = req.params;
        const entry = req.body as EntryWithoutId;
        const newEntry = patientsService.addEntry(id, entry);
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
