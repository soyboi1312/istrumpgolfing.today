// scripts/analyze-rollcall.js
// Analyzes rollcall_calendar.json to find missing arrival/departure dates

const fs = require('fs');
const path = require('path');

const rollcallPath = path.join(__dirname, '../data/rollcall_calendar.json');
const rollcallData = JSON.parse(fs.readFileSync(rollcallPath, 'utf8'));

// Existing events in status.ts (hardcoded for comparison)
const existingDates = new Set([
  '2025-11-16', '2025-11-15', '2025-11-14', '2025-11-09', '2025-11-08', '2025-11-07', '2025-11-01',
  '2025-10-19', '2025-10-18', '2025-10-17', '2025-10-11', '2025-10-04',
  '2025-09-28', '2025-09-27', '2025-09-20', '2025-09-13', '2025-09-06', '2025-09-01',
  '2025-08-31', '2025-08-30', '2025-08-24', '2025-08-23', '2025-08-17', '2025-08-16', '2025-08-10', '2025-08-09', '2025-08-03', '2025-08-02', '2025-08-01',
  '2025-07-29', '2025-07-27', '2025-07-26', '2025-07-25', '2025-07-20', '2025-07-19', '2025-07-12', '2025-07-06', '2025-07-05',
  '2025-06-29', '2025-06-28', '2025-06-01',
  '2025-05-31', '2025-05-26', '2025-05-25', '2025-05-18', '2025-05-10', '2025-05-04', '2025-05-03', '2025-05-02', '2025-05-01',
  '2025-04-20', '2025-04-19', '2025-04-13', '2025-04-12', '2025-04-11', '2025-04-06', '2025-04-05', '2025-04-04', '2025-04-03',
  '2025-03-30', '2025-03-29', '2025-03-28', '2025-03-23', '2025-03-22', '2025-03-21', '2025-03-16', '2025-03-15', '2025-03-14', '2025-03-09', '2025-03-08', '2025-03-07', '2025-03-02', '2025-03-01', '2025-02-28',
  '2025-02-19', '2025-02-18', '2025-02-17', '2025-02-15', '2025-02-14', '2025-02-09', '2025-02-08', '2025-02-07', '2025-02-02', '2025-02-01', '2025-01-31',
  '2025-01-27', '2025-01-26', '2025-01-25'
]);

const termStart = new Date('2025-01-20');
const today = new Date();

// Helper: Extract location from detail text
function extractLocation(text) {
  const lower = text.toLowerCase();
  if (lower.includes('west palm beach') || lower.includes('mar-a-lago')) return 'WEST_PALM';
  if (lower.includes('bedminster')) return 'BEDMINSTER';
  if (lower.includes('trump national golf club washington') || lower.includes('sterling')) return 'WASHINGTON_DC';
  if (lower.includes('las vegas')) return 'LAS_VEGAS';
  if (lower.includes('doral')) return 'DORAL_FL';
  if (lower.includes('florida') || lower.includes('palm beach')) return 'FLORIDA';
  if (lower.includes('new jersey')) return 'NEW_JERSEY';
  if (lower.includes('scotland') || lower.includes('turnberry')) return 'SCOTLAND';
  return '';
}

// Helper: Check if text indicates arrival at a golf/resort location
function isArrivalToResort(text) {
  const lower = text.toLowerCase();
  return lower.includes('arrives') && (
    lower.includes('mar-a-lago') ||
    lower.includes('palm beach') ||
    lower.includes('bedminster') ||
    lower.includes('trump international golf') ||
    lower.includes('trump national golf')
  );
}

// Helper: Check if text indicates departure from a golf/resort location
function isDepartureFromResort(text) {
  const lower = text.toLowerCase();
  return lower.includes('departs') && (
    lower.includes('mar-a-lago') ||
    lower.includes('palm beach') ||
    lower.includes('bedminster') ||
    lower.includes('trump international golf') ||
    lower.includes('trump national golf')
  ) && (lower.includes('white house') || lower.includes('en route') || lower.includes('joint base'));
}

// Group all entries by date
const eventsByDate = {};

