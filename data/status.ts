// data/status.ts
import { EventType, Events, GolfLocation } from '../types';

interface StatusData {
    events: Events;
    termStart: Date;
    locationCosts: { [key: string]: number };
}

/**
 * Presidential golf tracking data
 * Contains all golf events, term start date, and location-based cost estimates
 */
export const statusData: StatusData = {
    events: {
        // ========================================
        // November 2025
        // ========================================
        '2025-11-16':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf_departure',
        },
        '2025-11-15':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-14':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'arrival',
        },
        '2025-11-09':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf_departure',
        },
        '2025-11-08':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-07':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'arrival',
        },
        '2025-11-01':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // October 2025
        // ========================================
        '2025-10-19':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf_departure',
        },
        '2025-10-18':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-10-17':{
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'arrival',
            },
        '2025-10-11': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-10-04': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // September 2025
        // ========================================
        '2025-09-28': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-27': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-20': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-13': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-06': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-01': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // August 2025
        // ========================================
        '2025-08-31': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-30': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-24': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-23': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-17': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-16': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-10': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-09': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-03': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-02': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-01': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'arrival',
        },

        // ========================================
        // July 2025
        // ========================================
        '2025-07-29': {
            location: GolfLocation.SCOTLAND,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'departure',
        },
        '2025-07-27': {
            location: GolfLocation.SCOTLAND,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-26': {
            location: GolfLocation.SCOTLAND,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-25': {
            location: GolfLocation.SCOTLAND,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'arrival',
        },
        '2025-07-20': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-19': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },        
        '2025-07-12': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-06': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-05': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // June 2025
        // ========================================
        '2025-06-29': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-06-28': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-06-01': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // May 2025
        // ========================================
        '2025-05-31': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-26': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-25': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-18': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-10': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-04': {
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf_departure',
        },
        '2025-05-03': {
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-02': {
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-01': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },

        // ========================================
        // April 2025
        // ========================================
        '2025-04-20': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
            },
        '2025-04-19': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://youtu.be/l40AbwlzsWE',
            type: 'golf',
            },
        '2025-04-13': {
            location: GolfLocation.WEST_PALM,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf_departure',
            },
        '2025-04-12':{
            location: GolfLocation.WEST_PALM,
            url: 'https://www.yahoo.com/news/trump-arrives-round-golf-trump-161622589.html',
            type: 'golf',
            },
        '2025-04-11':{
            location: GolfLocation.WEST_PALM,
            url: 'https://www.yahoo.com/news/trump-arrives-round-golf-trump-161622589.html',
            type: 'arrival',
            },
        '2025-04-06': {
            location: GolfLocation.WEST_PALM,
            url: 'https://thehill.com/homenews/administration/5234982-trump-golfing-video-truth/',
            type: 'golf_departure',
        },
        '2025-04-05': {
            location: GolfLocation.JUPITER_FL,
            url: 'https://www.newsweek.com/donald-trump-golf-win-announcement-sparks-backlash-tariff-fallout-2055892',
            type: 'golf',
        },
        '2025-04-04': {
            location: GolfLocation.WEST_PALM,
            url: 'https://apnews.com/article/donald-trump-tariffs-golf-813c7a300021445636f63fddbfd38c83',
            type: 'golf',
        },
        '2025-04-03': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },

        // ========================================
        // March 2025
        // ========================================
        '2025-03-30': {
            location: GolfLocation.WEST_PALM,
            url: 'https://apnews.com/article/donald-trump-tariffs-golf-813c7a300021445636f63fddbfd38c83',
            type: 'golf_departure',
        },
        '2025-03-29': {
            location: GolfLocation.WEST_PALM,
            url: 'https://www.instagram.com/lindseygrahamsc/p/DHzDPcXtL0_/',
            type: 'golf',
        },
        '2025-03-28': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },
        '2025-03-23': {
            location: GolfLocation.PHILADELPHIA,
            url: '',
            type: 'departure',
        },
        '2025-03-22': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://www.motherjones.com/politics/2025/03/while-washington-dc-burns-trump-golfs/',
            type: 'golf',
        },
        '2025-03-21': {
            location: GolfLocation.NEW_JERSEY,
            url: '',
            type: 'arrival',
        },
        '2025-03-16': {
            location: GolfLocation.WEST_PALM,
            url: 'https://www.newsweek.com/trump-touts-great-honor-winning-tournament-his-own-golf-course-2045666',
            type: 'golf_departure',
        },
        '2025-03-15': {
            location: GolfLocation.WEST_PALM,
            url: 'https://www.newsweek.com/trump-touts-great-honor-winning-tournament-his-own-golf-course-2045666',
            type: 'golf',
        },
        '2025-03-14': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },
        '2025-03-09': {
            location: GolfLocation.WEST_PALM,
            url: '',
            type: 'golf_departure',
        },
        '2025-03-08': {
            location: GolfLocation.WEST_PALM,
            url: '',
            type: 'golf',
        },
        '2025-03-07': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },
        '2025-03-02': {
            location: GolfLocation.WEST_PALM,
            url: 'https://www.independent.co.uk/news/world/americas/us-politics/trump-playing-golf-florida-cost-b2711532.html',
            type: 'golf_departure',
        },
        '2025-03-01': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.independent.co.uk/news/world/americas/us-politics/trump-playing-golf-florida-cost-b2711532.html',
            type: 'golf',
        },
        '2025-02-28': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },

        // ========================================
        // February 2025
        // ========================================
        '2025-02-19': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-02-18': {
            location: GolfLocation.WEST_PALM,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-17': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-15': {
            location: GolfLocation.WEST_PALM,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-14': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },
        '2025-02-09': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-02-08': {
            location: GolfLocation.WEST_PALM,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-07': {
            location: GolfLocation.FLORIDA,
            url: '',
            type: 'arrival',
        },
        '2025-02-02': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-02-01': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-01-31': {
            location: GolfLocation.FLORIDA,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'arrival',
        },

        // ========================================
        // January 2025
        // ========================================
        '2025-01-27': {
            location: GolfLocation.DORAL_FL,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-01-26': {
            location: GolfLocation.DORAL_FL,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-01-25': {
            location: GolfLocation.FLORIDA,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'arrival',
        },
    },
    termStart: new Date(2025, 0, 20),
    // Location costs per trip (based on GAO reports and distance/aircraft analysis)
    // Keys matched to GolfLocation enum
    locationCosts: {
        [GolfLocation.SCOTLAND]: 1700000,
        [GolfLocation.LAS_VEGAS]: 5000000,
        [GolfLocation.MAR_A_LAGO]: 3400000,
        [GolfLocation.WEST_PALM]: 3400000,
        [GolfLocation.JUPITER_FL]: 3400000,
        [GolfLocation.DORAL_FL]: 3400000,
        [GolfLocation.FLORIDA]: 3400000,        // Generic Florida (same as Mar-a-Lago trips)
        [GolfLocation.BEDMINSTER]: 350000,
        [GolfLocation.NEW_JERSEY]: 350000,      // Generic NJ (same as Bedminster)
        [GolfLocation.PHILADELPHIA]: 350000,    // Departure point for NJ trips
        [GolfLocation.STERLING_VA]: 100000,
        [GolfLocation.WASHINGTON_DC]: 100000,
    }
};

export const getStatusData = (): StatusData => statusData;
