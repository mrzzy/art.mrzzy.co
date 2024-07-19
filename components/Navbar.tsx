/*
 * art.mrzzy.co
 * UI Components
 * Navbar
 */

"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ReactNode, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import useWindowDimensions from "@/lib/hooks";
import { MEDIUM_PX } from "@/lib/media";

/** Navigation bar items */
export enum NavItem {
  Home = "Home",
  About = "About",
  Work = "Work",
}

function NavLink({
  href,
  children,
  selected,
}: {
  href: string;
  children: ReactNode;
  selected?: boolean;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        className={
          // 60% opacity to indicate menu item is selected
          `font-normal bg-inherit ${selected ? "/60" : ""} ${buttonVariants({ variant: "link" })}`
        }
      >
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

/**
 * Renders a Navigation Bar for the site.
 * @param prop.selected Optional. Currently selected item on the Navigation Bar.
 */
export default function NavBar({ selected }: { selected?: NavItem }) {
  const [expanded, setExpanded] = useState(true);
  const {width} = useWindowDimensions();
  console.log(window.innerWidth);
  return (
    <NavigationMenu className="flex-row items-start min-w-full">
      <Button
        variant="ghost"
        className="flex-none md:hidden p-1 size-9"
        onClick={() => setExpanded(!expanded)}
      >
        <img src="/icons/menu.svg" />
      </Button>
      <div className="grow relative right-4">
        <NavigationMenuList>
          <NavLink href="/">
            <img src="/icons/art_mrzzy_co_logo.svg" alt={NavItem.Home} />
          </NavLink>
        </NavigationMenuList>
        <NavigationMenuList
          className={
            "mt-1 gap-x-16 md:flex-row " + (expanded || width >= MEDIUM_PX ? "flex-col" : "hidden")
          }
        >
          <NavLink href="/work" selected={selected === NavItem.Work}>
            {NavItem.Work}
          </NavLink>
          <NavLink href="/about" selected={selected === NavItem.About}>
            {NavItem.About}
          </NavLink>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
