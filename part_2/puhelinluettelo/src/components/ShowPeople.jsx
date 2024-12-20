import React from 'react'

const OutputPeople = ({ name, number }) => {
    return (
        <div>
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
                <div key={person.name}>
                    <OutputPeople name={person.name} number={person.number}/>
                    <button onClick={() => handleDelete(person.id)}>delete</button>
                </div>
            )}
        </div>
    );
};

export default ShowPeople