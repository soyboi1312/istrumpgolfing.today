// types/types.ts
export type EventType =
    | 'golf'
    | 'arrival'
    | 'departure'
    | 'golf_arrival'
    | 'golf_departure';

export const isEventType = (type: string): type is EventType =>
    ['golf', 'arrival', 'departure', 'golf_arrival', 'golf_departure'].includes(type);

export interface EventData {
    location: string;
    url: string;
    type: EventType;
    duration?: number | undefined; // Explicit undefined
}

export interface Events {
    [date: string]: EventData;
}

export interface TermStart {
    year: number;
    month: number;
    day: number;
}

const validateDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return !isNaN(y) && !isNaN(m) && !isNaN(d);
  };