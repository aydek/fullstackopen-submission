import { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Button } from '@mui/material';

const Toggable = forwardRef(({ label, show, hideLabel, buttonAtTop, children, className }, refs) => {
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
        <Box sx={{ my: 2 }}>
            {buttonAtTop && <Button onClick={() => setVisible(false)}>{hideLabel}</Button>}
            {children}
            {!buttonAtTop && <Button onClick={() => setVisible(false)}>{hideLabel}</Button>}
        </Box>
    );
});

Toggable.displayName = 'Toggable';

export default Toggable;
