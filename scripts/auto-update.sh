#!/bin/bash
# Auto-update script: fetch calendar, sync dates, generate stats, push to GitHub
# Usage: ./scripts/auto-update.sh
# Cron: 0 */2 * * * /path/to/istrumpgolfing.today/scripts/auto-update.sh >> /tmp/golf-update.log 2>&1

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "========================================"
echo "[$(date)] Starting auto-update..."
echo "========================================"

# 1. Fetch latest calendar from Factbase
echo "[$(date)] Fetching calendar..."
if ! bash scripts/fetch-calendar.sh; then
    echo "[$(date)] ERROR: Failed to fetch calendar"
    exit 1
fi

# 2. Run sync to update status.ts (auto-adds new dates)
echo "[$(date)] Syncing golf dates..."
npx tsx scripts/sync-golf-dates.ts

# 3. Generate stats.json
echo "[$(date)] Generating stats..."
npx tsx scripts/generate-stats.ts

# 4. Check if there are any changes to commit
if git diff --quiet && git diff --cached --quiet; then
    echo "[$(date)] No changes detected. Done."
    exit 0
fi

# 5. Commit and push changes
echo "[$(date)] Changes detected, committing..."
git add data/rollcall_calendar.json data/status.ts public/stats.json

# Get count of new dates for commit message
NEW_COUNT=$(git diff --cached --numstat data/status.ts | awk '{print $1}')
DATE_TODAY=$(date +%Y-%m-%d)

git commit -m "Auto-update golf data ($DATE_TODAY)

- Synced from Factbase calendar
- Changes: +$NEW_COUNT lines in status.ts"

echo "[$(date)] Pushing to GitHub..."
git push

echo "[$(date)] Done! Changes pushed to GitHub."
