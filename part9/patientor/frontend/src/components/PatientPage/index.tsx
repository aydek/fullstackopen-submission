import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../../constants';
import { Patient } from '../../types';
import { Box, Typography } from '@mui/material';
import { Female, Male } from '@mui/icons-material';
import EntryDetails from './EntryDetails';
import NewEntrie from './NewEntrie';

const PatientPage = () => {
    const id = useParams().id;

    const [patient, setPatients] = useState<Patient>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${apiBaseUrl}/patients/${id}`);
            setPatients(result.data);
        };

        void fetchData();
    }, [id]);

    return !patient ? null : (
        <Box>
            <Typography variant="h5" fontWeight={'bold'} sx={{ my: 2 }}>
                {patient.name} {patient.gender === 'female' ? <Female /> : <Male />}
            </Typography>
            <Typography>ssn: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
            <NewEntrie patient={patient} setPatients={setPatients} />
            <Typography variant="h5" sx={{ my: 2 }}>
                Entries
            </Typography>
            {patient.entries.map((entry, idx) => (
                <Box key={idx} border={1} borderRadius={2} padding={1} marginY={1}>
                    <EntryDetails entry={entry} />
                </Box>
            ))}
        </Box>
    );
};

export default PatientPage;
