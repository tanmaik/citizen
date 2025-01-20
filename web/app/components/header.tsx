import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
async function fetchWeather(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    );
    const data = await response.json();
    if (data.weather && data.weather.length > 0) {
      return {
        description: data.weather[0].description,
        temperature: `${Math.round(data.main.temp)}°F`,
      };
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
  return { description: "", temperature: "" };
}

export default async function Header() {
  const latitude = 37.7749;
  const longitude = -122.4194;
  const weather = await fetchWeather(latitude, longitude);

  const user = await currentUser();
  console.log(user);

  return (
    <nav className="flex justify-between items-end py-4 border-b">
      <div className="text-left">
        {user ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button>login</button>
          </SignInButton>
        )}
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
