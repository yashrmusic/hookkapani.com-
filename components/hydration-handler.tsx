'use client';

import { useEffect } from 'react';

export function HydrationHandler() {
  useEffect(() => {
    // Clear the hydration timeout when component mounts
    if (typeof window !== 'undefined' && window.__hydration_timeout) {
      clearTimeout(window.__hydration_timeout);
      delete window.__hydration_timeout;
    }
  }, []);

  return null;
}

// Add type declaration for the global window object
declare global {
  interface Window {
    __hydration_timeout?: ReturnType<typeof setTimeout>;
  }
}
