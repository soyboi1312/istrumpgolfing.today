# Data Update Scripts

This directory contains helper scripts for semi-automated updates to the Trump golf tracker data.

## Current Status

**Factbase Endpoints**: Both JSON and CSV endpoints are currently blocked (403 Forbidden):
- `https://media-cdn.factba.se/rss/json/trump/calendar-full.json` ❌
- `https://media-cdn.factba.se/rss/csv/trump/calendar.csv` ❌

## Semi-Automated Workflow

Since automated fetching is not currently possible, this script provides a semi-automated workflow:

### Option 1: Manual Data File

1. Create a file `golf-events.json` in this directory (use `golf-events.example.json` as template)
2. Add new golf events in the following format:
   ```json
   [
     {
       "date": "2025-11-09",
       "location": "Mar-a-Lago",
       "type": "golf",
       "source": "https://poolreport.example.com/..."
     }
   ]
   ```
3. Run the script:
   ```bash
   ts-node scripts/update-golf-data.ts
   ```
4. Review the suggested code additions
5. Manually verify each event with source links
6. Copy suggested code to `data/status.ts`
7. Test locally and commit

### Option 2: Alternative Data Source

If you find an alternative data source (API or RSS feed):

1. Edit `update-golf-data.ts`
2. Update the `fetchGolfEvents()` function with your data fetching logic
3. Ensure the function returns events in the `ExternalGolfEvent` format
4. Run the script to get automated suggestions

### Option 3: GitHub Actions (Future)

When a reliable data source becomes available, you can set up automated daily checks:

```yaml
# .github/workflows/update-golf-data.yml
name: Update Golf Data

on:
  schedule:
    - cron: '0 12 * * *'  # Daily at noon UTC
  workflow_dispatch:  # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: ts-node scripts/update-golf-data.ts
      # Add logic to create PR if new events found
```

## Event Types

The script recognizes these event types:

- `golf`: Confirmed golfing activity
- `arrival`: Arrived at golf property (no confirmed golf)
- `departure`: Departed from golf property
- `golf_arrival`: Arrived and golfed on same day
- `golf_departure`: Golfed and departed on same day

## Location Normalization

The script automatically normalizes location names to match existing conventions:

| Input Variations | Normalized Output |
|-----------------|-------------------|
| "mar-a-lago", "Mar-A-Lago" | "Mar-a-Lago" |
| "bedminster", "trump national bedminster" | "Bedminster, NJ" |
| "sterling", "trump national golf club" | "Sterling, VA" |
| "west palm beach" | "West Palm Beach, FL" |
| "jupiter" | "Jupiter, FL" |
| "doral", "trump national doral" | "Doral, FL" |
| "dc", "washington" | "Washington, DC" |

## Validation Rules

The script validates:

- ✅ Date format is YYYY-MM-DD
- ✅ Date is not in the future
- ✅ Event type is valid
- ✅ Source URL is provided and valid
- ✅ Location is not empty

## Cost Estimates

If you add a new location that's not in the cost database, remember to update `data/status.ts`:

```typescript
locationCosts: {
  "New Location": 0,  // Add estimated cost per trip
  // ...existing locations
}
```

### Cost Guidelines

- **Florida trips** (Mar-a-Lago, West Palm Beach, Jupiter, Doral): $3,400,000/trip
  - Based on GAO-19-178 report
- **Bedminster, NJ**: $350,000/trip
  - Close to DC, minimal travel cost
- **DC area** (Sterling, VA; Washington, DC): $100,000/trip
  - Day trips, no Air Force One required
- **International** (Scotland, Ireland): $1,700,000+/trip
  - Long-distance Air Force One travel

## Running the Script

### Prerequisites

```bash
npm install -g ts-node
npm install
```

### Execute

```bash
# From project root
ts-node scripts/update-golf-data.ts
```

### Output

The script will:
1. Load events from `golf-events.json` (if exists)
2. Validate each event
3. Compare against existing data in `data/status.ts`
4. Report new events and conflicts
5. Generate code snippets ready to paste into `data/status.ts`

### Example Output

```
🏌️  Trump Golf Data Update Helper

============================================================

📥 Fetching golf events...

✅ Found local data file: golf-events.json
✅ Retrieved 3 events from data source

🔍 Validating events...

✅ 3 valid events
❌ 0 invalid events

📖 Reading existing data...

📊 Found 25 existing events in status.ts

🔄 Comparing data...

============================================================

📊 RESULTS

✨ Found 2 new events to add:

   2025-11-09 - golf at Mar-a-Lago
   2025-11-08 - golf_arrival at Mar-a-Lago

============================================================

📝 CODE TO ADD:

// Add these events to data/status.ts in the events object:

"2025-11-09": { type: "golf", location: "Mar-a-Lago", url: "https://..." },
"2025-11-08": { type: "golf_arrival", location: "Mar-a-Lago", url: "https://..." },

============================================================

⚠️  IMPORTANT REMINDERS:

1. ✅ Manually verify each new event with credible sources
2. ✅ Check that locations match existing naming conventions
3. ✅ Ensure source URLs are from reputable news organizations
4. ✅ Update cost estimates if new locations are added
5. ✅ Run the build to ensure no TypeScript errors
6. ✅ Review the website locally before committing
```

## Manual Verification Checklist

Before adding any new events:

- [ ] Source is from credible news organization (AP, Reuters, NYT, WaPo, Pool Reports)
- [ ] Date is correct and matches source
- [ ] Location matches existing naming conventions
- [ ] Event type is appropriate (golf vs arrival vs departure)
- [ ] No duplicate entries for the same date
- [ ] Cost estimate is appropriate for location
- [ ] Build passes: `npm run build`
- [ ] Website looks correct: `npm run dev`

## Future Enhancements

Potential improvements when data sources become available:

1. **RSS Feed Monitoring**: Check White House pool reports RSS
2. **Twitter/Social Media Scraping**: Monitor credible journalists
3. **Image Recognition**: Detect golf course backgrounds in presidential photos
4. **Automated PR Creation**: Have GitHub Actions create PRs with suggested updates
5. **Email Notifications**: Alert when new golf events are detected
6. **Blockchain Verification**: Immutable timestamped record of all updates

## Support

For questions about the update process:
- Email: mail@istrumpgolfing.today
- Check the About page for methodology
