import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ countryInfo }) => {

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY;
        const lat = countryInfo.capitalInfo.latlng[0];
        const lon = countryInfo.capitalInfo.latlng[1];
      
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
            .then(response => {
                setWeather(response.data);
                console.log(response.data);
            }).catch(error => console.error(`Failed to fetch data, message: ${error}`));

      
    }, [countryInfo.capitalInfo.latlng])
    
    return weather && (
        <div>
            <h2>Weather in {countryInfo.capital[0]}</h2>
            <div>temperature {weather.main.temp} Celsius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"/>
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather