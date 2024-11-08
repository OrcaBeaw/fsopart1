import { useState } from 'react'

    const Statistics = ({ good, neutral, bad }) => {
        const total = good + neutral + bad
        const average = (good - bad) / total
        const positive = (good / total) * 100

        if (total === 0) {
            return (
                <div>
                    <h1>statistics</h1>
                    <p>No feedback given</p>
                </div>
            )
        }
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <tbody>
                    <tr>
                        <td>good</td>
                        <td>{good}</td>
                    </tr>
                    <tr>
                        <td>neutral</td>
                        <td>{neutral}</td>
                    </tr>
                    <tr>
                        <td>bad</td>
                        <td>{bad}</td>
                    </tr>
                    <tr>
                        <td>all</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td>{average}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{positive}%</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )

    }

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App