const Part = ({ name, exercise }) => <div>{name} {exercise}</div>

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part, index) => (
                <Part key={index} name={part.name} exercise={part.exercises} />
            ))}
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course