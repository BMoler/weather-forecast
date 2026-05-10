import { useCallback, useEffect } from "react";
import { getCombinedForecast } from "./services";

function App() {
  useEffect(() => {
    getForecastData();
  }, []);

  const getForecastData = useCallback(async () => {
    const forecast = await getCombinedForecast(
      30.3674,
      -89.0928,
      10,
      [
        "wind_speed_10m",
        "precipitation",
        "visibility",
        "weather_code",
        "precipitation_probability",
      ],
      ["wave_height", "wind_wave_height", "swell_wave_height"],
    );

    console.log(forecast);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>10 Day Weather Forecast</div>
      <div>By: Blake Moler</div>
    </div>
  );
}

export default App;
