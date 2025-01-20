"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [weather, setWeather] = useState({ description: "", temperature: "" });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
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
      }
    });
  }, []);

  return (
    <nav className="flex justify-between items-end py-4 border-b">
      <div className="text-left">
        <button className="">sign in</button>
      </div>
      <div className="text-center">
        <h1 className="font-bold">pulse</h1>
        <p>
          {new Date()
            .toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })
            .toLowerCase()}
        </p>
      </div>
      <div>
        <p className="text-right">
          {weather.description}
          <br />
          {weather.temperature}
        </p>
      </div>
    </nav>
  );
}
