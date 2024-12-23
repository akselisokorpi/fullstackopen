import { useEffect, useState } from 'react';
import axios from 'axios'

const ListCountries = ( props ) => {
  return (
    <form onChange={props.onSearch}>
    <div>
      <label>
        find countries: <input value={props.newCountry} onChange={props.handleNewCountry}/>
      </label>
    </div>
  </form>
);
};

const GetFlag = ({ country }) => {
  return (
    <div>
      <img src={country.flags.png} alt={`${country.flags.alt}`} />
    </div>
  );
}

const DisplayCountries = ({ filteredCountries }) => {

  if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <div>
          {filteredCountries.map(country => 
            <p key={country.name.common}>{country.name.common}</p>
          )}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
          {filteredCountries.map(country =>
            <div key={country.name.common}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area}</p>
              <h3>languages:</h3>
                <ul>
                {Object.values(country.languages).map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
                </ul>
              <GetFlag country={country}/>
            </div>
          )}
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');

  const handleNewCountry = ( event ) => {
    setNewCountry(event.target.value);
  };

  const onSearch = ( event ) => {
    event.preventDefault();
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setCountries([]);
      });
  };

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(newCountry.toLowerCase())
  );

  return (
    <div>
      <ListCountries 
        newCountry={newCountry}
        handleNewCountry={handleNewCountry}
        onSearch={onSearch}
      />
      <div>
      <DisplayCountries filteredCountries={filteredCountries} />
      </div>
    </div>
  );
};

export default App