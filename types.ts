// types.ts
export type EventType =
    | 'golf'
    | 'arrival'
    | 'departure'
    | 'golf_arrival'
    | 'golf_departure';

/** Event types that count as golf days */
export const GOLF_EVENT_TYPES = ['golf', 'golf_arrival', 'golf_departure'] as const;

/** All valid event types */
export const ALL_EVENT_TYPES = ['golf', 'arrival', 'departure', 'golf_arrival', 'golf_departure'] as const;

export const isEventType = (type: string): type is EventType =>
    ALL_EVENT_TYPES.includes(type as EventType);

/** Check if an event type counts as a golf day */
export const isGolfEventType = (type: EventType): boolean =>
    GOLF_EVENT_TYPES.includes(type as typeof GOLF_EVENT_TYPES[number]);

export enum GolfLocation {
    MAR_A_LAGO = "Mar-a-Lago",
    WEST_PALM = "West Palm Beach, FL",
    JUPITER_FL = "Jupiter, FL",
    DORAL_FL = "Doral, FL",
    BEDMINSTER = "Bedminster, NJ",
    STERLING_VA = "Sterling, VA",
    WASHINGTON_DC = "Washington, DC",
    SCOTLAND = "Scotland",
    LAS_VEGAS = "Las Vegas, NV",
    FLORIDA = "Florida", // Generic fallback
    NEW_JERSEY = "New Jersey", // Generic fallback
    PHILADELPHIA = "Philadelphia, PA"
}

export interface EventData {
    location: GolfLocation;
    url: string;
    type: EventType;
    duration?: number | undefined;
}

export interface Events {
    [date: string]: EventData;
}

export interface TermStart {
    year: number;
    month: number;
    day: number;
}
