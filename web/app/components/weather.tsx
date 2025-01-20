"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  description: string;
  temperature: string;
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData>({
    description: "Loading",
    temperature: "??°F",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
            );
            const data = await response.json();
            if (data.weather && data.weather.length > 0) {
              setWeather({
                description: data.weather[0].description,
                temperature: `${Math.round(data.main.temp)}°F`,
              });
            }
          } catch (error) {
            console.error("Error fetching weather data:", error);
            setError(true);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(true);
          setLoading(false);
        }
      );
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  if (loading || error) {
    return (
      <p className="text-right">
        {error ? "error" : "loading"}
        <br />
        ??°F
      </p>
    );
  }

  return (
    <p className="text-right">
      {weather.description}
      <br />
      {weather.temperature}
    </p>
  );
}
