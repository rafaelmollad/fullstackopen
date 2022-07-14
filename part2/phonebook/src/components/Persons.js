import Person from './Person';

const Persons = ({ filteredPersons, handleDelete }) => {
  return filteredPersons.map(({ name, number, id }) => (
    <Person
      key={id}
      name={name}
      number={number}
      handleDelete={() => handleDelete(id)}
    />
  ));
};

export default Persons;
