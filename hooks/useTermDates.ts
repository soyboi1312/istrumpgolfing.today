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
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const todayISO = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            const termStartDate = new Date(
                termStart.year,
                termStart.month - 1,
                termStart.day
            );
            const timeDiff = today.getTime() - termStartDate.getTime();
            const daysSince = Math.floor(timeDiff / (1000 * 3600 * 24));
            setDaysSinceStart(Math.max(daysSince, 0));

            const golfEvents = Object.keys(events).filter(date =>
                ['golf', 'golf_arrival', 'golf_departure'].includes(events[date].type)
            );
            setIsGolfingToday(golfEvents.includes(todayISO));
        }
    }, [termStart, events, hasMounted]);

    return { daysSinceStart, isGolfingToday };
}
