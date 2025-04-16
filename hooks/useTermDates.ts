// hooks/useTermDates.ts
import { useState, useEffect } from 'react';
import { Events, TermStart } from '../types';

interface UseTermDatesResult {
    daysSinceStart: number;
    isGolfingToday: boolean;
}

export default function useTermDates(
    termStart: TermStart,
    events: Events
): UseTermDatesResult {
    const [daysSinceStart, setDaysSinceStart] = useState(0);
    const [isGolfingToday, setIsGolfingToday] = useState(false);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Generate today's ISO date string
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const todayISO = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        // Calculate days since term start
        const termStartDate = new Date(
            termStart.year,
            termStart.month - 1,
            termStart.day
        );
        const timeDiff = today.getTime() - termStartDate.getTime();
        const daysSince = Math.floor(timeDiff / (1000 * 3600 * 24));
        setDaysSinceStart(Math.max(daysSince, 0));

        // Check golf events
        const golfEvents = Object.keys(events).filter(date => 
            ['golf', 'golf_arrival', 'golf_departure'].includes(events[date].type)
        );
        setIsGolfingToday(golfEvents.includes(todayISO));
    }, [termStart, events]);

    return { daysSinceStart, isGolfingToday };
}