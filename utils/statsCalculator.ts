// utils/statsCalculator.ts
import { Events, isGolfEventType } from '../types';

export interface GolfStats {
  totalCost: number;
  daysGolfed: number;
  trips: { location: string; startDate: string; endDate: string; days: number }[];
}

/**
 * Calculates the difference in days between two date strings (YYYY-MM-DD)
 */
const daysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
};

export const calculateGolfStats = (
  events: Events,
  locationCosts: Record<string, number>
): GolfStats => {
  // 1. Filter to only golf events and sort by date
  const golfDays = Object.entries(events)
    .filter(([_, event]) => isGolfEventType(event.type))
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));

  const daysGolfed = golfDays.length;

  // 2. Group consecutive days at the same location into trips
  // A new trip starts when:
  // - There's a gap of more than 1 day between golf days
  // - OR the location changes
  const trips: { location: string; startDate: string; endDate: string; days: number }[] = [];

  golfDays.forEach(([date, event], index) => {
    const previousEntry = index > 0 ? golfDays[index - 1] : null;

    const isNewTrip = !previousEntry ||
      daysBetween(previousEntry[0], date) > 1 ||
      previousEntry[1].location !== event.location;

    if (isNewTrip) {
      // Start a new trip
      trips.push({
        location: event.location,
        startDate: date,
        endDate: date,
        days: 1
      });
    } else {
      // Extend the current trip
      const currentTrip = trips[trips.length - 1];
      currentTrip.endDate = date;
      currentTrip.days++;
    }
  });

  // 3. Calculate total cost based on golf days
  // locationCosts are per-day costs (GAO trip cost ÷ avg trip length)
  const totalCost = golfDays.reduce((acc, [_, event]) => {
    return acc + (locationCosts[event.location] || 0);
  }, 0);

  return { daysGolfed, totalCost, trips };
};
