"use client";

import { OPEN_ORDER_EVENT } from "./SiteChrome";

export default function OrderButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => window.dispatchEvent(new Event(OPEN_ORDER_EVENT))} className={className}>
      {children}
    </button>
  );
}