for (const entry of rollcallData) {
  const date = entry.date;
  if (!date) continue;

  const entryDate = new Date(date);
  if (entryDate < termStart || entryDate > today) continue;

  if (!eventsByDate[date]) {
    eventsByDate[date] = {
      date,
      hasGolf: false,
      isArrival: false,
      isDeparture: false,
      locations: new Set(),
      details: []
    };
  }

  const dayInfo = entry.day_summary || {};
  const tags = entry.tags || {};
  const details = Array.isArray(entry.details) ? entry.details : (entry.details ? [entry.details] : []);

  // Check for golf tag
  if (dayInfo.golf || tags.golf) {
    eventsByDate[date].hasGolf = true;
  }

  // Parse details
  for (const detail of details) {
    const text = typeof detail === 'string' ? detail : (detail.text || '');
    if (!text) continue;

    eventsByDate[date].details.push(text);

    const location = extractLocation(text);
    if (location) eventsByDate[date].locations.add(location);

    // Check for golf club arrival/visit (implies golf)
    if (text.toLowerCase().includes('arrives') && text.toLowerCase().includes('golf club')) {
      eventsByDate[date].hasGolf = true;
    }

    // Check arrival to resort (Mar-a-Lago, Bedminster, etc)
    if (isArrivalToResort(text)) {
      eventsByDate[date].isArrival = true;
    }

    // Check departure from resort
    if (isDepartureFromResort(text)) {
      eventsByDate[date].isDeparture = true;
    }
  }
}

// Convert to array and filter for relevant events
const relevantEvents = [];

for (const [date, event] of Object.entries(eventsByDate)) {
  // Only include if golf or arrival/departure at resort location
  if (!event.hasGolf && !event.isArrival && !event.isDeparture) continue;

  // Skip if already in existing data
  if (existingDates.has(date)) continue;

  // Determine event type and location
  let eventType = '';
  if (event.hasGolf && event.isArrival) eventType = 'golf_arrival';
  else if (event.hasGolf && event.isDeparture) eventType = 'golf_departure';
  else if (event.hasGolf) eventType = 'golf';
  else if (event.isArrival) eventType = 'arrival';
  else if (event.isDeparture) eventType = 'departure';

  // Pick best location
  const locations = Array.from(event.locations);
  let location = locations[0] || 'UNKNOWN';

  // Prefer more specific locations
  if (locations.includes('WEST_PALM')) location = 'WEST_PALM';
  else if (locations.includes('BEDMINSTER')) location = 'BEDMINSTER';
  else if (locations.includes('WASHINGTON_DC')) location = 'WASHINGTON_DC';

  relevantEvents.push({
    date,
    eventType,
    location,
    hasGolf: event.hasGolf,
    isArrival: event.isArrival,
    isDeparture: event.isDeparture,
    details: event.details.slice(0, 5)
  });
}

// Sort by date descending
relevantEvents.sort((a, b) => b.date.localeCompare(a.date));

console.log('=== ROLLCALL CALENDAR ANALYSIS ===\n');
console.log('Total unique dates with golf/arrivals/departures:', Object.keys(eventsByDate).length);
console.log('New events (not in status.ts):', relevantEvents.length);

console.log('\n=== NEW EVENTS TO ADD ===\n');
for (const event of relevantEvents) {
  console.log(`Date: ${event.date}`);
  console.log(`  Type: ${event.eventType}`);
  console.log(`  Location: ${event.location}`);
  console.log(`  Golf: ${event.hasGolf}, Arrival: ${event.isArrival}, Departure: ${event.isDeparture}`);
  console.log(`  Details: ${event.details.slice(0, 2).join(' | ')}`);
  console.log('');
}

// Generate TypeScript entries
if (relevantEvents.length > 0) {
  console.log('\n=== TYPESCRIPT ENTRIES TO ADD ===\n');
  for (const event of relevantEvents) {
    console.log(`        '${event.date}': {`);
    console.log(`            location: GolfLocation.${event.location},`);
    console.log(`            url: 'https://rollcall.com/factbase/trump/topic/calendar/',`);
    console.log(`            type: '${event.eventType}',`);
    console.log(`        },`);
  }
}
