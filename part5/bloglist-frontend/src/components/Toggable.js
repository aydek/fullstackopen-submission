import { useState } from 'react';

const Toggable = ({ label, show, hideLabel, children }) => {
    if (!hideLabel) hideLabel = 'Hide';
    const [visible, setVisible] = useState(show);
    return !visible ? (
        <>
            <button onClick={() => setVisible(true)}>{label}</button>
        </>
    ) : (
        <>
            {children}
            <button onClick={() => setVisible(false)}>{hideLabel}</button>
        </>
    );
};

export default Toggable;
