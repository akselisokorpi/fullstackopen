import React from 'react'

const OutputPeople = ({ name }) => {
    return (
        <div>
            <div>{ name }</div>
        </div>
    );
};

const ShowPeople = ( props ) => {
    return (
        <div>
            {props.persons.map(person => 
                <OutputPeople key={person.name} name={person.name}/>
            )}
        </div>
    );
};

export default ShowPeople