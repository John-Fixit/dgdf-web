import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names with conflict resolution.
 * @param inputs - Class name values to combine
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number with locale separators.
 * @param value - Numeric value to format
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-NG").format(value);
}

/**
 * Formats a currency amount in Nigerian Naira.
 * @param amount - Amount in Naira
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds an absolute URL from a path using the public site URL.
 * @param path - Relative path beginning with /
 */
export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://dgdelightfound.org";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
