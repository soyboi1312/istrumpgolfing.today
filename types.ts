// types.ts
export type EventType = 
  | 'golf' 
  | 'arrival'
  | 'departure'
  | 'golf_arrival'
  | 'golf_departure';

export interface EventData {
  location: string;
  url: string;
  type: EventType;
  duration?: number;
}

export interface Events {
  [date: string]: EventData;
}

export interface TermStart {
  year: number;
  month: number;
  day: number;
}