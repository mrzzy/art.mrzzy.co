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
import { ReactNode, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { MEDIUM_PX } from "@/lib/media";
import zzyLogo from "@/public/images/icons/art_mrzzy_co_logo.svg";
import ExportedImage from "next-image-export-optimizer";
import { NavItem } from "./navitem";
import { usePathname } from "next/navigation";
import { useWindowSize } from "@uidotdev/usehooks";
import { Menu } from "lucide-react";

/** Navigation link within a Navigation Bar */
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
          `font-normal text-slate-800 bg-inherit ${selected ? "/60" : ""} ${buttonVariants({ variant: "link" })}`
        }
      >
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

/**
 * Renders a Navigation Bar for the site.
 */
export function NavBar() {
  // whether the navbar is currently expanded
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    setExpanded(false);
  }, []);
  const { width } = useWindowSize();
  const pathname = usePathname();

  return (
    <NavigationMenu className="flex-row items-start min-w-full">
      <Button
        variant="ghost"
        className="flex-none md:hidden p-1 m-6 size-9 active:bg-slate-400"
        onClick={() => setExpanded(!expanded)}
      >
        <Menu />
      </Button>
      <div className="grow relative right-[2.5rem]">
        <NavigationMenuList>
          <NavLink href={NavItem.Home}>
            <ExportedImage src={zzyLogo} alt="Home" />
          </NavLink>
        </NavigationMenuList>
        <NavigationMenuList
          className={
            "mt-1 gap-x-16 md:flex-row " +
            (expanded || (width != null && width >= MEDIUM_PX)
              ? "flex-col"
              : "hidden")
          }
        >
          <NavLink href={NavItem.Gallery} selected={pathname === NavItem.Gallery}>
            Gallery
          </NavLink>
          <NavLink href={NavItem.About} selected={pathname === NavItem.About}>
            About
          </NavLink>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
