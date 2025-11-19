// hooks/useTermDates.ts
import { useState, useEffect } from 'react';
import { Events, TermStart } from '../types';

interface UseTermDatesResult {
    daysSinceStart: number | null;
    isGolfingToday: boolean | null;
}

export default function useTermDates(
    termStart: TermStart,
    events: Events
): UseTermDatesResult {
    const [daysSinceStart, setDaysSinceStart] = useState<number | null>(null);
    const [isGolfingToday, setIsGolfingToday] = useState<boolean | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted) {
            // Create a formatter for US Eastern Time (ET)
            // This ensures everyone sees the status relative to where the President likely is (DC/FL)
            // regardless of their own local timezone.
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/New_York',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            });

            const parts = formatter.formatToParts(new Date());
            const y = parts.find(p => p.type === 'year')?.value;
            const m = parts.find(p => p.type === 'month')?.value;
            const d = parts.find(p => p.type === 'day')?.value;

            if (y && m && d) {
                const year = parseInt(y);
                const month = parseInt(m);
                const day = parseInt(d);

                // Construct ISO string in Eastern Time (YYYY-MM-DD) for dictionary lookups
                const todayISO = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

                // Create a date object for "Today in ET" at midnight local time
                // This is necessary to compare accurately against termStart which is also constructed at midnight
                const todayEstDate = new Date(year, month - 1, day);

                const termStartDate = new Date(
                    termStart.year,
                    termStart.month - 1,
                    termStart.day
                );

                // Calculate days since start using the difference in milliseconds
                const timeDiff = todayEstDate.getTime() - termStartDate.getTime();
                const daysSince = Math.floor(timeDiff / (1000 * 3600 * 24));
                
                setDaysSinceStart(Math.max(daysSince, 0));

                // Check if golfing today based on the EST date string
                const golfEvents = Object.keys(events).filter(date =>
                    ['golf', 'golf_arrival', 'golf_departure'].includes(events[date].type)
                );
                setIsGolfingToday(golfEvents.includes(todayISO));
            }
        }
    }, [termStart, events, hasMounted]);

    return { daysSinceStart, isGolfingToday };
}
