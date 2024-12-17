import { useState } from 'react'
import ShowPeople from './components/ShowPeople'
import checkDoppelGangers from './components/CheckPersons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1231244'}]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div> name: <input value={newName} onChange={handleNewPerson}/> </div>
        <div> number: <input value={newNumber} onChange={handleNewNumber}/> </div>
        <div>
          <button type="submit" onClick={(event) => { 
            event.preventDefault(); addNewPersonToArray(); 
            }}>add
            </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPeople persons={persons}/>
    </div>
  );
};

export default App