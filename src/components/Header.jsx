import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [city, setCity] = useState("");
  const [cityApi, setCityApi] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [fiveDaysData, setFiveDaysData] = useState(null);
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weatherApiKey = process.env.REACT_APP_WEATHER;

  useEffect(() => {
    if (cityApi) {
      axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityApi}&limit=5&appid=${weatherApiKey}`)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Veri alınamadı:', error);
        });
    }
  }, [cityApi, weatherApiKey]);

  useEffect(() => {
    if (weatherData) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherData[0]?.lat}&lon=${weatherData[0]?.lon}&appid=${weatherApiKey}`)
        .then((response) => {
          setCurrentWeather(response.data);
        })
        .catch((error) => {
          console.error('Veri alınamadı:', error);
        });
    }
  }, [weatherData, weatherApiKey]);

  useEffect(() => {
    if (weatherData) {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData[0]?.lat}&lon=${weatherData[0]?.lon}&appid=${weatherApiKey}`)
        .then((response) => {
          setFiveDaysData(response.data);
        })
        .catch((error) => {
          console.error('Veri alınamadı:', error);
        });
    }
  }, [weatherData, weatherApiKey]);

  console.log(currentWeather);

  return (
    <div>
      <div className='container mx-auto'>
        <div className='grid grid-flow-row'>
          <div className='grid-flow-col text-left text-red py-2 w-2/3'>
            <input className='w-2/3 border-none ml-2 px-1 rounded-lg bg-[#202B3C]' placeholder='search city' value={city} onChange={(e) => setCity(e.target.value)} />
            <button className='border-none rounded-md mx-0.5 px-2 font-bold text-gray-300 bg-[#202B3C]' onClick={() => setCityApi(city)}>search</button>
          </div>
        </div>
      </div>

      <div className='container mx-auto my-1'>
        <div className='grid grid-rows-1 sm:grid-cols-1 md:grid-cols-2 flex'>
          <div className='grid-row-1'>
            <div className='currentWeather flex py-3'>
              <div className='currentWeather-left-col w-full md:w-2/4'>
                {currentWeather && (
                  <div>
                    <h1 className='font-bold pt-2 px-5 block text-[40px] md:text-4xl text-center md:text-left'>{currentWeather.name}</h1>
                    <h4 className='font-serif px-5 md:text-1 py-1 text-center md:text-left'> {currentWeather.weather[0].description}</h4>
                  </div>
                )}
                {currentWeather && (
                  <h1 className='font-bold text-center md:text-left px-5 py-2 text-[50px] md:text-5xl'>{Math.floor(currentWeather.main.temp - 273.15) + "°"}</h1>
                )}
              </div>
              <div className='currentWeather-right-col md:block'>
                {currentWeather && (
                  <img className='w-[140px] mx-auto md:mx-0' src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt="Weather Icon" />
                )}
              </div>
            </div>
            <div className='current-weather-medium border-none rounded-2xl mx-1 my-3 bg-[#202B3C]'>
              <h3 className='font-bold text-gray-400 pt-3 px-3'>Today Forecast</h3>
              {fiveDaysData && (
                <div className='grid grid-cols-5 grid-rows-1'>
                  {fiveDaysData.list.slice(0, 5).map((data, index) => (
                    <div className='grid-cols-1 px-3 font-bold' key={index}>
                      <h5 className='text-center text-gray-400 py-3'>{data.dt_txt.slice(10, 16)}</h5>
                      <img className='w-[50px] mx-auto' src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather Icon" />
                      <h6 className='font-bold text-center px-5 py-2 text-[25px] md:text-3xl'>{Math.floor(data.main.temp - 273.15) + "°"}</h6>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='current-weather-bottom pb-4 border-none rounded-xl bg-[#202B3C]'>
              <h6 className='px-4 py-2 text-gray-300 font-bold'>Air Conditions</h6>
              {currentWeather && (
                <div className='grid grid-rows-2 grid-cols-2 gap-8'>
                  <div className='grid-cols-1'>
                    <div className='flex justify-center text'>
                      <img width="25" height="25" src="https://img.icons8.com/ios/50/temperature--v1.png" alt="temperature--v1" />
                      <h3 className='font-bold px-2 text-gray-300'>Real Feel</h3>
                    </div>
                    <h3 className='font-bold text-center text-3xl'>{Math.floor(currentWeather.main.feels_like - 273.15) + "°"}</h3>
                  </div>
                  <div className='grid-cols-1'>
                    <div className='flex justify-center'>
                      <img width="25" height="25" src="https://img.icons8.com/color/48/wind.png" alt="wind" />
                      <h3 className='px-2 font-bold text-gray-300'>Wind</h3>
                    </div>
                    <h3 className='text-center font-bold py-2 text-3xl'>{currentWeather.wind.speed + " km/h"}</h3>
                  </div>
                  <div className='grid-cols-1'>
                    <div className='flex justify-center'>
                      <img width="25" height="25" src="https://img.icons8.com/fluency/48/humidity.png" alt="humidity" />
                      <h3 className='px-2 font-bold text-gray-300'>Humidity</h3>
                    </div>
                    <h3 className='text-center font-bold py-2 text-3xl'>{currentWeather.main.humidity + " g/m3"}</h3>
                  </div>
                  <div className='grid-cols-1'>
                    <div className='flex justify-center'>
                      <img width="25" height="25" src="https://img.icons8.com/fluency/48/clouds--v1.png" alt="clouds--v1" />
                      <h3 className='px-2 font-bold text-gray-300'>Clouds</h3>
                    </div>
                    <h3 className='text-center font-bold py-2 text-3xl'>{currentWeather.clouds.all + " qty "}</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='grid-col-1 mt-10 ml-3'>
            <div className='border-none border-1 rounded-2xl bg-[#202B3C] py-1'>
              {currentWeather && fiveDaysData && (
                <ul>
                  <h3 className='pt-4 px-5 font-bold text-gray-400'>5 Days Forecast</h3>
                  {fiveDaysData.list.map((data, index) => (
                    data.dt_txt.includes("12:00:00") && (
                      <div className='m-1 border-b-2 border-gray-500' key={index}>
                        <h2 className='text-center font-extrabold text-lg'>{Math.floor(data.main.temp - 273.15) + "°"}</h2>
                        <img className='w-[50px] mx-auto' src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                        alt="Weather Icon" />
                        <li className='text-center font-medium text-gray-400'>
                          {weekday[new Date(data.dt_txt.slice(0, 10)).getDay()]}
                        </li>
                      </div>
                    )
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
