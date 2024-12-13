import { useState } from 'react'

const Display = ( props ) => {
  const good = props.good;
  const bad = props.bad;
  const neutral = props.neutral;

  return (
    <div>
      <li>good {good}</li>
      <li>bad {bad}</li>
      <li>neutral {neutral}</li>
    </div>
  );
};

const Button = ( props ) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
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
      <Display good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App