"use client";

import { Toaster } from "sonner";

/**
 * Global toast host for client-side notifications.
 */
export function AppToaster(): React.ReactElement {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        className: "font-sans",
      }}
    />
  );
}
