// data/status.ts
import { EventType, Events, GolfLocation } from '../types';

interface StatusData {
    events: Events;
    termStart: Date;
    locationCosts: { [key: string]: number };
}

/**
 * Presidential golf tracking data
 * Contains all 86 confirmed golf events from rollcall calendar
 */
export const statusData: StatusData = {
    events: {
        // ========================================
        // November 2025
        // ========================================
        '2025-11-27': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-26': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-16': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-15': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-09': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-08': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-11-01': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // October 2025
        // ========================================
        '2025-10-19': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-10-18': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
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
        '2025-09-14': {
            location: GolfLocation.BEDMINSTER,
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

        // ========================================
        // July 2025
        // ========================================
        '2025-07-29': {
            location: GolfLocation.SCOTLAND,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-28': {
            location: GolfLocation.SCOTLAND,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
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
            type: 'golf',
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
        '2025-07-13': {
            location: GolfLocation.BEDMINSTER,
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
        '2025-07-04': {
            location: GolfLocation.WASHINGTON_DC,
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
        '2025-06-21': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-06-08': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-06-07': {
            location: GolfLocation.BEDMINSTER,
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
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-25': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-24': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-23': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-22': {
            location: GolfLocation.WASHINGTON_DC,
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
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-03': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-02': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // April 2025
        // ========================================
        '2025-04-27': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
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
            type: 'golf',
        },
        '2025-04-12': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.yahoo.com/news/trump-arrives-round-golf-trump-161622589.html',
            type: 'golf',
        },
        '2025-04-06': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://thehill.com/homenews/administration/5234982-trump-golfing-video-truth/',
            type: 'golf',
        },
        '2025-04-05': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.newsweek.com/donald-trump-golf-win-announcement-sparks-backlash-tariff-fallout-2055892',
            type: 'golf',
        },
        '2025-04-04': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://apnews.com/article/donald-trump-tariffs-golf-813c7a300021445636f63fddbfd38c83',
            type: 'golf',
        },
        '2025-04-03': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },

        // ========================================
        // March 2025
        // ========================================
        '2025-03-30': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://apnews.com/article/donald-trump-tariffs-golf-813c7a300021445636f63fddbfd38c83',
            type: 'golf',
        },
        '2025-03-29': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.instagram.com/lindseygrahamsc/p/DHzDPcXtL0_/',
            type: 'golf',
        },
        '2025-03-22': {
            location: GolfLocation.BEDMINSTER,
            url: 'https://www.motherjones.com/politics/2025/03/while-washington-dc-burns-trump-golfs/',
            type: 'golf',
        },
        '2025-03-16': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.newsweek.com/trump-touts-great-honor-winning-tournament-his-own-golf-course-2045666',
            type: 'golf',
        },
        '2025-03-15': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.newsweek.com/trump-touts-great-honor-winning-tournament-his-own-golf-course-2045666',
            type: 'golf',
        },
        '2025-03-09': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-03-08': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-03-02': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.independent.co.uk/news/world/americas/us-politics/trump-playing-golf-florida-cost-b2711532.html',
            type: 'golf',
        },
        '2025-03-01': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.independent.co.uk/news/world/americas/us-politics/trump-playing-golf-florida-cost-b2711532.html',
            type: 'golf',
        },

        // ========================================
        // February 2025
        // ========================================
        '2025-02-19': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-18': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-17': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-15': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-09': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-08': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-02': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-01': {
            location: GolfLocation.MAR_A_LAGO,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },

        // ========================================
        // January 2025
        // ========================================
        '2025-01-26': {
            location: GolfLocation.DORAL_FL,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-01-25': {
            location: GolfLocation.LAS_VEGAS,
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-01-24': {
            location: GolfLocation.WASHINGTON_DC,
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        // Note: 2025-01-18 excluded - before inauguration (Jan 20, 2025)
    },
    termStart: new Date(2025, 0, 20),
    // Per-day costs (derived from GAO per-trip estimates divided by avg trip length)
    locationCosts: {
        [GolfLocation.SCOTLAND]: 2000000,       // Transatlantic AF1 (~$5.6M roundtrip) + intl security coordination
        [GolfLocation.LAS_VEGAS]: 2000000,      // ~4.5hr flight each way, longer than Florida
        [GolfLocation.MAR_A_LAGO]: 1360000,     // $3.4M per trip / ~2.5 days
        [GolfLocation.WEST_PALM]: 1360000,
        [GolfLocation.JUPITER_FL]: 1360000,
        [GolfLocation.DORAL_FL]: 1360000,
        [GolfLocation.FLORIDA]: 1360000,
        [GolfLocation.BEDMINSTER]: 375000,
        [GolfLocation.NEW_JERSEY]: 375000,
        [GolfLocation.PHILADELPHIA]: 350000,
        [GolfLocation.STERLING_VA]: 200000,
        [GolfLocation.WASHINGTON_DC]: 100000,   // Day trips, minimal additional cost
    }
};

export const getStatusData = (): StatusData => statusData;
