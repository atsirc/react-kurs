import React, {useState} from "react"

const Button = ({text, clickHandler}) => {
	return (
		<button onClick={clickHandler}>
			{text}
		</button>
	)
}

const Header = ({text}) => <h1>{text}</h1>


const Statistic = ({text, statistic}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{statistic}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad
	const average = (good - bad)/total
	const positive = 100*(good / total) + "%"
	if (total === 0) {
		return <p>No feedback given</p>
	}
	
	return (
		<table>
			<tbody>
				<Statistic text="good" statistic={good}/>
				<Statistic text="netral" statistic={neutral}/>
				<Statistic text="bad" statistic={bad}/>
				<Statistic text="total" statistic={total}/>
				<Statistic text="average" statistic={average}/>
				<Statistic text="positive" statistic={positive}/>
		</tbody>	
	</table>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
		<div>
			<Header text="give feedback"/>
			<Button text="good" clickHandler={()=>setGood(good +1)}/>
			<Button text="neutral" clickHandler={()=>setNeutral(neutral+1)}/>
			<Button text="bad" clickHandler={()=>setBad(bad+1)}/>
			<Header text="statistics"/>
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
  )
}

export default App;
