// data/status.ts 
import { EventType, Events } from '../types';

interface StatusData {
    events: Events;
    termStart: Date;
    locationCosts: { [key: string]: number };
}  

export const statusData: StatusData = {
    events: {
        '2025-10-19':{
            location: 'West Palm Beach, FL',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-10-18':{
            location: 'West Palm Beach, FL',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-10-11': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-10-04': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-28': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-27': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-20': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-13': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-06': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-09-01': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-31': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-30': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-24': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-23': {
            location: 'Washington, DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-17': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-16': {
            location: 'Washington, DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-10': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-09': {
            location: 'Washington, DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-03': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-02': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-08-01': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'arrival',
        },
        '2025-07-29': {
            location: 'Scotland',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'departure',
        },
        '2025-07-27': {
            location: 'Scotland',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-26': {
            location: 'Scotland',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-25': {
            location: 'Scotland',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'arrival',
        },
        '2025-07-20': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-19': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },        
        '2025-07-12': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-06': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-07-05': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-06-29': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-06-28': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-06-01': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-31': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-26': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-25': {
            location: 'Bedminster, NJ',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-18': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-10': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-04': {
            location: 'West Palm Beach, FL',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf_departure',
        },
        '2025-05-03': {
            location: 'West Palm Beach, FL',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-02': {
            location: 'West Palm Beach, FL',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
        },
        '2025-05-01': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-04-20': {
            location: 'Washington DC',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf',
            },
        '2025-04-19': {
            location: 'Washington DC',
            url: 'https://youtu.be/l40AbwlzsWE',
            type: 'golf',
            },
        '2025-04-13': {
            location: 'West Palm Beach, FL',
            url: 'https://rollcall.com/factbase/trump/topic/calendar/',
            type: 'golf_departure',
            },
        '2025-04-12':{
            location: 'West Palm Beach, FL',
            url: 'https://www.yahoo.com/news/trump-arrives-round-golf-trump-161622589.html',
            type: 'golf',
            },
        '2025-04-11':{
            location: 'West Palm Beach, FL',
            url: 'https://www.yahoo.com/news/trump-arrives-round-golf-trump-161622589.html',
            type: 'arrival',
            },
        '2025-04-06': {
            location: 'West Palm Beach, FL',
            url: 'https://thehill.com/homenews/administration/5234982-trump-golfing-video-truth/',
            type: 'golf_departure',
        },
        '2025-04-05': {
            location: 'Jupiter, FL',
            url: 'https://www.newsweek.com/donald-trump-golf-win-announcement-sparks-backlash-tariff-fallout-2055892',
            type: 'golf',
        },
        '2025-04-04': {
            location: 'West Palm Beach, FL',
            url: 'https://apnews.com/article/donald-trump-tariffs-golf-813c7a300021445636f63fddbfd38c83',
            type: 'golf',
        },
        '2025-04-03': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-03-30': {
            location: 'West Palm Beach, FL',
            url: 'https://apnews.com/article/donald-trump-tariffs-golf-813c7a300021445636f63fddbfd38c83',
            type: 'golf_departure',
        },
        '2025-03-29': {
            location: 'West Palm Beach, FL',
            url: 'https://www.instagram.com/lindseygrahamsc/p/DHzDPcXtL0_/',
            type: 'golf',
        },
        '2025-03-28': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-03-23': {
            location: 'Philly',
            url: '',
            type: 'departure',
        },
        '2025-03-22': {
            location: 'Bedminster, NJ',
            url: 'https://www.motherjones.com/politics/2025/03/while-washington-dc-burns-trump-golfs/',
            type: 'golf',
        },
        '2025-03-21': {
            location: 'New Jersey',
            url: '',
            type: 'arrival',
        },
        '2025-03-16': {
            location: 'West Palm Beach, FL',
            url: 'https://www.newsweek.com/trump-touts-great-honor-winning-tournament-his-own-golf-course-2045666',
            type: 'golf_departure',
        },
        '2025-03-15': {
            location: 'West Palm Beach, FL',
            url: 'https://www.newsweek.com/trump-touts-great-honor-winning-tournament-his-own-golf-course-2045666',
            type: 'golf',
        },
        '2025-03-14': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-03-09': {
            location: 'West Palm Beach, FL',
            url: '',
            type: 'golf_departure',
        },
        '2025-03-08': {
            location: 'West Palm Beach, FL',
            url: '',
            type: 'golf',
        },
        '2025-03-07': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-03-02': {
            location: 'West Palm Beach, FL',
            url: 'https://www.independent.co.uk/news/world/americas/us-politics/trump-playing-golf-florida-cost-b2711532.html',
            type: 'golf_departure',
        },
        '2025-03-01': {
            location: 'Mar-a-Lago',
            url: 'https://www.independent.co.uk/news/world/americas/us-politics/trump-playing-golf-florida-cost-b2711532.html',
            type: 'golf',
        },
        '2025-02-28': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-02-19': {
            location: 'Mar-a-Lago',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-02-18': {
            location: 'West Palm Beach, FL',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-17': {
            location: 'Mar-a-Lago',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-15': {
            location: 'West Palm Beach, FL',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-14': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-02-09': {
            location: 'Mar-a-Lago',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-02-08': {
            location: 'West Palm Beach, FL',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-02-07': {
            location: 'Florida',
            url: '',
            type: 'arrival',
        },
        '2025-02-02': {
            location: 'Mar-a-Lago',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-02-01': {
            location: 'Mar-a-Lago',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-01-31': {
            location: 'Florida',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'arrival',
        },
        '2025-01-27': {
            location: 'Doral, FL',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf_departure',
        },
        '2025-01-26': {
            location: 'Doral, FL',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'golf',
        },
        '2025-01-25': {
            location: 'Florida',
            url: 'https://www.washingtonpost.com/opinions/2025/02/20/trump-second-term-golfing-resorts/',
            type: 'arrival',
        },
    },
    termStart: new Date(2025, 0, 19),
    locationCosts: {
        "Scotland": 1700000,
        "Las Vegas, NV": 1600000,
        "Mar-a-Lago": 1400000,
        "West Palm Beach, FL": 1400000,
        "Jupiter, FL": 1400000,
        "Doral, FL": 1400000,
        "Bedminster, NJ": 350000,
        "Sterling, VA": 100000,
        "Washington DC": 100000,
    }
};

export const getStatusData = (): StatusData => statusData;
