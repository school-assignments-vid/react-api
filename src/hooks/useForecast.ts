import useSWR from "swr";
import { ForecastResponse } from "../interfaces/weather";

async function fetcher(url: string): Promise<ForecastResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return res.json();
}

export function useForecast(
  zipCode: string | null,
  countryCode: string = "dk"
) {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

  const url = zipCode
    ? `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},${countryCode}&appid=${API_KEY}&units=metric`
    : null;

  const { data, error, isLoading } = useSWR<ForecastResponse>(url, fetcher);

  return {
    forecast: data,
    isLoading,
    error,
  };
}
