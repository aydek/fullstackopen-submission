import { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Button, Container } from '@mui/material';

const Toggable = forwardRef(({ label, show, hideLabel, children, className }, refs) => {
    if (!hideLabel) hideLabel = 'Hide';
    if (show === undefined) show = false;
    const [visible, setVisible] = useState(show);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        };
    });

    return !visible ? (
        <Box sx={{ my: 2 }}>
            <Button variant="outlined" fullWidth className={className} onClick={() => setVisible(true)}>
                {label}
            </Button>
        </Box>
    ) : (
        <Container component="main" maxWidth="xs" sx={{ my: 2 }}>
            {children}
            <Button sx={{ mt: 1 }} variant="outlined" fullWidth onClick={() => setVisible(false)}>
                {hideLabel}
            </Button>
        </Container>
    );
});

Toggable.displayName = 'Toggable';

export default Toggable;
