import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../../constants';
import { Patient } from '../../types';
import { Box, Typography } from '@mui/material';
import { Female, Male } from '@mui/icons-material';

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
            <Typography variant="h5" sx={{ my: 2 }}>
                Entries
            </Typography>
            {patient.entries.map((entry) => (
                <Box key={entry.id}>
                    <Typography>
                        {entry.date} {entry.description}
                    </Typography>
                    <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}</ul>
                </Box>
            ))}
        </Box>
    );
};

export default PatientPage;
