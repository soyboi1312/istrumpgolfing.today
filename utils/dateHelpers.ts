export const getEasternTimeDate = (): Date => {
  const now = new Date();
  // Use Intl for proper DST handling (EST is UTC-5, EDT is UTC-4)
  const options = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);

  // Reconstruct date object from parts to be "Midnight ET"
  // Note: formatToParts already returns 2-digit padded values
  const y = parts.find(p => p.type === 'year')?.value ?? '1970';
  const m = parts.find(p => p.type === 'month')?.value ?? '01';
  const d = parts.find(p => p.type === 'day')?.value ?? '01';

  return new Date(`${y}-${m}-${d}`);
};

export const getEasternTimeISO = (): string => {
   const date = getEasternTimeDate();
   // Return YYYY-MM-DD
   return date.toISOString().split('T')[0];
};
