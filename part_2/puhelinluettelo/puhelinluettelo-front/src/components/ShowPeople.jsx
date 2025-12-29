import React from 'react'

const OutputPeople = ({ name, number, handleDelete }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', width: '500px'}}>
            <button onClick={handleDelete}>delete</button>
            <div>{name} {number}</div>
        </div>
    );
};

const ShowPeople = ({ persons, filter, handleDelete }) => {
    const filteredPersons = persons.filter(person => 
        person.name.toUpperCase().includes(filter.toUpperCase())
    );

    return (
        <div>
            {filteredPersons.map(person => 
                <OutputPeople
                    key={person.name}
                    name={person.name}
                    number={person.number}
                    handleDelete={() => handleDelete(person.id)}
                >/</OutputPeople>
            )}
        </div>
    );
};

export default ShowPeople;