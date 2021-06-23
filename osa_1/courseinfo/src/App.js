import React from "react";

const Header = (props) => {
	return (
		<h1>{props.name}</h1>
	)
}

const Part = (part) => {
	return (
		<p>{part.name} {part.exercises}</p>
	)
}

const Total = (props) => {
	return (
		<p>Number of exercises: {props.parts.reduce(((tot, val) => tot + val.exercises),0)}</p>
	)
}

const Content = (props) => {
	const items = []
	let total = 0
	let i = 0
	for (let part of props.parts) {
		items.push(<Part key={i} name={part.name} exercises={part.exercises}/>)
		i++
	}
	
	return (
		<>
			{items}
		</>
	)
}

const App = () => {
	const courses = [
		{
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
		}
	];

	return (
		<>
			{courses.map((val, i) => {
				return (
					<div key={i}>
						<Header name={val.name}/>
						<Content parts={val.parts}/>
						<Total parts={val.parts}/>
					</div>
				)})
			}
		</>

  	)
}

export default App;
