import { useState } from 'react';

const Toggable = ({ label, show, children }) => {
    const [visible, setVisible] = useState(show);
    return !visible ? (
        <>
            <button onClick={() => setVisible(true)}>{label}</button>
        </>
    ) : (
        <>
            {children}
            <button onClick={() => setVisible(false)}>Cancel</button>
        </>
    );
};

export default Toggable;
