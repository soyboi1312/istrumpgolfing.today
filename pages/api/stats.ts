import type { NextApiRequest, NextApiResponse } from 'next';
import { getStatusData } from '../../data/status';

/**
 * API endpoint for Trump golf statistics
 *
 * Returns JSON data about Trump's golf trips, costs, and statistics.
 * Free for journalists, researchers, and developers to use.
 *
 * @route GET /api/stats
 * @returns JSON object with golf statistics
 */

type StatsResponse = {
  termStart: string;
  currentDate: string;
  daysSinceStart: number;
  totalGolfDays: number;
  percentageGolfed: string;
  estimatedTotalCost: number;
  golfDaysByLocation: { [key: string]: number };
  recentGolfDays: Array<{
    date: string;
    location: string;
    type: string;
    source?: string;
  }>;
  metadata: {
    dataVersion: string;
    lastUpdated: string;
    attribution: string;
    website: string;
  };
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatsResponse | ErrorResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const statusData = getStatusData();
    const { events, termStart, locationCosts } = statusData;

    // Calculate days since start
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysSinceStart = Math.max(
      0,
      Math.floor((today.getTime() - termStart.getTime()) / (1000 * 60 * 60 * 24))
    );

    // Count golf days
    const golfDays = Object.values(events).filter((event) =>
      ['golf', 'golf_arrival', 'golf_departure'].includes(event.type)
    );
    const totalGolfDays = golfDays.length;

    // Calculate percentage
    const percentage =
      daysSinceStart > 0
        ? ((totalGolfDays / daysSinceStart) * 100).toFixed(1)
        : '0.0';

    // Count golf days by location
    const golfDaysByLocation: { [key: string]: number } = {};
    golfDays.forEach((event) => {
      golfDaysByLocation[event.location] =
        (golfDaysByLocation[event.location] || 0) + 1;
    });

    // Calculate total cost (counting trips, not individual days)
    const eventDates = Object.keys(events).sort();
    const trips: { location: string; endDate: string }[] = [];

    eventDates.forEach((date, index) => {
      const event = events[date];
      const eventType = event.type;

      const isEndpoint =
        eventType === 'golf_departure' ||
        eventType === 'departure' ||
        (eventType === 'golf' &&
          (index === 0 ||
            !['arrival', 'golf_arrival'].includes(
              events[eventDates[index - 1]]?.type
            )));

      if (
        isEndpoint &&
        ['golf', 'golf_arrival', 'golf_departure'].includes(eventType)
      ) {
        trips.push({ location: event.location, endDate: date });
      }
    });

    const estimatedTotalCost = trips.reduce((acc, trip) => {
      const cost = locationCosts[trip.location] || 0;
      return acc + cost;
    }, 0);

    // Get 10 most recent golf days
    const recentGolfDays = Object.entries(events)
      .filter(([_, event]) =>
        ['golf', 'golf_arrival', 'golf_departure'].includes(event.type)
      )
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .slice(0, 10)
      .map(([date, event]) => ({
        date,
        location: event.location,
        type: event.type,
        source: event.url,
      }));

    const response: StatsResponse = {
      termStart: termStart.toISOString().split('T')[0],
      currentDate: today.toISOString().split('T')[0],
      daysSinceStart,
      totalGolfDays,
      percentageGolfed: percentage,
      estimatedTotalCost,
      golfDaysByLocation,
      recentGolfDays,
      metadata: {
        dataVersion: '2.0',
        lastUpdated: new Date().toISOString(),
        attribution: 'Is Trump Golfing Today?',
        website: 'https://istrumpgolfing.today',
      },
    };

    // Enable CORS for public API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error generating stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
