import { Alert, Box, Button, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Diagnosis, Entry, Patient } from '../../types';
import { apiBaseUrl } from '../../constants';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const NewEntrie = ({ patient, setPatients }: { patient: Patient; setPatients: React.Dispatch<React.SetStateAction<Patient | undefined>> }) => {
    const id = useParams().id;

    const [error, setError] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [entryType, setEntryType] = useState<string>('HealthCheck');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<string>('');
    const [dischangeDate, setDischangeDate] = useState<string>('');
    const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
    const [employerName, setEmployerName] = useState<string>('');
    const [sickStart, setSickStart] = useState<string>('');
    const [sickEnd, setSickEnd] = useState<string>('');

    const [allDiagnoses, setAllDiagnoses] = useState<Diagnosis[]>();

    const resetForm = () => {
        setError('');
        setDescription('');
        setDate('');
        setSpecialist('');
        setDiagnosisCodes([]);
        setHealthCheckRating('');
        setDischangeDate('');
        setDischargeCriteria('');
        setEmployerName('');
        setSickStart('');
        setSickEnd('');
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${apiBaseUrl}/diagnoses`);
            setAllDiagnoses(result.data);
        };

        void fetchData();
    }, []);

    const submitFrom = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            if (entryType === 'HealthCheck' || entryType === 'OccupationalHealthcare' || entryType === 'Hospital') {
                const data: Entry = {
                    type: entryType,
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    healthCheckRating: Number(healthCheckRating),
                    employerName,
                    sickLeave: { startDate: sickStart, endDate: sickEnd },
                    discharge: { date: dischangeDate, criteria: dischargeCriteria },
                };
                const result = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, data);
                setPatients({ ...patient, entries: [...patient.entries, result.data] });
                resetForm();
                setShow(false);
            }
        } catch (error: any) {
            setError(error.response.data);
        }
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        resetForm();
        setEntryType(event.target.value);
    };

    const handleDiagnosisChange = (event: SelectChangeEvent) => {
        if (!diagnosisCodes.find((d) => d === event.target.value)) setDiagnosisCodes([...diagnosisCodes, event.target.value]);
    };

    return !show ? (
        <Button variant="outlined" onClick={() => setShow(true)}>
            New entry
        </Button>
    ) : (
        <Box mt={2} border={1} p={2}>
            {error.length > 0 && <Alert severity="error">{error}</Alert>}
            <Stack onSubmit={submitFrom} component="form" spacing={2}>
                <Typography variant="h5">New health check entry</Typography>
                <FormControl fullWidth>
                    <InputLabel id="entryType">Entry type</InputLabel>
                    <Select variant="standard" labelId="entryType" value={entryType} label="Entry type" onChange={handleTypeChange}>
                        <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
                        <MenuItem value={'OccupationalHealthcare'}>OccupationalHealthcare</MenuItem>
                        <MenuItem value={'Hospital'}>Hospital</MenuItem>
                    </Select>
                </FormControl>
                <TextField variant="standard" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                {entryType === 'HealthCheck' && (
                    <TextField
                        variant="standard"
                        label="Health rating"
                        type="number"
                        value={healthCheckRating}
                        onChange={(e) => setHealthCheckRating(e.target.value)}
                    />
                )}
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography>Date: </Typography>
                    <Input fullWidth type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Stack>
                <TextField variant="standard" label="Specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
                {entryType === 'Hospital' && (
                    <Box>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Typography>Discharge date: </Typography>
                            <Input sx={{ width: '50%' }} type="date" value={dischangeDate} onChange={(e) => setDischangeDate(e.target.value)} />
                        </Stack>
                        <TextField
                            variant="standard"
                            label="Discharge criteria"
                            value={dischargeCriteria}
                            onChange={(e) => setDischargeCriteria(e.target.value)}
                            fullWidth
                        />
                    </Box>
                )}
                {entryType === 'OccupationalHealthcare' && (
                    <Box>
                        <TextField variant="standard" label="Employer name" value={employerName} onChange={(e) => setEmployerName(e.target.value)} fullWidth />
                        <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
                            <Typography>Sick star: </Typography>
                            <Input sx={{ width: '30%' }} type="date" value={sickStart} onChange={(e) => setSickStart(e.target.value)} />
                            <Typography>Sick end: </Typography>
                            <Input sx={{ width: '30%' }} type="date" value={sickEnd} onChange={(e) => setSickEnd(e.target.value)} />
                        </Stack>
                    </Box>
                )}
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="diagnoses">Diagnosis codes</InputLabel>
                        <Select variant="standard" labelId="diagnoses" label="Diagnosis codes" value={''} onChange={handleDiagnosisChange}>
                            {allDiagnoses?.map((d) => (
                                <MenuItem key={d.code} value={d.code}>
                                    {d.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography>Diagnosis codes: {diagnosisCodes.map((d) => ` ${d} |`)}</Typography>
                </Stack>
                <Button variant="outlined" type="submit">
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        setShow(false);
                        resetForm();
                    }}
                >
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
};

export default NewEntrie;
