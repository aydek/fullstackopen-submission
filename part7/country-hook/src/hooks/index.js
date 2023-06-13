import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        console.log(name);
        if (name.length > 0) {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                .then((response) => {
                    setCountry(response.data);
                })
                .catch((error) => console.error(`Failed to fetch data, message: ${error}`));
        }
    }, [name]);

    return country;
};
