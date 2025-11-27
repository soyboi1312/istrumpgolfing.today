/**
 * Sync golf dates from rollcall_calendar.json to status.ts
 *
 * Usage:
 *   npx tsx scripts/sync-golf-dates.ts           # Auto-update status.ts
 *   npx tsx scripts/sync-golf-dates.ts --dry-run # Preview changes only
 *
 * This script:
 * 1. Reads golf dates from rollcall_calendar.json
 * 2. Compares with current status.ts
 * 3. Automatically adds new dates to status.ts (unless --dry-run)
 */

import fs from 'fs';
import path from 'path';
import { getStatusData } from '../data/status';
import { GolfLocation } from '../types';

const TERM_START = new Date('2025-01-20');
const DRY_RUN = process.argv.includes('--dry-run');

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
  return locationMap[rollcallLocation] || GolfLocation.MAR_A_LAGO;
}

function getLocationEnumKey(location: GolfLocation): string {
  const key = Object.keys(GolfLocation).find(
    k => GolfLocation[k as keyof typeof GolfLocation] === location
  );
  return key || 'MAR_A_LAGO';
}

async function main() {
  console.log(`🔄 Syncing golf dates from rollcall_calendar.json...${DRY_RUN ? ' (DRY RUN)' : ''}\n`);

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
  const newDates: Array<{ date: string; location: GolfLocation }> = [];

  rollcallGolfDays.forEach((location: string, date: string) => {
    const dateObj = new Date(date);
    if (dateObj >= TERM_START && !statusDates.has(date)) {
      newDates.push({ date, location: mapLocation(location) });
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

  // Sort new dates by date
  newDates.sort((a, b) => b.date.localeCompare(a.date));

  if (newDates.length > 0) {
    console.log(`🆕 NEW DATES TO ADD (${newDates.length}):`);
    newDates.forEach(({ date, location }) => {
      console.log(`   + ${date} at ${getLocationEnumKey(location)}`);
    });
    console.log('');

    if (!DRY_RUN) {
      // Auto-update status.ts
      const statusPath = path.join(process.cwd(), 'data', 'status.ts');
      let statusContent = fs.readFileSync(statusPath, 'utf-8');

      // Find the events object and insert new entries after "events: {"
      const eventsStart = statusContent.indexOf('events: {');
      if (eventsStart === -1) {
        console.error('❌ Could not find "events: {" in status.ts');
        process.exit(1);
      }

      // Find the position right after "events: {"
      const insertPos = statusContent.indexOf('{', eventsStart) + 1;

      // Generate new entries
      const newEntries = newDates.map(({ date, location }) => `
        '${date}': {
            location: GolfLocation.${getLocationEnumKey(location)},
            url: 'url: 'https://rollcall.com/factbase/trump/topic/calendar',
            type: 'golf',
        },`).join('');

      // Insert new entries
      statusContent = statusContent.slice(0, insertPos) + newEntries + statusContent.slice(insertPos);

      fs.writeFileSync(statusPath, statusContent);
      console.log(`✅ Added ${newDates.length} new date(s) to status.ts\n`);
    }
  }

  if (removedDates.length > 0) {
    console.log(`⚠️  DATES IN STATUS.TS BUT NOT IN ROLLCALL (${removedDates.length}):`);
    removedDates.forEach(date => console.log(`   - ${date}`));
    console.log('\n(These may have been manually added - review before removing)\n');
  }

  if (DRY_RUN) {
    console.log('📝 Run without --dry-run to auto-update status.ts');
  } else if (newDates.length > 0) {
    console.log('📝 Now run: npm run generate');
  }
}

main().catch(console.error);
