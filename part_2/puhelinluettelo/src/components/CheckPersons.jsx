const CheckDoppelGangers = ({ persons, newName }) => {
    const hasDuplicate = persons.find((person) => person.name === newName);
    
    return hasDuplicate;
}

export default CheckDoppelGangers