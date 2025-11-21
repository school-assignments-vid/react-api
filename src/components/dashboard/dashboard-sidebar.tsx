"use client";

import {
  IconFlareFilled,
  IconFile,
  IconFileFilled,
  IconHeartFilled,
  IconInfoSquareRounded,
  IconInfoSquareRoundedFilled,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavGroup } from "./nav-group";
import Link from "next/link";

const data = {
  navGeneral: [
    {
      label: "Information",
      icon: IconInfoSquareRounded,
      iconFilled: IconInfoSquareRoundedFilled,
      url: "/",
    },
  ],
  navPlaceholder: [
    {
      label: "Posts",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/posts",
    },
    {
      label: "Todos",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/todos",
    },
  ],
  navSwapi: [
    {
      label: "Starships",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/starships",
    },
  ],
  navNews: [
    {
      label: "Headlines",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/headlines",
    },
    {
      label: "News",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/news",
    },
  ],
  navWeather: [
    {
      label: "Weather",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/weather",
    },
  ],
  extra: [
    {
      label: "Image Gradient",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/gradient",
    },
    {
      label: "Spotify Status",
      icon: IconFile,
      iconFilled: IconFileFilled,
      url: "/spotify",
    },
  ],
};

export function SidebarDemo() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="bg-secondary text-secondary-foreground flex size-8 items-center justify-center rounded-lg font-bold">
            <IconFlareFilled size={18} />
          </div>
          <span className="font-semibold">School stuff</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Group 1: General */}
        <NavGroup items={data.navGeneral} />

        {/* Group 2: Placeholder */}
        <NavGroup label="Placeholder API" items={data.navPlaceholder} />

        {/* Group 3: Swapi */}
        <NavGroup label="Swapi" items={data.navSwapi} />

        {/* Group 4: News API */}
        <NavGroup label="News API" items={data.navNews} />

        {/* Group 5: OpenWeather */}
        <NavGroup label="OpenWeather" items={data.navWeather} />

        <NavGroup label="Extra" items={data.extra} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="">
                <span>Made with </span>
                <IconHeartFilled className="text-destructive" />
                <span>By Sobbing Cat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
