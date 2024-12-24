import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital, latlng }) => {
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const [latitude, longitude] = latlng;
  
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data', error);
        });
    }, [capital, latlng]);
  
    if (!weather) {
      return <div>Loading weather...</div>;
    }
  
    const weatherIconUrl = (`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature: {weather.main.temp} °C</p>
        <img src={weatherIconUrl} alt="Weather icon" />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }

export default Weather;