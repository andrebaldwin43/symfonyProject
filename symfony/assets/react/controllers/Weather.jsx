import React, { useState } from 'react';

function Weather({onSelectImage}) {
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [displayWeather, setDisplayWeather] = useState('hidden');
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from reloading

    try {
      // Make the HTTP POST request to your backend URL
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(JSON.stringify(result, null, 2));
        const background = getBackgroundImage(result.weatherCondition?.description?.text, result.isDaytime);
        onSelectImage(background);
        setStatus(`Success: Data sent!'}`);
        setWeatherData(result);
        setDisplayWeather('');
        setInputValue('');
      } else {
        setStatus(`Server Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setStatus('Failed to connect to the backend.');
    }
  };

  const getBackgroundImage = (conditions, isDaytime) => {
    switch (true) {
      case conditions.toLowerCase().includes('thunderstorm'):
        return 'tStorm';
      case isDaytime && conditions.toLowerCase().includes('sunny'):
        return 'sunny';
      case isDaytime && conditions.toLowerCase().includes('rain'):
        return 'lightRain';
      case isDaytime && conditions.toLowerCase().includes('cloud'):
        return 'cloudy';
      case !isDaytime && conditions.toLowerCase().includes('rain'):
        return 'darkRain';
      case !isDaytime:
        return 'darkSky';
      default:
        return 'sunny';
    }
  };

  return (
    <div>
        <form className='flex flex-col gap-y-2 text-white text-center p-2' onSubmit={handleSubmit}>
          <label className='text-white text-center' htmlFor="userInput">
            Enter Zipcode to check the weather in your area: 
          </label>

          <input className='bg-white self-start mx-auto text-center text-black p-2 rounded'
              id="userInput"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder=""
          />

          <button className='bg-slate-900 self-start mx-auto text-white px-2 py-1 rounded cursor-pointer hover:scale-105 transition-all duration-300' type="submit">
            Submit
          </button>
        </form>

        <span className={` ${displayWeather} text-center p-14 rounded m-2`}>
          {weatherData && (
              <p>Today will be a high of {Math.round(weatherData.currentConditionsHistory?.maxTemperature?.degrees)}
                °F and a low of {Math.round(weatherData.currentConditionsHistory?.minTemperature?.degrees)}°F.
                <br />
                Current conditions: {Math.round(weatherData.temperature?.degrees)}
                °F with a {weatherData.precipitation?.probability?.percent}% chance of precipitation.
                <br />
                Windspeed direction is {weatherData.wind?.direction?.cardinal}° at {weatherData.wind?.speed?.value} mph.
              </p>
          )}
        </span>
    </div>
  );
}

export default Weather;
