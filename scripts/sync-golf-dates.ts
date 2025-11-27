/**
 * Sync golf dates from rollcall_calendar.json to status.ts
 *
 * Usage: npx tsx scripts/sync-golf-dates.ts
 *
 * This script:
 * 1. Reads golf dates from rollcall_calendar.json
 * 2. Compares with current status.ts
 * 3. Reports new dates to add (doesn't auto-modify status.ts)
 */

import fs from 'fs';
import path from 'path';
import { getStatusData } from '../data/status';
import { GolfLocation } from '../types';

const TERM_START = new Date('2025-01-20');

// Location mapping from rollcall locations to GolfLocation enum
const locationMap: Record<string, GolfLocation> = {
  'Mar-a-Lago': GolfLocation.MAR_A_LAGO,
  'Palm Beach International Airport': GolfLocation.WEST_PALM,
  'The White House': GolfLocation.WASHINGTON_DC,
  'Joint Base Andrews': GolfLocation.WASHINGTON_DC,
  'South Lawn': GolfLocation.WASHINGTON_DC,
  'Trump National Golf Club Bedminster': GolfLocation.BEDMINSTER,
  'Trump National Doral Miami': GolfLocation.DORAL_FL,
  'Trump International Hotel, Las Vegas': GolfLocation.LAS_VEGAS,
  'Trump Turnberry, Girvan, Scotland': GolfLocation.SCOTLAND,
  'Trump International Golf Links Aberdeen': GolfLocation.SCOTLAND,
  'Prudential Center, Newark, NJ': GolfLocation.BEDMINSTER,
};

function mapLocation(rollcallLocation: string): GolfLocation {
  return locationMap[rollcallLocation] || GolfLocation.WASHINGTON_DC;
}

async function main() {
  console.log('🔄 Syncing golf dates from rollcall_calendar.json...\n');

  // Read rollcall calendar
  const calendarPath = path.join(process.cwd(), 'data', 'rollcall_calendar.json');
  const calendarData = JSON.parse(fs.readFileSync(calendarPath, 'utf-8'));

  // Get golf dates from rollcall
  const rollcallGolfDays = calendarData
    .filter((entry: any) => entry.day_summary?.golf === true)
    .reduce((acc: Map<string, string>, entry: any) => {
      if (!acc.has(entry.date)) {
        acc.set(entry.date, entry.location);
      }
      return acc;
    }, new Map<string, string>());

  // Get current status dates
  const statusData = getStatusData();
  const statusDates = new Set(Object.keys(statusData.events));

  // Find new dates (after term start, not in status.ts)
  const newDates: Array<{ date: string; location: string }> = [];

  rollcallGolfDays.forEach((location: string, date: string) => {
    const dateObj = new Date(date);
    if (dateObj >= TERM_START && !statusDates.has(date)) {
      newDates.push({ date, location });
    }
  });

  // Find removed dates (in status but not in rollcall)
  const removedDates: string[] = [];
  statusDates.forEach(date => {
    if (!rollcallGolfDays.has(date)) {
      removedDates.push(date);
    }
  });

  // Report results
  console.log(`📊 Rollcall calendar: ${rollcallGolfDays.size} golf dates`);
  console.log(`📊 Current status.ts: ${statusDates.size} golf dates\n`);

  if (newDates.length === 0 && removedDates.length === 0) {
    console.log('✅ All dates are in sync! No changes needed.\n');
    return;
  }

  if (newDates.length > 0) {
    console.log(`🆕 NEW DATES TO ADD (${newDates.length}):`);
    newDates.sort((a, b) => a.date.localeCompare(b.date));

    newDates.forEach(({ date, location }) => {
      const mappedLocation = mapLocation(location);
      console.log(`
        '${date}': {
            location: GolfLocation.${Object.keys(GolfLocation).find(k => GolfLocation[k as keyof typeof GolfLocation] === mappedLocation)},
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },`);
    });
    console.log('\n');
  }

  if (removedDates.length > 0) {
    console.log(`🗑️  DATES TO REMOVE (${removedDates.length}):`);
    removedDates.forEach(date => console.log(`   - ${date}`));
    console.log('\n');
  }

  console.log('📝 Copy the new entries above into data/status.ts');
  console.log('📝 Then run: npx tsx scripts/generate-stats.ts');
}

main().catch(console.error);
