import { useCallback, useEffect, useState } from "react";
import { getCombinedForecast } from "./services";
import type { CombinedForecast } from "./types";

function App() {
  const [forecast, setForecast] = useState<CombinedForecast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getForecastData();
  }, []);

  const getForecastData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const forecastData = await getCombinedForecast(
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
      setForecast(forecastData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load forecast");
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="m-2">
      {isLoading && <div>Loading forecast…</div>}
      {error && <div>{error}</div>}
      {forecast && (
        <div className="flex">{`Lat: ${forecast.latitude}, Lon: ${forecast.longitude}`}</div>
      )}
    </div>
  );
}

export default App;
