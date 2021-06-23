import React from "react"


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

const Content = (props) => {
	const items = []
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


const Total = (props) => {
	return (
		<p>Total of {props.parts.reduce(((tot, val) => tot + val.exercises),0)} exercises</p>
	)
}

const Course = ({name, parts}) => {
	return(
		<>
			<Header name={name}/>
			<Content parts={parts}/>
			<Total parts={parts}/>
		</>
	)

}

export default Course