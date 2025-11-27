import { useState, useEffect } from 'react';
import { Events, TermStart, isGolfEventType } from '../types';
import { getEasternTimeDate, getEasternTimeISO } from '../utils/dateHelpers';
import useHasMounted from './useHasMounted';

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
    const hasMounted = useHasMounted();

    useEffect(() => {
        if (hasMounted) {
            // REPLACED: Manual Intl logic with utility functions
            
            // 1. Get today's date string in ET (YYYY-MM-DD) for dictionary lookups
            const todayISO = getEasternTimeISO();

            // 2. Get today's date object (Midnight ET) for math
            const todayEstDate = getEasternTimeDate();

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
                isGolfEventType(events[date].type)
            );
            setIsGolfingToday(golfEvents.includes(todayISO));
        }
    }, [termStart, events, hasMounted]);

    return { daysSinceStart, isGolfingToday };
}
