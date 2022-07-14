import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      const { data } = response;
      setCountries(data);
    });
  }, []);

  const handleQuery = event => {
    setQuery(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase().trim())
  );

  let result = null;
  const filteredCountriesLength = filteredCountries.length;

  if (filteredCountriesLength > 10) {
    result = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountriesLength > 1 && filteredCountriesLength < 10) {
    result = (
      <Countries countries={filteredCountries} handleSubmit={setQuery} />
    );
  } else if (filteredCountriesLength === 1) {
    result = <CountryDetail country={filteredCountries[0]} />;
  } else {
    result = <p>Can't find country</p>;
  }

  return (
    <div>
      <div>
        find countries:
        <input type='text' onChange={handleQuery} value={query} />
      </div>
      {query && result}
    </div>
  );
}

export default App;
