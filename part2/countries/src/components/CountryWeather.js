import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryWeather = ({ capital, lat, long }) => {
  const [weather, setWeather] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`
      )
      .then(response => {
        const { data } = response;
        setWeather(data);
      });
  }, []);

  return (
    weather && (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {weather.main.temp} Celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`Weather in ${capital}`}
        />
        <p>wind {weather.wind.deg} m/s</p>
      </div>
    )
  );
};

export default CountryWeather;
