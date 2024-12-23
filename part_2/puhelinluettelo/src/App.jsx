import { useState, useEffect } from 'react'
import axios from 'axios';
import ShowPeople from './components/ShowPeople'
import FilterPerson from './components/FilterPerson';
import AddPerson from './components/AddPerson';
import PersonServices from './services/persons';
import Notification from './components/Notification';
import ErrorNotif from './components/ErrorNotif';

const baseUrl = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  
  const handleFiltering = ( event ) => {
    setNewFilter(event.target.value);
  }
  
  const handleNewNumber = ( event ) => {
    setNewNumber(event.target.value);
  };
  
  const handleNewPerson = ( event ) => {
    setNewName(event.target.value);
  };
  
  const addNewPersonToArray = () => { 
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

          PersonServices
            .update( existingPerson.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
              setNewName('');
              setNewNumber('');
            })
            .catch(error => {
              setErrorMessage(`Information of ${newName} has already been removed from the server.`)
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
        } else {
          // Don't replace old number, do nothing
          setNewName('');
          setNewNumber('');
          return;
        }
      } else {
        const newPerson = { name: newName, number: newNumber };

        PersonServices
          .create(newPerson)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('');
            setNewNumber('');
            setMessage(`Added ${newName}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
    }
  };

  const handleDelete = ( id ) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonServices
        .deleteObject(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
      });
    }
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorNotif message={errorMessage} />
      <FilterPerson 
        newFilter={newFilter} 
        handleFiltering={handleFiltering}
      />
      <h2>Add a new person</h2>
      <AddPerson
        newName={newName}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        handleNewNumber={handleNewNumber}
        addNewPersonToArray={addNewPersonToArray}
      />
      <h2>Numbers</h2>
      <ShowPeople 
        persons={persons} 
        filter={newFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App  