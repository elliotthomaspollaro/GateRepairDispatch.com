/* ─── Global type declarations ─── */

interface Window {
  gtag: (
    command: string,
    targetOrEvent: string,
    params?: Record<string, unknown>
  ) => void;
  dataLayer: Array<unknown>;
}
