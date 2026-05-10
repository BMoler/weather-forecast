// Params
export type WeatherHourlyVariable =
  | "wind_speed_10m"
  | "precipitation"
  | "visibility"
  | "weather_code"
  | "precipitation_probability";

export interface WeatherForecastParams {
  latitude: number;
  longitude: number;
  hourly: WeatherHourlyVariable[];
  forecast_days?: number;
  past_days?: number;
  temperature_unit?: "celsius" | "fahrenheit";
  wind_speed_unit?: "kmh" | "ms" | "mph" | "kn";
  precipitation_unit?: "mm" | "inch";
  timezone?: string;
}

export type MarineHourlyVariable =
  | "wave_height"
  | "wind_wave_height"
  | "swell_wave_height";

export interface MarineForecastParams {
  latitude: number;
  longitude: number;
  hourly: MarineHourlyVariable[];
  forecast_days?: number;
  length_unit?: "metric" | "imperial";
  timezone?: string;
}

// Results
interface WeatherForecastHourlyUnits {
  time: string;
  wind_speed_10m: string;
  precipitation: string;
  visibility: string;
  weather_code: string;
}

interface WeatherForecastHourlyData {
  time: string[];
  wind_speed_10m: number[];
  precipitation: number[];
  visibility: number[];
  weather_code: number[];
  precipitation_probability: number[];
}

interface MarineForecastHourlyUnits {
  time: string;
  wave_height: string;
  wind_wave_height: string;
  swell_wave_height: string;
}

interface MarineForecastHourlyData {
  time: string[];
  wave_height: number[];
  wind_wave_height: number[];
  swell_wave_height: number[];
}

interface ForecastResult {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
}

export interface WeatherForecastResult extends ForecastResult {
  hourly_units: WeatherForecastHourlyUnits;
  hourly: WeatherForecastHourlyData;
}

export interface MarineForecastResult extends ForecastResult {
  hourly_units: MarineForecastHourlyUnits;
  hourly: MarineForecastHourlyData;
}

export interface OpenMeteoError {
  error: true;
  reason: string;
}

// Combined Results
export interface HourlyRecord {
  time: string;

  // Weather
  precipitation: number;
  precipitation_probability: number;
  weather_code: number;
  wind_speed_10m: number;
  visibility: number;

  // Marine
  wave_height: number;
  swell_wave_height: number;
  wind_wave_heght: number;
}

export interface CombinedForecast {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  days: Record<string, HourlyRecord[]>;
}
