#!/usr/bin/env ts-node

/**
 * Helper script for updating golf data from external sources
 *
 * This script provides a semi-automated way to:
 * 1. Fetch golf events from a data source (when available)
 * 2. Compare against existing data in status.ts
 * 3. Suggest new entries to add
 * 4. Maintain data verification and quality
 *
 * Usage:
 *   ts-node scripts/update-golf-data.ts
 *
 * Note: Factbase endpoints currently return 403 errors.
 * This script is designed to work with alternative data sources
 * or if API access becomes available.
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Golf event from external data source
 */
interface ExternalGolfEvent {
  date: string; // YYYY-MM-DD format
  location: string;
  type: 'golf' | 'arrival' | 'departure' | 'golf_arrival' | 'golf_departure';
  source: string; // URL to verification source
  description?: string;
}

/**
 * Fetch golf events from data source
 * Replace this function with actual API call when endpoint is available
 */
async function fetchGolfEvents(): Promise<ExternalGolfEvent[]> {
  // Placeholder for actual data fetching
  // When you have a working endpoint, implement the fetch logic here

  console.log('⚠️  Factbase endpoints currently blocked (403 Forbidden)');
  console.log('📝 To use this script with alternative data:');
  console.log('   1. Create a JSON file: scripts/golf-events.json');
  console.log('   2. Format: [{"date": "2025-11-09", "location": "Mar-a-Lago", "type": "golf", "source": "..."}]');
  console.log('   3. Run this script again\n');

  // Try to load from local file if it exists
  const localDataPath = path.join(__dirname, 'golf-events.json');

  if (fs.existsSync(localDataPath)) {
    console.log('✅ Found local data file: golf-events.json');
    const data = JSON.parse(fs.readFileSync(localDataPath, 'utf-8'));
    return data;
  }

  return [];
}

/**
 * Parse existing events from status.ts
 */
function parseExistingEvents(): Map<string, any> {
  const statusPath = path.join(__dirname, '..', 'data', 'status.ts');
  const statusContent = fs.readFileSync(statusPath, 'utf-8');

  // Extract events object using regex (basic parsing)
  const eventsMatch = statusContent.match(/events:\s*{([^}]+)}/s);
  if (!eventsMatch) {
    console.error('❌ Could not parse events from status.ts');
    return new Map();
  }

  const existingEvents = new Map<string, any>();

  // Parse each event entry
  const eventPattern = /"(\d{4}-\d{2}-\d{2})":\s*{\s*type:\s*"([^"]+)",\s*location:\s*"([^"]+)",\s*url:\s*"([^"]+)"/g;
  let match;

  while ((match = eventPattern.exec(statusContent)) !== null) {
    const [, date, type, location, url] = match;
    existingEvents.set(date, { type, location, url });
  }

  console.log(`📊 Found ${existingEvents.size} existing events in status.ts\n`);
  return existingEvents;
}

/**
 * Normalize location names to match existing conventions
 */
function normalizeLocation(location: string): string {
  const normalized = location.trim();

  // Map common variations to standard names
  const locationMap: { [key: string]: string } = {
    'mar-a-lago': 'Mar-a-Lago',
    'bedminster': 'Bedminster, NJ',
    'trump national bedminster': 'Bedminster, NJ',
    'sterling': 'Sterling, VA',
    'trump national golf club': 'Sterling, VA',
    'west palm beach': 'West Palm Beach, FL',
    'jupiter': 'Jupiter, FL',
    'doral': 'Doral, FL',
    'trump national doral': 'Doral, FL',
    'dc': 'Washington, DC',
    'washington': 'Washington, DC',
  };

  return locationMap[normalized.toLowerCase()] || normalized;
}

/**
 * Validate event data
 */
function validateEvent(event: ExternalGolfEvent): string[] {
  const errors: string[] = [];

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
    errors.push(`Invalid date format: ${event.date} (should be YYYY-MM-DD)`);
  }

  // Validate date is not in future
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (eventDate > today) {
    errors.push(`Future date not allowed: ${event.date}`);
  }

  // Validate type
  const validTypes = ['golf', 'arrival', 'departure', 'golf_arrival', 'golf_departure'];
  if (!validTypes.includes(event.type)) {
    errors.push(`Invalid type: ${event.type} (must be one of: ${validTypes.join(', ')})`);
  }

  // Validate source URL
  if (!event.source || !event.source.startsWith('http')) {
    errors.push(`Invalid source URL: ${event.source}`);
  }

  // Validate location is not empty
  if (!event.location || event.location.trim().length === 0) {
    errors.push('Location cannot be empty');
  }

  return errors;
}

/**
 * Compare external events with existing data and suggest updates
 */
