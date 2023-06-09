import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggable = forwardRef(({ label, show, hideLabel, buttonAtTop, children }, refs) => {
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
        <>
            <button onClick={() => setVisible(true)}>{label}</button>
        </>
    ) : (
        <>
            {buttonAtTop && <button onClick={() => setVisible(false)}>{hideLabel}</button>}
            {children}
            {!buttonAtTop && <button onClick={() => setVisible(false)}>{hideLabel}</button>}
        </>
    );
});

export default Toggable;

Toggable.propTypes = {
    label: PropTypes.string.isRequired,
};
