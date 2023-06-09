import { useState } from 'react';

const Toggable = ({ label, show, hideLabel, buttonAtTop, children }) => {
    if (!hideLabel) hideLabel = 'Hide';
    const [visible, setVisible] = useState(show);
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
};

export default Toggable;
