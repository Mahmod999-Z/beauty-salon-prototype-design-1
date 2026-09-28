"use client";

import { useEffect, useState } from "react";
import { readStatus, type Status } from "@/lib/hours-status";

export function OpenBadge() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(readStatus(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-paper/30 px-3 py-1 type-label text-paper/80 backdrop-blur-sm">
      <span className="relative flex h-1.5 w-1.5">
        {status.open ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-oak opacity-75" />
        ) : null}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            status.open ? "bg-oak" : "bg-paper/40"
          }`}
        />
      </span>
      {status.open ? "Nu open" : "Nu gesloten"}
    </span>
  );
}
