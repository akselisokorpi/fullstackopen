import React from 'react'

const OutputPeople = ({ name, number }) => {
    return (
        <div>
            <div>{name} {number}</div>
        </div>
    );
};

const ShowPeople = ( props ) => {
    return (
        <div>
            {props.persons.map(person => 
                <OutputPeople key={person.name} name={person.name} number={person.number} />
            )}
        </div>
    );
};

export default ShowPeople