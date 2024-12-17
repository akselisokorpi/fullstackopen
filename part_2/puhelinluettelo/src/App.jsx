import { useState } from 'react'
import ShowPeople from './components/ShowPeople'
import checkDoppelGangers from './components/CheckPersons'
import Notification from './components/Notification';
import FilterPerson from './components/FilterPerson';
import AddPerson from './components/AddPerson';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

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
    console.log({newName, newNumber})

    if (checkDoppelGangers({ persons, newName })) {
      Notification( {newName} );
      setNewNumber('');
      setNewName('');
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    setPersons([...persons, newPerson]);
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
        newFilter={newName}
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