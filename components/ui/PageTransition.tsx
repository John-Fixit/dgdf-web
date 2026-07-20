"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Route-aware content wrapper. No opacity gating — keeps pages visible
 * even when client bundles fail to load.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  return <div key={pathname}>{children}</div>;
}
