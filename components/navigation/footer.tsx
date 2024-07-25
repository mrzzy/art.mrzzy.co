/*
 * art.mrzzy.co
 * UI Components
 * Footer
 */

import Link from "next/link";
import { NavItem } from "./navitem";
import Contact from "@/components/ui/contact";

/** Renders a Footer with navigational links the site. */
export function Footer() {
  return (
    <footer className="flex flex-row justify-center gap-x-4 text-xs text-slate-600 items-center">
      <div>© {new Date().getFullYear()} Zhanyan</div>
      <Link href={NavItem.Home}>Home</Link>
      <Link href={NavItem.Gallery}>Gallery</Link>
      <Link href={NavItem.About}>About</Link>
      <Contact />
    </footer>
  );
}
