import React from 'react'

const OutputPeople = ({ name, number }) => {
    return (
        <div>
            <div>{name} {number}</div>
        </div>
    );
};

const ShowPeople = ({ persons, filter }) => {
    const filteredPersons = persons.filter(person => 
        person.name.toUpperCase().includes(filter.toUpperCase())
    );

    return (
        <div>
            {filteredPersons.map(person => 
                <OutputPeople key={person.name} name={person.name} number={person.number} />
            )}
        </div>
    );
};

export default ShowPeople