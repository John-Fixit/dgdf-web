import type { ReactNode } from "react";

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Simple content wrapper. Avoids keying by pathname so soft RSC refreshes
 * do not force a full remount of every page section.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return <div>{children}</div>;
}
