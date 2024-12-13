const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ partname, exercise }) =>  <div>{partname} {exercise}</div>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} partname={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  let total = 0;
  parts.map((part, index) => (
    total += part.exercises
  ))

  return (
    <p>Number of exercises {total}</p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App