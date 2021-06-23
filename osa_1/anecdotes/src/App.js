import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({clickHandler, text}) => {
	return (
		<button onClick={clickHandler}>
			{text}
		</button>
	)
}

const Popular = ({votes, anecdote}) => {
	if (!anecdote) {
		return <p>No votes have been cast</p>
	}
	return (
		<>
  		<p>{anecdote}</p>
			<p>Has {votes} votes</p>
		</>
	)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [votes, addVote] = useState({})
  const [selected, setSelected] = useState(0)
	const [mostPopular, setMostPopular] = useState(null)
	const getRandomAnecdote = (max) => {
		setSelected(Math.floor(Math.random() * max))
	}

	const vote = (index) => {
		const copy = {...votes}
		copy[index] = (copy[index] || 0) + 1
		addVote(copy)
		index = Object.keys(copy).reduce((a, b) => copy[a] > copy[b] ? a : b)
    setMostPopular(index)
	}

  return (
    <div>
    	<Header text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
    	<Button clickHandler={()=> getRandomAnecdote(anecdotes.length)} text="get next"/>
  	  <Button clickHandler={()=> vote(selected)} text="vote"/>
			<Header text="Most popular anecdote"/>
			<Popular anecdote={anecdotes[mostPopular]} votes={votes[mostPopular]}/>
	 </div>
  )
}

export default App