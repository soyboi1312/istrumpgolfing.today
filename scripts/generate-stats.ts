// scripts/generate-stats.ts
import fs from 'fs';
import path from 'path';
import { getStatusData } from '../data/status';
import { calculateGolfStats } from '../utils/statsCalculator'; // Use shared logic

console.log('Generating stats.json...');

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

  // USE UTILITY: Get consistent stats
  const stats = calculateGolfStats(events, locationCosts);

  // Calculate percentage
  const percentage =
    daysSinceStart > 0
      ? ((stats.daysGolfed / daysSinceStart) * 100).toFixed(1)
      : '0.0';

  // Count golf days by location (Additional logic specific to this script)
  const golfDaysByLocation: { [key: string]: number } = {};
  Object.values(events).forEach((event) => {
    if (['golf', 'golf_arrival', 'golf_departure'].includes(event.type)) {
       golfDaysByLocation[event.location] = (golfDaysByLocation[event.location] || 0) + 1;
    }
  });

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

  const response = {
    termStart: termStart.toISOString().split('T')[0],
    currentDate: today.toISOString().split('T')[0],
    daysSinceStart,
    totalGolfDays: stats.daysGolfed,
    percentageGolfed: percentage,
    estimatedTotalCost: stats.totalCost,
    golfDaysByLocation,
    recentGolfDays,
    metadata: {
      dataVersion: '2.0',
      lastUpdated: new Date().toISOString(),
      attribution: 'Is Trump Golfing Today?',
      website: 'https://istrumpgolfing.today',
    },
  };

  // Write to public/stats.json
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(
    path.join(publicDir, 'stats.json'), 
    JSON.stringify(response, null, 2)
  );

  console.log('✅ stats.json generated successfully!');
} catch (error) {
  console.error('❌ Error generating stats:', error);
  process.exit(1);
}
