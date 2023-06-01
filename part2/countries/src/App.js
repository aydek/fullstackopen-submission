import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './components/CountryInfo';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearch(input);
    setSearchResults(allCountries.filter(country => country.toLowerCase().includes(input.toLowerCase())));
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
          response.data.forEach(country => {
            const countries = allCountries;
            countries.push(country.name.common);
            setAllCountries(countries);
          });
        }      
      ).catch(error => console.error(`Failed to fetch data, message: ${error}`));
  }, [allCountries])
  
  
  return (
    <div>
      <p>find countries<input value={search} onChange={handleSearchChange}/></p>
      {searchResults.length > 9 ? <div>Too many matches, specify another filter</div> : 
          searchResults.length === 0 ? <div>No matches found...</div> : 
            searchResults.length === 1 ? <CountryInfo name={searchResults[0]}/> :
            searchResults.map(country => 
              <div key={country}>
                {country}
              </div>
            )
        }
    </div>
  );
}

export default App;
