"use client";

import { IconAlertTriangle, IconPlayerPauseFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useState, useEffect } from "react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress?: number;
  duration?: number;
}

const fetcher = (url: string): Promise<NowPlayingData> =>
  fetch(url).then((res) => res.json());

const formatTime = (ms: number): string => {
  if (ms < 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function CurrentlyPlaying() {
  const { data, error, isLoading, mutate } = useSWR<NowPlayingData>(
    "/api/now-playing",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    if (
      data?.isPlaying &&
      data.progress !== undefined &&
      data.duration !== undefined
    ) {
      setLocalProgress(data.progress);

      const interval = setInterval(() => {
        const duration = data.duration as number;

        setLocalProgress((prevProgress) => {
          if (prevProgress >= duration) {
            clearInterval(interval);
            mutate();
            return duration;
          }

          return prevProgress + 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
    setLocalProgress(0);
    return () => {};
  }, [data?.isPlaying, data?.progress, data?.duration, mutate]);

  const displayProgress = localProgress;

  if (error) {
    return (
      <div
        className="group flex flex-row w-full max-w-xl gap-4 items-center rounded-lg p-2 border border-destructive/50"
        role="alert"
      >
        <div className="size-16 aspect-square relative rounded-lg outline-2 outline-muted bg-muted">
          <div className="size-16 aspect-square rounded-lg relative z-10 flex items-center justify-center text-destructive">
            <IconAlertTriangle size={32} />
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <span className="text-lg font-bold flex items-center gap-2 text-destructive">
            Error Loading Track
          </span>
          <div className="flex flex-row items-center gap-2 text-base font-medium">
            <span className="text-destructive/70">
              Check connection or API.
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div
        className="group flex flex-row w-full max-w-xl gap-4 items-center rounded-lg p-2 animate-pulse"
        role="status"
        aria-live="polite"
      >
        <div className="size-16 aspect-square relative rounded-lg outline-2 outline-muted bg-muted">
          <div className="size-16 aspect-square rounded-lg relative z-10 bg-accent"></div>
        </div>
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center">
            <div className="h-6 bg-accent rounded w-3/4"></div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-1">
            <div className="h-4 bg-accent rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (
    data.isPlaying &&
    data.songUrl &&
    data.albumImageUrl &&
    data.title &&
    data.artist &&
    data.album &&
    data.duration
  ) {
    const progressPercent = (displayProgress / data.duration) * 100;

    return (
      <Link
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-row w-full max-w-xl gap-4 items-center rounded-lg hover:bg-surface p-2"
      >
        <div className="size-16 aspect-square relative rounded-lg outline-2 outline-muted bg-muted">
          <div
            className="absolute inset-0 w-full h-full blur-md scale-115 rounded-lg"
            style={{
              backgroundImage: `url(${data.albumImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <Image
            src={data.albumImageUrl}
            alt={`${data.album} album cover`}
            width={64}
            height={64}
            className="rounded-lg relative z-10"
          />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <span className="text-lg font-bold flex items-center gap-2">
            {data.title}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
            </span>
          </span>
          <div className="flex flex-row items-center justify-between text-base font-medium">
            <span className="text-muted-foreground">{data.artist}</span>
            <span className="text-sm text-success font-mono tabular-nums whitespace-nowrap">
              {formatTime(displayProgress)} / {formatTime(data.duration)}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
            <div
              className="bg-success h-1.5 rounded-full transition-none"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </Link>
    );
  }

  if (
    data.songUrl &&
    data.albumImageUrl &&
    data.title &&
    data.artist &&
    data.album
  ) {
    return (
      <Link
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-row w-full max-w-xl gap-4 items-center rounded-lg hover:bg-surface p-2"
      >
        <div className="size-16 aspect-square relative rounded-lg outline-2 outline-muted bg-muted">
          <div
            className="absolute inset-0 w-full h-full blur-md scale-115 rounded-lg grayscale"
            style={{
              backgroundImage: `url(${data.albumImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <Image
            src={data.albumImageUrl}
            alt={`${data.album} album cover`}
            fill
            className="rounded-lg relative z-10 grayscale"
          />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <span className="text-lg font-bold flex items-center gap-2">
            {data.title}
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
            </span>
          </span>
          <div className="flex flex-row items-center gap-2 text-base font-medium">
            <span className="text-muted-foreground">{data.artist}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Not Listening State
  return (
    <div className="group flex flex-row w-full max-w-xl gap-4 items-center rounded-lg p-2 text-muted-foreground">
      <div className="size-16 aspect-square relative rounded-lg outline-2 outline-muted bg-muted">
        <div className="size-16 aspect-square rounded-lg relative z-10 flex items-center justify-center bg-muted-foreground/30 text-muted-foreground">
          <IconPlayerPauseFilled size={32} />
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1">
        <span className="text-lg font-bold flex items-center gap-2">
          Not Listening
        </span>
        <div className="flex flex-row items-center gap-2 text-base font-medium">
          <span className="text-muted-foreground/70">
            Spotify is currently idle.
          </span>
        </div>
      </div>
    </div>
  );
}
