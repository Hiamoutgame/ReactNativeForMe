import { WeatherApiResponse } from "@/constants/weather";

const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const weatherAppConfig = process.env.EXPO_PUBLIC_WEATHER_APP_KEY as string;

function buildWeatherUrl(city: string) {
  if (!weatherAppConfig) {
    throw new Error("Thiếu EXPO_PUBLIC_WEATHER_APP_KEY trong file .env.");
  }

  const encodedCity = encodeURIComponent(city.trim());

  if (weatherAppConfig.startsWith("http")) {
    const separator = weatherAppConfig.includes("?") ? "&" : "?";
    return `${weatherAppConfig}${separator}q=${encodedCity}&units=metric&lang=vi`;
  }

  return `${OPEN_WEATHER_BASE_URL}?q=${encodedCity}&appid=${weatherAppConfig}&units=metric&lang=vi`;
}

export function getWeatherIconUrl(icon?: string) {
  return icon ? `https://openweathermap.org/img/wn/${icon}@4x.png` : undefined;
}

export async function fetchCurrentWeather(
  city: string,
): Promise<WeatherApiResponse> {
  const trimmedCity = city.trim();
  let response: Response;
  response = await fetch(buildWeatherUrl(trimmedCity));

  if (response.status === 404) {
    throw new Error("Không tìm thấy thành phố này.");
  }

  if (!response.ok) {
    throw new Error("Không thể lấy dữ liệu thời tiết lúc này.");
  }

  return response.json();
}

export function formatTemperature(value: number) {
  return `${Math.round(value)}°`;
}

export function formatTimeFromUnix(seconds: number, timezoneOffset: number) {
  const date = new Date((seconds + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: true,
  });
}

export function getWindDirection(degree?: number) {
  if (degree === undefined) return "";
  const directions = [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest",
  ];
  const index =
    Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
  return directions[index];
}

export function getBackgroundImage(icon?: string) {
  if (!icon)
    return require("../../assets/weather-img/sky-cloud-blue-background.jpg");

  if (icon.includes("01"))
    return require("../../assets/weather-img/sky-cloud-blue-background.jpg"); // clear
  if (icon.includes("02") || icon.includes("03") || icon.includes("04"))
    return require("../../assets/weather-img/clouds-sky-cloudy-dark-wallpaper-preview.jpg"); // clouds
  if (icon.includes("09") || icon.includes("10"))
    return require("../../assets/weather-img/droplet-rain-rainy-raining.jpg"); // rain
  if (icon.includes("11"))
    return require("../../assets/weather-img/lightning-strike-storm-thunderstorm.jpg"); // thunderstorm
  if (icon.includes("13"))
    return require("../../assets/weather-img/christmas-new-year-background-winter.jpg"); // snow

  return require("../../assets/weather-img/moon-sky-sunrise-cyan.jpg"); // mist/default
}
