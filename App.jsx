import axios from 'axios';
import React, { useState } from 'react';
import './index.css'

const App = () => {
  const [location, setLocation] = useState("London");
  const [details, setDetails] = useState({
    temp: 0,
    humidity: 20,
    wind: 2.6,
    img: "https://openweathermap.org/img/wn/10d@2x.png",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8e8c8b7370b7df2ab30d05b88bbd43b2`)
      .then(({ data }) => {
        let { name, main, wind, weather } = data;
        console.log(data);
        setDetails({
          humidity: main.humidity,
          wind: wind.speed,
          temp: parseInt(main.temp - 273.15),
          img: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        });
        setLocation(name);
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="container">
      <div className="sub">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='location'
            id='location'
            placeholder='Location'
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className='display'>
          <h1>{details.temp}℃</h1>
          <img src={details.img} alt="Weather Icon" style={{ width: "100px", height: "100px" }} />
          <h1>{location}</h1>
        </div>
        <div className='display-details'>
          <aside>
            <h2>Humidity: {details.humidity}%</h2>
          </aside>
          <aside>
            <h2>Wind Speed: {details.wind} km/hr</h2>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default App;