import type {
  CombinedForecast,
  HourlyRecord,
  MarineForecastParams,
  MarineForecastResult,
  MarineHourlyVariable,
  OpenMeteoError,
  WeatherForecastParams,
  WeatherForecastResult,
  WeatherHourlyVariable,
} from "./types";

export const getWeatherForecast = async (
  params: WeatherForecastParams,
): Promise<WeatherForecastResult> => {
  const weatherForecastUrl = "https://api.open-meteo.com/v1/forecast";

  const searchParams = new URLSearchParams({
    latitude: String(params.latitude),
    longitude: String(params.longitude),
    hourly: params.hourly.join(","),
    forecast_days: String(params.forecast_days ?? 10),
    wind_speed_unit: "kn",
  }).toString();

  const response = await fetch(`${weatherForecastUrl}?${searchParams}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error((result as OpenMeteoError).reason);
  }

  return result as WeatherForecastResult;
};

export const getMarineForecast = async (
  params: MarineForecastParams,
): Promise<MarineForecastResult> => {
  const marineForecastUrl = "https://marine-api.open-meteo.com/v1/marine";

  const searchParams = new URLSearchParams({
    latitude: String(params.latitude),
    longitude: String(params.longitude),
    hourly: params.hourly.join(","),
    forecast_days: String(params.forecast_days ?? 10),
  }).toString();

  const response = await fetch(`${marineForecastUrl}?${searchParams}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error((result as OpenMeteoError).reason);
  }

  return result as MarineForecastResult;
};

export const getCombinedForecast = async (
  latitude: number,
  longitude: number,
  forecastDays: number = 10,
  weatherVariables: WeatherHourlyVariable[],
  marineVariables: MarineHourlyVariable[],
): Promise<CombinedForecast> => {
  const [weatherResult, marineResult] = await Promise.allSettled([
    getWeatherForecast({
      latitude,
      longitude,
      hourly: weatherVariables,
      forecast_days: forecastDays,
      wind_speed_unit: "kn",
    }),
    getMarineForecast({
      latitude,
      longitude,
      hourly: marineVariables,
      forecast_days: forecastDays,
    }),
  ]);

  if (weatherResult.status === "rejected") {
    throw new Error(`Weather fetch failed: ${weatherResult.reason}`);
  }
  const weather = weatherResult.value;

  if (marineResult.status === "rejected") {
    throw new Error(`Marine fetch failed: ${marineResult.reason}`);
  }
  const marine = marineResult.value;

  // Full combined hourly record of both results
  const hours: HourlyRecord[] = weather.hourly.time.map((t, i) => ({
    time: t,
    precipitation: (weather.hourly.precipitation as number[])[i],
    precipitation_probability: (
      weather.hourly.precipitation_probability as number[]
    )[i],
    weather_code: (weather.hourly.weather_code as number[])[i],
    wind_speed_10m: (weather.hourly.wind_speed_10m as number[])[i],
    visibility: (weather.hourly.visibility as number[])[i],
    wave_height: (marine?.hourly.wave_height as number[])?.[i],
    swell_wave_height: (marine?.hourly.swell_wave_height as number[])?.[i],
    wind_wave_heght: (marine?.hourly.wind_wave_height as number[])?.[i],
  }));

  // Group by day
  const grouped: Record<string, HourlyRecord[]> = {};
  for (const h of hours) {
    const date = h.time.slice(0, 10);
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(h);
  }

  return {
    latitude: weather.latitude,
    longitude: weather.longitude,
    elevation: weather.elevation,
    timezone: weather.timezone,
    days: grouped,
  };
};
