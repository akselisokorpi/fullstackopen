import React from 'react'

const Part = props => <div>{props.name} {props.exercises}</div>

const Header = ( props ) => <h2>{props.course.name}</h2>

const Total = ( props ) => {
    const parts = props.course.parts.map(course => course.exercises)

    return (
        <div>
            <h3>Total of {parts.reduce( (s, p) => s + p, 0 )} exercises</h3>
        </div>
    )
}

const Content = ( props ) => {
    return (
        <div>
            {props.course.parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    );
};

const Course = ( props ) => {
    return (
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </div>
    )
}

export default Course