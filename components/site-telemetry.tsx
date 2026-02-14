'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';

type TelemetryPayload = Record<string, unknown>;

function send(endpoint: string, payload: TelemetryPayload) {
  const body = JSON.stringify({
    ...payload,
    ts: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  });
}

export function SiteTelemetry() {
  const pathname = usePathname();
  const hasReportedLcp = useRef(false);
  const sessionId = useMemo(() => crypto.randomUUID(), []);

  useEffect(() => {
    send('/api/analytics', {
      type: 'page_view',
      pathname,
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      sessionId,
    });
  }, [pathname, sessionId]);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      send('/api/errors', {
        type: 'error',
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack || null,
        pathname: window.location.pathname,
        sessionId,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      send('/api/errors', {
        type: 'unhandledrejection',
        reason: String(event.reason),
        pathname: window.location.pathname,
        sessionId,
      });
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, [sessionId]);

  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint' && !hasReportedLcp.current) {
          hasReportedLcp.current = true;
          send('/api/analytics', {
            type: 'web_vital',
            metric: 'LCP',
            value: Math.round(entry.startTime),
            pathname: window.location.pathname,
            sessionId,
          });
        }
      }
    });

    observer.observe({ type: 'largest-contentful-paint', buffered: true });
    return () => observer.disconnect();
  }, [sessionId]);

  return null;
}
