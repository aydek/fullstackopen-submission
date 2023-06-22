import { Box, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from '../../../types';

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <Box>
            <Typography>
                {entry.date} <WorkIcon /> {entry.employerName}
            </Typography>
            <Typography fontStyle={'italic'}>{entry.description}</Typography>
            <Typography>diagnosed by: {entry.specialist}</Typography>
        </Box>
    );
};

export default OccupationalHealthcare;
