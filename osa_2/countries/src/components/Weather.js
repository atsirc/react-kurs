import React, {useState, useEffect} from 'react'
import axios from "axios"

const Weather = ({ city }) => {
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY
    const getWeather =() => {
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+api_key
		axios
			.get(url)
			.then(response=>{
				setWeather(response.data)
			}).catch(console.log)
	}
    useEffect(getWeather,[])

    const formatWeather = () => {
        return (
            <>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="depicting weather"/>
                <p>{weather.weather[0].description}</p>
                <p>temperature: {weather.main.temp} °C</p>
            </>
        )
    }

    return (
        <div>
            <h2>Current weather in {city}</h2>
            {weather.hasOwnProperty("main") ? formatWeather() : "no weather infromation found"}
        </div>
    )
}

export default Weather