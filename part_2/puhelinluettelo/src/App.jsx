import { useState, useEffect } from 'react'
import axios from 'axios';
import ShowPeople from './components/ShowPeople'
import checkDoppelGangers from './components/CheckPersons'
import Notification from './components/Notification';
import FilterPerson from './components/FilterPerson';
import AddPerson from './components/AddPerson';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
  }, []);
  console.log('render', persons.length, 'persons');

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
    setPersons(persons.concat(newPerson));

    // Reset the input fields
    setNewName('');
    setNewNumber('');
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
      />
    </div>
  );
};

export default App