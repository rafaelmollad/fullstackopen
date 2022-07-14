import CountryWeather from './CountryWeather';

const CountryDetail = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital[0];
  const area = country.area;
  const languages = country.languages;
  const flag = country.flags.png;
  const [lat, long] = country.latlng;

  return (
    <>
      <h2>{name}</h2>
      <div>
        <p>capital {capital}</p>
        <p>area {area}</p>

        <h3>languages:</h3>
        <ul>
          {Object.keys(languages).map(language => (
            <li key={language}>{languages[language]}</li>
          ))}
        </ul>
        <img src={flag} alt={`${name} flag`} />
      </div>
      <CountryWeather capital={capital} lat={lat} long={long} />
    </>
  );
};

export default CountryDetail;
