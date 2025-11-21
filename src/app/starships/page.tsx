"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface starshipEntry {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface starship {
  count: number;
  next: string | null;
  previous: string | null;
  results: starshipEntry[];
}

type statuses = "loading" | "success" | "error";

function Loading() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="w-48 h-6 bg-muted-foreground/20" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted-foreground/20" />
                <Skeleton className="h-4 w-3/4 bg-muted-foreground/20" />
                <Skeleton className="h-4 w-1/2 bg-muted-foreground/20" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted-foreground/20" />
                <Skeleton className="h-4 w-3/4 bg-muted-foreground/20" />
                <Skeleton className="h-4 w-1/2 bg-muted-foreground/20" />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-1/3 bg-muted-foreground/20" />
              <Skeleton className="h-4 w-2/3 bg-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default function StarshipsPage() {
  const [url, setUrl] = useState<string>(
    "https://swapi.py4e.com/api/starships/"
  );

  const [status, setStatus] = useState<statuses>("loading");
  const [starships, setStarships] = useState<starship>();
  const [page, setPage] = useState<number>(1);
  const navigatingRef = useRef(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const fetchStarships = async () => {
      setStatus("loading");
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setStatus("error");
          throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        setStarships(data);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching todos:", error);
        setStatus("error");
      } finally {
        if (navigatingRef.current) navigatingRef.current = false;
        setIsNavigating(false);
      }
    };
    fetchStarships();
  }, [url]);

  const goPrev = () => {
    if (!starships?.previous) return;
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    setIsNavigating(true);
    setUrl(starships.previous);
    setPage((p) => Math.max(1, p - 1));
  };

  const goNext = () => {
    if (!starships?.next) return;
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    setIsNavigating(true);
    setUrl(starships.next);
    setPage((p) => p + 1);
  };

  const formatDate = (iso?: string) => {
    try {
      return iso ? new Date(iso).toLocaleString() : "-";
    } catch {
      return iso ?? "-";
    }
  };

  const renderUrlList = (items: string[] | undefined) => {
    if (!items || items.length === 0) return <span>None</span>;
    return (
      <div className="flex flex-col gap-1">
        {items.map((u) => (
          <a
            key={u}
            href={u}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline text-secondary"
          >
            {u}
          </a>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="sticky top-0 p-4 bg-surface z-50 border-b">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Starships Endpoint</h1>
            <span className="text-lg underline text-secondary">{url}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <button
              disabled={
                !starships?.previous || isNavigating || status === "loading"
              }
              onClick={goPrev}
              className={cn(
                "px-3 py-1 rounded-md border text-sm",
                starships?.previous && !isNavigating && status !== "loading"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted opacity-50 cursor-not-allowed"
              )}
            >
              Prev
            </button>
            <span>Page: {page}</span>
            <button
              disabled={
                !starships?.next || isNavigating || status === "loading"
              }
              onClick={goNext}
              className={cn(
                "px-3 py-1 rounded-md border text-sm",
                starships?.next && !isNavigating && status !== "loading"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted opacity-50 cursor-not-allowed"
              )}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <main className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="grid grid-cols-3 gap-4 p-4 pr-6">
            {status === "loading" ? (
              <Loading />
            ) : status === "success" ? (
              starships?.results.map((starship) => (
                <Card key={starship.url}>
                  <CardHeader>
                    <CardTitle>{starship.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>
                        <div className="mb-1">
                          <strong>Model:</strong> {starship.model}
                        </div>
                        <div className="mb-1">
                          <strong>Manufacturer:</strong> {starship.manufacturer}
                        </div>
                        <div className="mb-1">
                          <strong>Starship Class:</strong>{" "}
                          {starship.starship_class}
                        </div>
                        <div className="mb-1">
                          <strong>Cost:</strong> {starship.cost_in_credits}
                        </div>
                        <div className="mb-1">
                          <strong>Length:</strong> {starship.length}
                        </div>
                        <div className="mb-1">
                          <strong>Max Speed:</strong>{" "}
                          {starship.max_atmosphering_speed}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1">
                          <strong>Crew:</strong> {starship.crew}
                        </div>
                        <div className="mb-1">
                          <strong>Passengers:</strong> {starship.passengers}
                        </div>
                        <div className="mb-1">
                          <strong>Cargo Capacity:</strong>{" "}
                          {starship.cargo_capacity}
                        </div>
                        <div className="mb-1">
                          <strong>Consumables:</strong> {starship.consumables}
                        </div>
                        <div className="mb-1">
                          <strong>Hyperdrive:</strong>{" "}
                          {starship.hyperdrive_rating}
                        </div>
                        <div className="mb-1">
                          <strong>MGLT:</strong> {starship.MGLT}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-muted-foreground">
                      <div className="mb-2">
                        <strong>Pilots:</strong>
                        <div className="mt-1">
                          {renderUrlList(starship.pilots)}
                        </div>
                      </div>
                      <div className="mb-2">
                        <strong>Films:</strong>
                        <div className="mt-1">
                          {renderUrlList(starship.films)}
                        </div>
                      </div>
                      <div className="mb-1">
                        <strong>Created:</strong> {formatDate(starship.created)}
                      </div>
                      <div className="mb-1">
                        <strong>Edited:</strong> {formatDate(starship.edited)}
                      </div>
                      <div className="mb-1">
                        <strong>Resource URL:</strong>{" "}
                        <a
                          href={starship.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline text-secondary text-sm"
                        >
                          {starship.url}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center text-destructive">
                Failed to load posts. Please try again.
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </>
  );
}
