// utils/statsCalculator.ts
import { Events, EventType, GOLF_EVENT_TYPES, isGolfEventType } from '../types';

export interface GolfStats {
  totalCost: number;
  daysGolfed: number;
  trips: { location: string; endDate: string }[];
}

export const calculateGolfStats = (
  events: Events,
  locationCosts: Record<string, number>
): GolfStats => {
  // 1. Calculate Days Golfed
  const daysGolfed = Object.values(events).filter((e) =>
    isGolfEventType(e.type)
  ).length;

  // 2. Calculate Trips & Cost
  const eventDates = Object.keys(events).sort((a, b) => a.localeCompare(b));
  const trips: { location: string; endDate: string }[] = [];

  eventDates.forEach((date, index) => {
    const event = events[date];
    const eventType = event.type;
    
    // Look back logic to determine if this is the end of a trip
    const previousDate = index > 0 ? eventDates[index - 1] : null;
    const previousEvent = previousDate ? events[previousDate] : null;

    const isEndpoint =
      eventType === 'golf_departure' ||
      eventType === 'departure' ||
      (eventType === 'golf' &&
        (!previousEvent || !['arrival', 'golf_arrival'].includes(previousEvent.type)));

    if (isEndpoint && isGolfEventType(eventType)) {
      trips.push({ location: event.location, endDate: date });
    }
  });

  const totalCost = trips.reduce((acc, trip) => {
    return acc + (locationCosts[trip.location] || 0);
  }, 0);

  return { daysGolfed, totalCost, trips };
};
