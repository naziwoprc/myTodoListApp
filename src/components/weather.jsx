import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);

    try {
      // Step 1: Turn the City Name into Latitude/Longitude (Geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        alert("City not found!");
      } else {
        const { latitude, longitude, name } = geoData.results[0];

        // Step 2: Get the actual weather using those coordinates
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
        );
        const weatherData = await weatherRes.json();

        // Step 3: Save the data!
        setWeather({
          temp: weatherData.current_weather.temperature,
          condition: "Live Data", // Open-Meteo uses codes, we'll keep it simple for now
          humidity: "N/A",
          cityName: name,
          code: weatherData.current_weather.weathercode, // Let's use the official name from the API
        });
      }
    } catch (error) {
      console.error("Connection error!", error);
    }
    setLoading(false);
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "☁️";
    if (code >= 51) return "🌧️";
    return "🌡️";
  };

  return (
    <div className="card shadow p-4 mt-3">
      <h3>Weather Finder</h3>
      <form onSubmit={getWeather} className="input-group">
        <input
          className="form-control"
          placeholder="Enter city..."
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-warning" type="submit">
          Search
        </button>
      </form>

      {loading && <p className="mt-3">Searching the skies...</p>}

      {weather && !loading && (
        <div className="mt-3">
          <h4>City: {weather.cityName}</h4>
          <p>
            Temperature: {weather.temp}°C {getWeatherIcon(weather.code)}
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather;
