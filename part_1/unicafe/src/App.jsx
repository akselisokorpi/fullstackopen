import { useState } from 'react'

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral; // good +1, bad -1, neutral 0
  const average = total === 0 ? 0 : (good - bad) / total;
  const posPercentage = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) return <p>No feedback given</p>

  return (
    <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={posPercentage} />
        </tbody>
      </table>
  );
};

const Button = ( props ) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticsLine = ( props ) => 
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />  
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App