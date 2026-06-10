export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
};

export type WindInfo = {
  speed: number;
  deg?: number;
};

export type WeatherApiResponse = {
  id: number;
  name: string;
  cod: number;
  dt: number;
  timezone: number;
  visibility?: number;
  weather: WeatherCondition[];
  main: MainWeather;
  wind: WindInfo;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
};
