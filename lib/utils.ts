/*
 * art.mrzzy.co
 * Utilities
 * Homepage
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Computes the aspect ratio given width & height */
export function aspect(width: number, height: number): number {
  return width / height;
}

/***
* Paginates a list of art pieces into pages of the given size.
* @param pieces List of art pieces to paginate
* @param size Number of art pieces per page
* @returns Array of pages, where each page is an array of art pieces
*/
export function paginate<T>(pieces: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < pieces.length; i += size) {
    pages.push(pieces.slice(i, i + size));
  }
  return pages;
}

