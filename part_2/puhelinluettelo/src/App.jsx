import { useState, useEffect } from 'react'
import axios from 'axios';
import ShowPeople from './components/ShowPeople'
import checkDoppelGangers from './components/CheckPersons'
import Notification from './components/Notification';
import FilterPerson from './components/FilterPerson';
import AddPerson from './components/AddPerson';
import PersonServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  
  const handleFiltering = ( event ) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  }
  
  const handleNewNumber = ( event ) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  
  const handleNewPerson = ( event ) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  
  const addNewPersonToArray = () => { 
    console.log({newName, newNumber})
    
    if (checkDoppelGangers({ persons, newName })) {
      Notification( {newName});
      setNewNumber('');
      setNewName('');
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    
    // Add new persons to server
    PersonServices
    .create(newPerson)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
    })
    
    // Reset the input fields
    setNewName('');
    setNewNumber('');
  };

  const handleDelete = ( id ) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonServices
        .deleteObject(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
      });
    }
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
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