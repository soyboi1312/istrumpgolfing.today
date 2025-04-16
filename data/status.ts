// data/status.ts
import { EventType, Events } from '../types';

interface StatusData {
    events: Events;
    termStart: Date;
    tripCost: number;
}

export const statusData: StatusData = {
    events: {
        // ... (keep existing event data)
    },
    termStart: new Date(2025, 0, 19),
    tripCost: 3400000,
};

export const getStatusData = (): StatusData => statusData;