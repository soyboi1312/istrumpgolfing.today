// types.ts
export type EventType =
    | 'golf'
    | 'arrival'
    | 'departure'
    | 'golf_arrival'
    | 'golf_departure';

export const isEventType = (type: string): type is EventType =>
    ['golf', 'arrival', 'departure', 'golf_arrival', 'golf_departure'].includes(type);

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
    location: string;
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
