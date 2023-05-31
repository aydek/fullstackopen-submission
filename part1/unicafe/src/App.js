import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(prev => prev + 1)}>Good</button>
      <button onClick={() => setNeutral(prev => prev + 1)}>Neutral</button>
      <button onClick={() => setBad(prev => prev + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
    const total = good+bad+neutral;

    const getAverage = () => {
        if(!total) return 0;
        const goodPercentage = (100 / total) * good; 
        const badPercentage = (100 / total) * bad;
        let current = 0;
        current += goodPercentage / 100;
        current -= badPercentage / 100
        return current.toFixed(1);
    }
  
    const getPositive = () => {
      if(!total) return 0;
      return ((100 / total) * good).toFixed(1)
    }

    return (
        <div>
            <h1>Statistics</h1>
            {total > 0 ?
                (<table>
                    <tbody>
                        <StatisticsLine text="Good" value={good}/>
                        <StatisticsLine text="Neutral" value={neutral}/>
                        <StatisticsLine text="Bad" value={bad}/>
                        <StatisticsLine text="All" value={total}/>
                        <StatisticsLine text="Average" value={getAverage()}/>
                        <StatisticsLine text="Positive" value={getPositive()} aftertext="%"/>
                    </tbody>
                </table>) : (
                    <div>No feedback given</div>
                )
        }
        </div>
    )
}

const StatisticsLine = ({text, value, aftertext = null}) => {
    return (
        <tr>
        <td>{text}</td><td>{value} {aftertext}</td>
        </tr>
    )
}

export default App