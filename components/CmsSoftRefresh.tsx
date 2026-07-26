"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * After first paint, soft-refresh server components in the background so
 * ISR/on-demand revalidation can land without a second hard reload.
 * SEO HTML from the initial SSR response stays intact for crawlers.
 */
export function CmsSoftRefresh() {
  const router = useRouter();
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const timer = window.setTimeout(() => {
      router.refresh();
    }, 400);

    return () => window.clearTimeout(timer);
  }, [pathname, router]);

  return null;
}
