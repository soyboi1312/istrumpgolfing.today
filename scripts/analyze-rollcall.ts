/**
 * Analyzes rollcall_calendar.json to find missing golf/arrival/departure dates
 *
 * Usage: npx tsx scripts/analyze-rollcall.ts
 *
 * This script:
 * 1. Reads golf dates from rollcall_calendar.json
 * 2. Dynamically reads current status.ts
 * 3. Reports new dates with detailed parsing of arrivals/departures
 */

import fs from 'fs';
import path from 'path';
import { getStatusData } from '../data/status';
import { GolfLocation } from '../types';

const rollcallPath = path.join(process.cwd(), 'data', 'rollcall_calendar.json');
const rollcallData = JSON.parse(fs.readFileSync(rollcallPath, 'utf8'));

// Dynamically get existing dates from status.ts
const statusData = getStatusData();
const existingDates = new Set(Object.keys(statusData.events));

const termStart = new Date('2025-01-20');
const today = new Date();

// Helper: Extract location from detail text
function extractLocation(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('mar-a-lago')) return 'MAR_A_LAGO';
  if (lower.includes('west palm beach')) return 'WEST_PALM';
  if (lower.includes('bedminster')) return 'BEDMINSTER';
  if (lower.includes('trump national golf club washington') || lower.includes('sterling')) return 'WASHINGTON_DC';
  if (lower.includes('las vegas')) return 'LAS_VEGAS';
  if (lower.includes('doral')) return 'DORAL_FL';
  if (lower.includes('florida') || lower.includes('palm beach')) return 'MAR_A_LAGO';
  if (lower.includes('new jersey')) return 'BEDMINSTER';
  if (lower.includes('scotland') || lower.includes('turnberry') || lower.includes('aberdeen')) return 'SCOTLAND';
  return '';
}

// Helper: Check if text indicates arrival at a golf/resort location
function isArrivalToResort(text: string): boolean {
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
function isDepartureFromResort(text: string): boolean {
  const lower = text.toLowerCase();
  return lower.includes('departs') && (
    lower.includes('mar-a-lago') ||
    lower.includes('palm beach') ||
    lower.includes('bedminster') ||
    lower.includes('trump international golf') ||
    lower.includes('trump national golf')
  ) && (lower.includes('white house') || lower.includes('en route') || lower.includes('joint base'));
}

interface DayEvent {
  date: string;
  hasGolf: boolean;
  isArrival: boolean;
  isDeparture: boolean;
  locations: Set<string>;
  details: string[];
}

// Group all entries by date
const eventsByDate: Record<string, DayEvent> = {};

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
interface RelevantEvent {
  date: string;
  eventType: string;
  location: string;
  hasGolf: boolean;
  isArrival: boolean;
  isDeparture: boolean;
  details: string[];
}

const relevantEvents: RelevantEvent[] = [];

for (const [date, event] of Object.entries(eventsByDate)) {
  // Only include if golf or arrival/departure at resort location
  if (!event.hasGolf && !event.isArrival && !event.isDeparture) continue;

  // Skip if already in existing data
  if (existingDates.has(date)) continue;

  // Determine event type - only actual golf days count
  let eventType = '';
  if (event.hasGolf) eventType = 'golf';
  else if (event.isArrival) eventType = 'arrival';
  else if (event.isDeparture) eventType = 'departure';

  // Pick best location
  const locations = Array.from(event.locations);
  let location = locations[0] || 'WASHINGTON_DC';

  // Prefer more specific locations
  if (locations.includes('MAR_A_LAGO')) location = 'MAR_A_LAGO';
  else if (locations.includes('BEDMINSTER')) location = 'BEDMINSTER';
  else if (locations.includes('WASHINGTON_DC')) location = 'WASHINGTON_DC';
  else if (locations.includes('SCOTLAND')) location = 'SCOTLAND';

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

// Separate golf days from arrivals/departures
const golfDays = relevantEvents.filter(e => e.eventType === 'golf');
const otherEvents = relevantEvents.filter(e => e.eventType !== 'golf');

console.log('=== ROLLCALL CALENDAR ANALYSIS ===\n');
console.log(`📊 Total dates in rollcall with golf/arrivals/departures: ${Object.keys(eventsByDate).length}`);
console.log(`📊 Current status.ts: ${existingDates.size} golf dates`);
console.log(`🆕 New confirmed golf days: ${golfDays.length}`);
console.log(`📍 Arrivals/departures (not golf): ${otherEvents.length}\n`);

if (golfDays.length === 0 && otherEvents.length === 0) {
  console.log('✅ All dates are in sync! No changes needed.\n');
  process.exit(0);
}

if (golfDays.length > 0) {
  console.log('=== NEW GOLF DAYS TO ADD ===\n');
  for (const event of golfDays) {
    console.log(`Date: ${event.date}`);
    console.log(`  Location: ${event.location}`);
    console.log(`  Details: ${event.details.slice(0, 2).join(' | ')}`);
    console.log('');
  }

  // Generate TypeScript entries
  console.log('\n=== TYPESCRIPT ENTRIES TO ADD ===\n');
  for (const event of golfDays) {
    console.log(`        '${event.date}': {`);
    console.log(`            location: GolfLocation.${event.location},`);
    console.log(`            url: 'https://rollcall.com/factbase/trump/topic/calendar/',`);
    console.log(`            type: 'golf',`);
    console.log(`        },`);
  }

  console.log('\n📝 Copy the entries above into data/status.ts');
  console.log('📝 Then run: npm run generate\n');
}

if (otherEvents.length > 0) {
  console.log('=== ARRIVALS/DEPARTURES (not counted as golf) ===\n');
  for (const event of otherEvents) {
    console.log(`${event.date}: ${event.eventType} at ${event.location}`);
  }
  console.log('\n(These are just resort arrivals/departures - golf may have happened but wasn\'t confirmed)\n');
}
