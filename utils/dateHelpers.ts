export const getEasternTimeDate = (): Date => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  // EST is UTC-5, EDT is UTC-4. Better to rely on Intl for DST handling
  const options = { timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric' } as const;
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(now);
  
  // Reconstruct date object from parts to be "Midnight ET"
  const y = parts.find(p => p.type === 'year')?.value;
  const m = parts.find(p => p.type === 'month')?.value;
  const d = parts.find(p => p.type === 'day')?.value;
  
  return new Date(`${y}-${m!.padStart(2, '0')}-${d!.padStart(2, '0')}`);
};

export const getEasternTimeISO = (): string => {
   const date = getEasternTimeDate();
   // Return YYYY-MM-DD
   return date.toISOString().split('T')[0];
};
