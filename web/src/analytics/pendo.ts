// Pendo Track Events. The Pendo agent attaches the visitor and account to every event,
// so the properties here only carry the event's own details.

type TrackPropertyValue = string | number | boolean | string[];
export type TrackProperties = Record<string, TrackPropertyValue>;

declare global {
  interface Window {
    pendo?: {
      track: (eventName: string, properties?: TrackProperties) => void;
    };
  }
}

/** Sends a Track Event to Pendo. Does nothing when the Pendo agent isn't loaded, and never throws. */
export function trackEvent(eventName: string, properties: TrackProperties): void {
  try {
    window.pendo?.track(eventName, properties);
  } catch (e) {
    console.warn(`Pendo track "${eventName}" failed`, e);
  }
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Days from one "YYYY-MM-DD" date to another, counted in UTC so time zones and DST don't shift it. */
function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / MS_PER_DAY);
}

/** The trip's length in days, counting both the start and the end date. */
export function tripLengthDays(startDate: string, endDate: string): number {
  return daysBetween(startDate, endDate) + 1;
}

/** Days from today (the visitor's local date) until the trip starts. Negative for a trip that already started. */
export function daysUntilStart(startDate: string): number {
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  return daysBetween(today, startDate);
}
