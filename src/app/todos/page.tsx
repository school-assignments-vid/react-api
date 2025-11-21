"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  IconHash,
  IconUserFilled,
  IconSquareRoundedFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface todoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type statuses = "loading" | "success" | "error";

function Loading() {
  return (
    <>
      {Array.from({ length: 30 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="rounded-b-2xl border-b">
            <CardTitle>
              <Skeleton className="w-4/5 h-6" />
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-row justify-between items-center">
            <span className="flex flex-row gap-1 text-sm items-center">
              <IconHash size={16} />
              <Skeleton className="h-4 w-8 bg-muted-foreground/20" />
            </span>
            <span className="flex flex-row gap-1 text-sm items-center">
              <Skeleton className="size-4 bg-muted-foreground/20" />
              <Skeleton className="h-4 w-16 bg-muted-foreground/20" />
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

export default function TodosPage() {
  const url = "https://jsonplaceholder.typicode.com/todos";

  const [status, setStatus] = useState<statuses>("loading");
  const [todos, setTodos] = useState<todoType[]>([]);
  type filterType = "all" | "completed" | "uncompleted";
  const [filter, setFilter] = useState<filterType>("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setStatus("error");
          throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching todos:", error);
        setStatus("error");
      }
    };
    fetchTodos();
  }, []);

  const filteredTodos =
    status === "success"
      ? todos.filter((t) => {
          if (filter === "all") return true;
          if (filter === "completed") return t.completed === true;
          return t.completed === false;
        })
      : [];

  return (
    <>
      <div className="sticky top-0 p-4 bg-surface z-50 border-b">
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Todos Endpoint</h1>
            <span className="text-lg underline text-secondary">
              {url}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Filter:</span>
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-3 py-1 rounded-md border text-sm",
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={cn(
                "px-3 py-1 rounded-md border text-sm",
                filter === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("uncompleted")}
              className={cn(
                "px-3 py-1 rounded-md border text-sm",
                filter === "uncompleted"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              Not Completed
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
              filteredTodos.map((todo) => (
                <Card key={todo.id}>
                  <CardHeader className="rounded-b-2xl border-b">
                    <CardTitle>{todo.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="flex flex-row justify-between items-center">
                    <span className="flex flex-row gap-1 text-sm items-center">
                      <IconHash size={16} />
                      {todo.id}
                    </span>
                    <span className="flex flex-row gap-1 text-sm items-center">
                      <IconSquareRoundedFilled
                        size={16}
                        className={cn(
                          todo.completed ? "text-success" : " text-destructive"
                        )}
                      />
                      <span
                        className={cn(
                          todo.completed ? "text-success" : "text-destructive"
                        )}
                      >
                        {todo.completed ? "Completed" : "Not Completed"}
                      </span>
                    </span>
                    <span className="flex flex-row gap-1 text-sm items-center">
                      {todo.userId}
                      <IconUserFilled size={16} />
                    </span>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center text-destructive">
                Failed to load todos. Please try again.
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </>
  );
}
