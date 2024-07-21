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
