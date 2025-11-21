"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  {
    title: "Todos Endpoint",
    shortDescription: "Test endpoint for todo items management",
    longDescription:
      "A testing endpoint that demonstrates CRUD operations on todo items using the JSONPlaceholder API. Useful for prototyping and development.",
    category: "Placeholder API",
    url: "/todos",
  },
  {
    title: "Posts Endpoint",
    shortDescription: "Test endpoint for blog posts",
    longDescription:
      "A testing endpoint that showcases blog post handling using the JSONPlaceholder API. Includes features for viewing and managing sample blog posts.",
    category: "Placeholder API",
    url: "/posts",
  },
  {
    title: "SWAPI Endpoint",
    shortDescription: "Test endpoint SWAPI Starships",
    longDescription:
      "An interface to the Star Wars API (SWAPI) demonstrating fetching and paginating starship data (model, manufacturer, crew, cargo capacity). Useful for learning API integration, pagination, and handling loading / error states.",
    category: "SWAPI API",
    url: "/starships",
  },
];

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(links.map((link) => link.category)));
  const filteredLinks = selectedCategory
    ? links.filter((link) => link.category === selectedCategory)
    : links;

  return (
    <main className="m-4 space-y-4">
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">Filter:</span>
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            "px-3.5 py-1.5 rounded-md border text-sm",
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-3.5 py-1.5 rounded-md border text-sm",
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {filteredLinks.map((link) => (
          <Card key={link.url}>
            <CardHeader>
              <CardTitle>{link.title}</CardTitle>
              <CardDescription>{link.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-base mb-4">{link.longDescription}</p>
              <span className="text-xs text-muted-foreground py-1 px-2 rounded-full bg-muted border">
                {link.category}
              </span>
            </CardContent>
            <CardFooter asChild>
              <Link
                href={link.url}
                className="flex items-center justify-end gap-1 hover:text-secondary text-sm"
              >
                Open Page
                <IconArrowUpRight size={16} />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
