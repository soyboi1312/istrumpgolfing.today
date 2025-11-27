#!/bin/bash
# Fetches the latest Trump calendar from Factbase and saves it locally
# Usage: ./scripts/fetch-calendar.sh
# Schedule with cron: 0 */2 * * * /path/to/istrumpgolfing.today/scripts/fetch-calendar.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$PROJECT_DIR/data/rollcall_calendar.json"
URL="https://media-cdn.factba.se/rss/json/trump/calendar-full.json"

echo "[$(date)] Fetching calendar from Factbase..."

# Fetch and save (with backup)
if curl -sf "$URL" -o "$OUTPUT_FILE.tmp"; then
    mv "$OUTPUT_FILE.tmp" "$OUTPUT_FILE"
    echo "[$(date)] Successfully saved to $OUTPUT_FILE"
else
    echo "[$(date)] ERROR: Failed to fetch calendar" >&2
    rm -f "$OUTPUT_FILE.tmp"
    exit 1
fi
