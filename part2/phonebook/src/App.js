import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then(persons => {
      setPersons(persons);
    });
  }, []);

  const handleName = event => {
    setNewName(event.target.value);
  };

  const handleNumber = event => {
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    setNewFilter(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Check if person that is trying to be added already is in the phonebook
    const foundPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    // If the person exists in the phonebook, show an alert message, else add it to the phonebook
    if (foundPerson) {
      const answer = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (answer) {
        const updatedPerson = {
          ...foundPerson,
          number: newNumber,
        };

        // Modify person number in the server
        personService
          .update(foundPerson.id, updatedPerson)
          .then(modifiedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== foundPerson.id ? person : modifiedPerson
              )
            );

            showNotification({
              message: `Number for ${foundPerson.name} updated`,
              type: 'success',
            });
          })
          .catch(error => {
            showNotification({ message: error.message, type: 'error' });
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };

      // Add new person to the phonebook
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));

          showNotification({
            message: `${person.name} added`,
            type: 'success',
          });
        })
        .catch(error => {
          showNotification({ message: `${error.message}`, type: 'error' });
        });
    }

    // Clear inputs
    setNewName('');
    setNewNumber('');
  };

  const showNotification = notification => {
    setNotification(notification);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleDelete = id => {
    // Find person with the corresponding id
    const foundPerson = persons.find(person => person.id === id);

    // Ask user if he really wants to delete person from phonebook
    const answer = window.confirm(`Delete ${foundPerson.name}?`);

    // Delete person
    if (answer) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));

          showNotification({
            message: `${foundPerson.name} deleted`,
            type: 'success',
          });
        })
        .catch(() => {
          setPersons(persons.filter(person => person.id !== id));

          showNotification({
            message: `${foundPerson.name} was already deleted from the server`,
            type: 'error',
          });
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      {/* Show notification message (if any) */}
      <Notification notification={notification} />

      {/* Filter contacts */}
      <Filter handleFilter={handleFilter} newFilter={newFilter} />

      {/* Add new conctact form */}
      <h2>Add a new contact</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleName={handleName}
        newName={newName}
        handleNumber={handleNumber}
        newNumber={newNumber}
      />

      {/* Render list of contacts */}
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
