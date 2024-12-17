import { useState } from 'react'
import ShowPeople from '../components/ShowPeople'

const App = () => {
  const [persons, setPersons] = useState([
     { name: 'Arto Hellas' },
     { name: 'Kalle Kives' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowPeople persons={persons}/>
    </div>
  )

}

export default App