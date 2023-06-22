import { Box, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Diagnosis, HospitalEntry } from '../../../types';
import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../../../constants';
import axios from 'axios';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`${apiBaseUrl}/diagnoses`);
            setDiagnoses(result.data);
        };

        void fetchData();
    }, []);

    return !diagnoses ? null : (
        <Box>
            <Typography>
                {entry.date} <MedicalServicesIcon />
            </Typography>
            <Typography fontStyle={'italic'}>{entry.description}</Typography>
            <ul>
                {entry.diagnosisCodes &&
                    entry.diagnosisCodes.map((code) => (
                        <li key={code}>
                            {code} {diagnoses.filter((d) => d.code === code)[0].name}
                        </li>
                    ))}
            </ul>
            <Typography>diagnosed by: {entry.specialist}</Typography>
            <Typography>
                {entry.discharge.date} {entry.discharge.criteria}
            </Typography>
        </Box>
    );
};

export default Hospital;
