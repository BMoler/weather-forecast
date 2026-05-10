import type {
  MarineForecastParams,
  MarineForecastResult,
  OpenMeteoError,
  WeatherForecastParams,
  WeatherForecastResult,
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
