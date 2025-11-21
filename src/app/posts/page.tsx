"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { IconUserFilled, IconHash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface postType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type statuses = "loading" | "success" | "error";

function Loading() {
  return (
    <>
      {Array.from({ length: 30 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-4/5 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-6/8" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="flex flex-row justify-between items-center">
            <span className="flex flex-row gap-1 text-sm items-center">
              <IconHash size={16} />
              <Skeleton className="h-4 w-8 bg-muted-foreground/20" />
            </span>
            <span className="flex flex-row gap-1 text-sm items-center">
              <Skeleton className="h-4 w-8 bg-muted-foreground/20" />
              <IconUserFilled size={16} />
            </span>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

export default function PostsPage() {
  const url = "https://jsonplaceholder.typicode.com/posts";

  const [status, setStatus] = useState<statuses>("loading");
  const [posts, setposts] = useState<postType[]>([]);

  useEffect(() => {
    const fetchposts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setStatus("error");
          throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        setposts(data);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching posts:", error);
        setStatus("error");
      }
    };
    fetchposts();
  }, []);

  return (
    <>
      <div className="p-4 bg-surface z-50 border-b items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">Posts Endpoint</h1>
          <span className="text-lg underline text-secondary">{url}</span>
        </div>
      </div>
      <main className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full">
          <div className="grid grid-cols-3 gap-4 p-4 pr-6">
            {status === "loading" ? (
              <Loading />
            ) : status === "success" ? (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{post.body}</p>
                  </CardContent>
                  <CardFooter className="flex flex-row justify-between items-center">
                    <span className="flex flex-row gap-1 text-sm items-center">
                      <IconHash size={16} />
                      {post.id}
                    </span>
                    <span className="flex flex-row gap-1 text-sm items-center">
                      {post.userId}
                      <IconUserFilled size={16} />
                    </span>
                  </CardFooter>
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
