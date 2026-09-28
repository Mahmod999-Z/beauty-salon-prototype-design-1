const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const windows: Record<string, [number, number] | null> = {
  Mon: null,
  Tue: [9 * 60, 18 * 60],
  Wed: [9 * 60, 18 * 60],
  Thu: [9 * 60, 18 * 60],
  Fri: [9 * 60, 18 * 60],
  Sat: [9 * 60, 17 * 60],
  Sun: null,
};

export const rowForDay: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 1,
  Thu: 1,
  Fri: 1,
  Sat: 2,
  Sun: 3,
};

export type Status = {
  open: boolean;
  progress: number;
  todayRow: number;
  remainingLabel: string;
};

function formatCountdown(totalMinutes: number, prefix: string) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const parts = h > 0 ? [`${h}u`, `${m}m`] : [`${m}m`];
  return `${prefix} ${parts.join(" ")}`;
}

export function readStatus(now: Date): Status {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  const span = windows[weekday];
  const mins = hour * 60 + minute;
  const open = span ? mins >= span[0] && mins < span[1] : false;
  const progress = span
    ? Math.min(1, Math.max(0, (mins - span[0]) / (span[1] - span[0])))
    : 0;

  let remainingLabel = "";
  const startIndex = order.indexOf(weekday);

  if (open && span) {
    remainingLabel = formatCountdown(span[1] - mins, "Sluit over");
  } else if (startIndex >= 0) {
    for (let offset = 0; offset <= 7; offset++) {
      const dayCode = order[(startIndex + offset) % 7];
      const daySpan = windows[dayCode];
      if (!daySpan) continue;
      if (offset === 0) {
        if (mins < daySpan[0]) {
          remainingLabel = formatCountdown(daySpan[0] - mins, "Opent over");
          break;
        }
        continue;
      }
      const minsUntil = offset * 1440 - mins + daySpan[0];
      remainingLabel = formatCountdown(minsUntil, "Opent over");
      break;
    }
  }

  return { open, progress, todayRow: rowForDay[weekday] ?? -1, remainingLabel };
}
