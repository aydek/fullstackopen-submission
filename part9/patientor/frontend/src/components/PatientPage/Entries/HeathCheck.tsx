import { Box, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { HealthCheckEntry } from '../../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <Box>
            <Typography>
                {entry.date} <MedicalServicesIcon />
            </Typography>
            <Typography fontStyle={'italic'}>{entry.description}</Typography>
            <Typography>
                <FavoriteIcon
                    color={
                        entry.healthCheckRating === 0
                            ? 'success'
                            : entry.healthCheckRating === 1
                            ? 'warning'
                            : entry.healthCheckRating === 2
                            ? 'error'
                            : 'disabled'
                    }
                />
            </Typography>
            <Typography>diagnosed by: {entry.specialist}</Typography>
        </Box>
    );
};

export default HealthCheck;
