export const getEasternTimeDate = (): Date => {
  const now = new Date();
  // Use Intl for proper DST handling (EST is UTC-5, EDT is UTC-4)
  const options = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);

  // Reconstruct date object from parts to be "Midnight ET"
  const y = parts.find(p => p.type === 'year')?.value;
  const m = parts.find(p => p.type === 'month')?.value;
  const d = parts.find(p => p.type === 'day')?.value;

  // Values are already zero-padded due to '2-digit' option
  return new Date(`${y}-${m}-${d}`);
};

export const getEasternTimeISO = (): string => {
   const date = getEasternTimeDate();
   // Return YYYY-MM-DD
   return date.toISOString().split('T')[0];
};
