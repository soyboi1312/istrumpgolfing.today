// utils/statsCalculator.ts
import { Events, isGolfEventType } from '../types';

export interface GolfStats {
  totalCost: number;
  daysGolfed: number;
}

export const calculateGolfStats = (
  events: Events,
  locationCosts: Record<string, number>
): GolfStats => {
  // Filter to only golf events
  const golfDays = Object.entries(events)
    .filter(([_, event]) => isGolfEventType(event.type));

  const daysGolfed = golfDays.length;

  // Calculate total cost based on golf days
  // locationCosts are per-day costs (GAO trip cost ÷ avg trip length)
  const totalCost = golfDays.reduce((acc, [_, event]) => {
    return acc + (locationCosts[event.location] || 0);
  }, 0);

  return { daysGolfed, totalCost };
};
