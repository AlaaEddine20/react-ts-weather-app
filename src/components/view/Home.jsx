import React, { useState } from "react";
import day_clear from "./../../weather-icons/day_clear.png";
import day_rain from "./../../weather-icons/day_rain.png";
import day_snow from "./../../weather-icons/day_snow.png";
import cloudy from "./../../weather-icons/cloudy.png";
import overcast from "./../../weather-icons/overcast.png";
import day_partial_cloud from "./../../weather-icons/day_partial_cloud.png";
import night_clear from "./../../weather-icons/night_clear.png";
import night_rain from "./../../weather-icons/night_rain.png";
import night_snow from "./../../weather-icons/night_snow.png";
import night_partial_cloud from "./../../weather-icons/night_partial_cloud.png";
import rain from "./../../weather-icons/rain.png";
import thunder from "./../../weather-icons/thunder.png";
import mist from "./../../weather-icons/mist.png";

import "./style.css";

const MainView = () => {
  const [weatherData, setWeatherData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dailyWeather, setDailyWeather] = useState({});

  const fetchCurrentWeather = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${searchText}
        &appid=${process.env.REACT_APP_API_KEY}`
      );
      if (response.ok) {
        const weather = await response.json();
        setIsLoading(false);
        setWeatherData(weather);
        console.log(weather);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchDays = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${searchText}
        &appid=${process.env.REACT_APP_API_KEY}&cnt=5`
      );
      if (response.ok) {
        const daily = await response.json();
        setIsLoading(false);
        setDailyWeather(daily);
        console.log(daily);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCurrentWeather();
    fetchDays();
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <>
      <h1
        id="title"
        style={{ position: "absolute", top: "100px", color: "#fff" }}
      >
        What's the weather like today?
      </h1>
      <div id="weather-container">
        <form id="form-container" onSubmit={handleSubmit}>
          <input
            name="search"
            id="search-input"
            onChange={handleOnChange}
            value={searchText}
            autoComplete="off"
            placeholder="Search for location"
          />

          {/* <button id="search-btn" type="submit">
              <i class="fas fa-search-location" />
            </button> */}
        </form>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {weatherData.name && <h1 id="city-name">{weatherData.name}</h1>}
            {/* CLEAR DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "01d" && (
              <>
                <p>The perfect day for a walk!</p>
                <img
                  className="weather-icon"
                  src={day_clear}
                  alt="weather icon"
                />
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "01n" && (
              <>
                <p>The stars are so bright tonight!</p>
                <img
                  className="weather-icon"
                  src={night_clear}
                  alt="weather icon"
                />
              </>
            )}
            {/* PARTIAL CLOUD DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "02d" && (
              <>
                <img
                  className="weather-icon"
                  src={day_partial_cloud}
                  alt="weather icon"
                />
                <p>Sun's in, sun's out :D</p>
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "02n" && (
              <>
                <img
                  className="weather-icon"
                  src={night_partial_cloud}
                  alt="weather icon"
                />
                <p>Still can see some stars</p>
              </>
            )}
            {/*  CLOUDY DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "03d" && (
              <>
                <img className="weather-icon" src={cloudy} alt="weather icon" />
                <p>Should i bring the umbrella?</p>
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "03n" && (
              <>
                <img className="weather-icon" src={cloudy} alt="weather icon" />
                <p>No stars tonight..zzz..</p>
              </>
            )}
            {/* OVERCAST DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "04d" && (
              <>
                <img
                  className="weather-icon"
                  src={overcast}
                  alt="weather icon"
                />
                <p>What a grey day</p>
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "04n" && (
              <>
                <img
                  className="weather-icon"
                  src={overcast}
                  alt="weather icon"
                />
                <p>Stars are covered</p>
              </>
            )}
            {/* SHOWER RAIN DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "09d" && (
              <>
                <img
                  className="weather-icon"
                  src={day_rain}
                  alt="weather icon"
                />
                <p>Don't forget the umbrella</p>
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "09n" && (
              <>
                <img
                  className="weather-icon"
                  src={night_rain}
                  alt="weather icon"
                />
                <p>That nice sound while sleeping..</p>
              </>
            )}
            {/* RAIN DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "10d" && (
              <>
                <img className="weather-icon" src={rain} alt="weather icon" />
                <p>Don't forget the umbrella</p>
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "10n" && (
              <>
                <img className="weather-icon" src={rain} alt="weather icon" />
                <p>That nice sound while sleeping..</p>
              </>
            )}
            {/* THUNDERSTORM DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "11d" && (
              <>
                <img
                  className="weather-icon"
                  src={thunder}
                  alt="weather icon"
                />
                <p>Perfect day to stay at home chilling</p>
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "11n" && (
              <>
                <img
                  className="weather-icon"
                  src={thunder}
                  alt="weather icon"
                />
                <p>Zeus is very mad</p>
              </>
            )}
            {/* SNOW DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "13d" && (
              <>
                <img
                  className="weather-icon"
                  src={day_snow}
                  alt="weather icon"
                />
                <p>The view outside is beautiful</p>
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "13n" && (
              <>
                <img
                  className="weather-icon"
                  src={night_snow}
                  alt="weather icon"
                />
                <p>Some hot chocolate and a movie</p>
              </>
            )}
            {/* MIST DAY & NIGHT */}
            {weatherData.weather && weatherData.weather[0].icon === "50d" && (
              <>
                <img className="weather-icon" src={mist} alt="weather icon" />
              </>
            )}
            {weatherData.weather && weatherData.weather[0].icon === "50n" && (
              <>
                <img className="weather-icon" src={mist} alt="weather icon" />
              </>
            )}

            {weatherData.main && (
              <h3>{kelvinToFarenheit(weatherData.main.temp)}&deg; C</h3>
            )}
          </>
        )}
      </div>
      <div id="weather-container" style={{ marginLeft: 20 }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3>Tomorrow</h3>
            {/* CLEAR DAY & NIGHT */}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "01d" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={day_clear}
                    alt="weather icon"
                  />
                </>
              )}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "01n" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={night_clear}
                    alt="weather icon"
                  />
                </>
              )}
            {/* PARTIAL CLOUD DAY & NIGHT */}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "02d" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={day_partial_cloud}
                    alt="weather icon"
                  />
                </>
              )}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "02n" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={night_partial_cloud}
                    alt="weather icon"
                  />
                </>
              )}
            {/* CLOUDY DAY & NIGHT */}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "03d" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={cloudy}
                    alt="weather icon"
                  />
                </>
              )}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "03n" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={cloudy}
                    alt="weather icon"
                  />
                </>
              )}
            {/* OVERCAST DAY & NIGHT */}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "04d" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={overcast}
                    alt="weather icon"
                  />
                </>
              )}
            {dailyWeather.list &&
              dailyWeather.list[0].weather[0].icon === "04n" && (
                <>
                  <p>The perfect day for a walk!</p>
                  <img
                    className="weather-icon"
                    src={overcast}
                    alt="weather icon"
                  />
                </>
              )}
            {weatherData.main && (
              <h3>{kelvinToFarenheit(weatherData.main.temp)}&deg; C</h3>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MainView;