function suggestUpdates(
  externalEvents: ExternalGolfEvent[],
  existingEvents: Map<string, any>
): { newEvents: ExternalGolfEvent[], conflicts: Array<{ date: string, existing: any, external: ExternalGolfEvent }> } {
  const newEvents: ExternalGolfEvent[] = [];
  const conflicts: Array<{ date: string, existing: any, external: ExternalGolfEvent }> = [];

  for (const event of externalEvents) {
    const existing = existingEvents.get(event.date);

    if (!existing) {
      // New event - not in current data
      newEvents.push(event);
    } else {
      // Event exists - check for conflicts
      const normalizedLocation = normalizeLocation(event.location);
      if (
        existing.type !== event.type ||
        existing.location !== normalizedLocation ||
        existing.url !== event.source
      ) {
        conflicts.push({
          date: event.date,
          existing,
          external: event
        });
      }
    }
  }

  return { newEvents, conflicts };
}

/**
 * Generate code snippet for new events
 */
function generateCodeSnippet(events: ExternalGolfEvent[]): string {
  if (events.length === 0) {
    return '';
  }

  let snippet = '// Add these events to data/status.ts in the events object:\n\n';

  for (const event of events) {
    const normalizedLocation = normalizeLocation(event.location);
    snippet += `"${event.date}": { type: "${event.type}", location: "${normalizedLocation}", url: "${event.source}" },\n`;
  }

  return snippet;
}

/**
 * Main execution
 */
async function main() {
  console.log('🏌️  Trump Golf Data Update Helper\n');
  console.log('=' .repeat(60) + '\n');

  // Fetch external events
  console.log('📥 Fetching golf events...\n');
  const externalEvents = await fetchGolfEvents();

  if (externalEvents.length === 0) {
    console.log('ℹ️  No events to process. Exiting.\n');
    return;
  }

  console.log(`✅ Retrieved ${externalEvents.length} events from data source\n`);

  // Validate events
  console.log('🔍 Validating events...\n');
  let validEvents = 0;
  let invalidEvents = 0;

  for (const event of externalEvents) {
    const errors = validateEvent(event);
    if (errors.length > 0) {
      console.log(`❌ Invalid event on ${event.date}:`);
      errors.forEach(err => console.log(`   - ${err}`));
      console.log('');
      invalidEvents++;
    } else {
      validEvents++;
    }
  }

  console.log(`✅ ${validEvents} valid events`);
  console.log(`❌ ${invalidEvents} invalid events\n`);

  // Filter to only valid events
  const validExternalEvents = externalEvents.filter(event => validateEvent(event).length === 0);

  // Parse existing events
  console.log('📖 Reading existing data...\n');
  const existingEvents = parseExistingEvents();

  // Compare and suggest updates
  console.log('🔄 Comparing data...\n');
  const { newEvents, conflicts } = suggestUpdates(validExternalEvents, existingEvents);

  // Display results
  console.log('=' .repeat(60) + '\n');
  console.log('📊 RESULTS\n');

  if (newEvents.length > 0) {
    console.log(`✨ Found ${newEvents.length} new events to add:\n`);

    newEvents.forEach(event => {
      console.log(`   ${event.date} - ${event.type} at ${normalizeLocation(event.location)}`);
    });

    console.log('\n' + '=' .repeat(60) + '\n');
    console.log('📝 CODE TO ADD:\n');
    console.log(generateCodeSnippet(newEvents));
    console.log('=' .repeat(60) + '\n');
  } else {
    console.log('✅ No new events found. Data is up to date.\n');
  }

  if (conflicts.length > 0) {
    console.log(`⚠️  Found ${conflicts.length} conflicts (manual review required):\n`);

    conflicts.forEach(({ date, existing, external }) => {
      console.log(`   📅 ${date}:`);
      console.log(`      Existing: ${existing.type} at ${existing.location}`);
      console.log(`      External: ${external.type} at ${normalizeLocation(external.location)}`);
      console.log(`      Source: ${external.source}\n`);
    });
  }

  // Verification reminders
  console.log('=' .repeat(60) + '\n');
  console.log('⚠️  IMPORTANT REMINDERS:\n');
  console.log('1. ✅ Manually verify each new event with credible sources');
  console.log('2. ✅ Check that locations match existing naming conventions');
  console.log('3. ✅ Ensure source URLs are from reputable news organizations');
  console.log('4. ✅ Update cost estimates if new locations are added');
  console.log('5. ✅ Run the build to ensure no TypeScript errors');
  console.log('6. ✅ Review the website locally before committing\n');

  console.log('=' .repeat(60) + '\n');
}

// Run the script
main().catch(error => {
  console.error('❌ Error running update script:', error);
  process.exit(1);
});
