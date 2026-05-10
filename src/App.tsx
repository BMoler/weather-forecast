import { useCallback, useEffect } from "react";
import { getMarineForecast, getWeatherForecast } from "./services";

function App() {
  useEffect(() => {
    getForecastData;
  }, []);

  const getForecastData = useCallback(async () => {
    const weatherForecastResult = await getWeatherForecast({
      latitude: 30.37,
      longitude: -89.09,
      hourly: ["wind_speed_10m", "precipitation", "visibility", "weather_code"],
    });

    const marineForecastResult = await getMarineForecast({
      latitude: 30.37,
      longitude: -89.09,
      hourly: ["wave_height", "wind_wave_height", "swell_wave_height"],
    });

    console.log(weatherForecastResult, marineForecastResult);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>10 Day Weather Forecast</div>
      <div>By: Blake Moler</div>
    </div>
  );
}

export default App;
