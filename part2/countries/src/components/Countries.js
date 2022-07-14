import Country from './Country';

const Countries = ({ countries, handleSubmit }) => {
  return countries.map(country => (
    <Country
      key={country.cca2}
      name={country.name.common}
      handleSubmit={handleSubmit}
    />
  ));
};

export default Countries;
