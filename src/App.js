import React, { useEffect, useState } from 'react';
import HotBg from './assets/hot.jpg';
import ColdBg from './assets/cold.jpg';
import Descriptions from './components/Descriptions';
import getWeatherData from './weatherApi';

const App = () => {
  const [city, setCity] = useState('Paris');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('imperial');
  const [bg, setBg] = useState(HotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);

      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(ColdBg);
      else setBg(HotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnits = () => {
    setUnits((prevUnits) => (prevUnits === 'imperial' ? 'metric' : 'imperial'));
  };

  const handleEnterKeyPress = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className='app' style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {weather && (
          <div className='container'>
         
            <div className='section section-inputs'>
              <input onKeyDown={handleEnterKeyPress} type='text' name='city' placeholder='Enter City...' />
              <button onClick={handleUnits}>{units === 'imperial' ? '°C' : '°F'}</button>
            </div>
            <div className='section section-temperature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconUrl} alt='weather icon' />
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()}°${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
