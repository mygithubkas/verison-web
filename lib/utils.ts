
// Import necessary types and functions from clsx and tailwind-merge
// clsx combines class names conditionally, tailwind-merge resolves conflicts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to combine class names with Tailwind CSS
 * This allows conditional classes and resolves conflicts between Tailwind classes
 * 
 * @param inputs - Array of class values, conditions, or objects
 * @returns - Combined and optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}