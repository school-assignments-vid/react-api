"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  IconCloud,
  IconDroplet,
  IconMapPin,
  IconSearch,
  IconThermometer,
  IconWind,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForecast } from "@/hooks/useForecast";
import Image from "next/image";

function Loading() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="w-3/4 h-6 bg-muted-foreground/20" />
            <Skeleton className="w-1/2 h-4 mt-1 bg-muted-foreground/20" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <Skeleton className="size-16 rounded-full bg-muted-foreground/20 mb-4" />
            <Skeleton className="w-16 h-8 bg-muted-foreground/20" />
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex gap-2">
              <Skeleton className="size-4 bg-muted-foreground/20" />
              <Skeleton className="w-8 h-4 bg-muted-foreground/20" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="size-4 bg-muted-foreground/20" />
              <Skeleton className="w-8 h-4 bg-muted-foreground/20" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default function WeatherPage() {
  const [zipInput, setZipInput] = useState("8500");
  const [countryInput, setCountryInput] = useState("dk");
  const [query, setQuery] = useState({ zip: "8500", country: "dk" });

  const { forecast, isLoading, error } = useForecast(query.zip, query.country);

  const handleSearch = () => {
    if (!zipInput) return;
    setQuery({ zip: zipInput, country: countryInput || "dk" });
  };

  const formatDate = (dt_txt: string) => {
    const date = new Date(dt_txt);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
    };
  };

  return (
    <>
      <div className="sticky top-0 p-4 bg-surface z-50 border-b">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Weather Forecast</h1>
            <span className="text-lg underline text-secondary flex items-center gap-1">
              <IconMapPin size={18} />
              {query.zip}, {query.country.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 bg-background border rounded-md px-3 py-1 focus-within:ring-1 focus-within:ring-ring",
                !zipInput && "border-destructive"
              )}
            >
              <span className="text-sm text-muted-foreground select-none">
                Zip:
              </span>
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                className="h-7 w-24 border-none bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                placeholder="Zip..."
              />
            </div>

            <div className="flex items-center gap-2 bg-background border rounded-md px-3 py-1 focus-within:ring-1 focus-within:ring-ring">
              <span className="text-sm text-muted-foreground select-none">
                Country:
              </span>
              <input
                type="text"
                value={countryInput}
                onChange={(e) => setCountryInput(e.target.value)}
                className="h-7 w-12 border-none bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                placeholder="US"
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={isLoading || !zipInput}
              className={cn(
                "flex items-center h-9 px-4 py-1 rounded-md text-sm font-medium transition-colors",
                isLoading || !zipInput
                  ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  <IconSearch size={16} className="mr-2" />
                  Search
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="grid grid-cols-3 gap-4 p-4 pr-6">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div className="col-span-3 flex flex-col items-center justify-center text-destructive py-10 gap-2">
                <IconCloud size={48} className="opacity-20" />
                <p className="text-lg font-semibold">
                  Failed to load weather data
                </p>
                <p className="text-sm opacity-70">
                  Check if Zip Code &quot;{query.zip}&quot; is valid for country
                  &quot;
                  {query.country}&quot;.
                </p>
              </div>
            ) : forecast ? (
              forecast.list.map((item, index) => {
                const { day, time } = formatDate(item.dt_txt);
                return (
                  <Card key={`${item.dt}_${index}`}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center text-lg">
                        <span>{day}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {time}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center py-6">
                      <div className="flex items-center justify-center mb-2">
                        <Image
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                          className="size-16"
                          height={64}
                          width={64}
                        />
                      </div>
                      <div className="text-4xl font-bold tracking-tighter flex items-start">
                        {Math.round(item.main.temp)}
                        <span className="text-lg mt-1">°C</span>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize mt-1">
                        {item.weather[0].description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IconDroplet size={16} className="text-blue-500" />
                        <span>{item.main.humidity}% Hum</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IconWind size={16} className="text-slate-500" />
                        <span>{Math.round(item.wind.speed)} m/s</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2 justify-center">
                        <IconThermometer
                          size={16}
                          className="text-orange-500"
                        />
                        <span>
                          Feels Like {Math.round(item.main.feels_like)}°
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            ) : null}
          </div>
        </ScrollArea>
      </main>
    </>
  );
}
