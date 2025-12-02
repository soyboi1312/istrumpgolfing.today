#!/bin/bash
# Auto-update script: fetch calendar, sync dates, generate stats, push to GitHub
# Usage: ./scripts/auto-update.sh
# Cron: 0 */2 * * * /path/to/istrumpgolfing.today/scripts/auto-update.sh >> /tmp/golf-update.log 2>&1

set -e

# Ensure PATH includes node
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

# Get project directory (parent of scripts/)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"
echo "[$(date)] Working directory: $(pwd)"

# Verify we're in a git repo
if [ ! -d ".git" ]; then
    echo "[$(date)] ERROR: Not a git repository at $PROJECT_DIR"
    exit 1
fi

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

# 4. Check if status.ts has actual golf data changes (not just stats.json timestamp updates)
if git diff --quiet data/status.ts; then
    echo "[$(date)] No new golf data. Skipping commit to conserve build minutes."
    # Reset any stats.json changes since we're not committing
    git checkout -- public/stats.json data/rollcall_calendar.json 2>/dev/null || true
    exit 0
fi

# 5. Commit and push changes (only when status.ts has new data)
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

# 6. Post to social media if today is a golf day
echo "[$(date)] Checking social media posting..."
npx tsx scripts/post-social.ts || echo "[$(date)] Social posting skipped or failed"

echo "[$(date)] Done! Changes pushed to GitHub."
