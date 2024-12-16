import React from 'react'

const Part = props => <div>{props.name} {props.exercises}</div>

const Header = ( props ) => <h1>{props.course.name}</h1>

const Content = ( props ) => {
    return (
        <div>
            {props.parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    );
};

const Course = ( props ) => {
    return (
        <div>
            <Header course={props.course} />
            <Content parts={props.course.parts} />
        </div>
    )
}

export default Course