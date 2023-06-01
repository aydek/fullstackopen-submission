import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ name }) => {
    const [countryInfo, setCountryInfo] = useState(null)
    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                setCountryInfo(response.data)
                console.log(response.data)
            })
    }, [name])
    
    return countryInfo && (
        <div>
            <h2>{countryInfo.name.common}</h2>
            <div>capital: {countryInfo.capital[0]}</div>
            <div>area: {countryInfo.area}</div>
            <h3>Languages:</h3>
            <ul>
                {Object.keys(countryInfo.languages).map(key => <li key={key}>{countryInfo.languages[key]}</li>)}  
            </ul>
            <img src={countryInfo.flags.png} alt="Country flag"/>
        </div>
    )
}

export default CountryInfo