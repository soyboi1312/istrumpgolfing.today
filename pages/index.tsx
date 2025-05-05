/* pages/index.tsx */
import Head from 'next/head';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { GetStaticProps } from 'next';
import { getStatusData } from '../data/status';
import styles from '../styles/Home.module.css';
import useTermDates from '../hooks/useTermDates';
import Calendar from '../components/Calendar';
import { Events, EventData, TermStart, EventType } from '../types';
import { DependencyList } from 'react';

interface HomeProps {
  events: Events;
  termStart: TermStart;
  tripCost: number;
  daysGolfed: number;
}

interface ClickOutsideHandler {
  (value: boolean): void;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const statusData = getStatusData();
    return {
      props: {
        events: statusData.events,
        termStart: {
          year: statusData.termStart.getFullYear(),
          month: statusData.termStart.getMonth() + 1,
          day: statusData.termStart.getDate()
        },
        tripCost: statusData.tripCost,
        daysGolfed: Object.values(statusData.events).filter(
          (e): e is EventData =>  // Add type predicate
            ['golf', 'golf_arrival', 'golf_departure'].includes(e.type)
        ).length
      },
    };
  } catch (error) {
    return {
      props: {
        events: {},
        termStart: { year: 2025, month: 1, day: 19 },
        tripCost: 3400000,
        daysGolfed: 0
      }
    };
  }
};

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>, // Allow null
  handler: ClickOutsideHandler,
  dependencies: DependencyList
) => {
  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(false);
      }
    };

    if (dependencies.some(dep => dep)) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, dependencies);
};

const IMAGE_SETS = {
  sad: ['sad.webp', 'sad1.webp'],
  golf: ['golf.webp', 'golf1.webp', 'golf2.webp']
} as const;

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]}-${day}-${year}`; // Added radix
};

const Home: React.FC<HomeProps> = ({ events, termStart, tripCost, daysGolfed }) => {
  const [totalTrips, setTotalTrips] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    date: string;
    data: EventData;
  } | null>(null);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showCostInfo, setShowCostInfo] = useState<boolean>(false);
  const [showVacationInfo, setShowVacationInfo] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(popupRef, setShowCostInfo, [showCostInfo]);
  useClickOutside(modalRef, setModalOpen, [modalOpen]);

  const { daysSinceStart, isGolfingToday } = useTermDates(termStart, events);
  const effectiveDaysSinceStart = Math.max(daysSinceStart, 0);
  const percentage = effectiveDaysSinceStart > 0
    ? parseFloat(
      ((daysGolfed / effectiveDaysSinceStart) * 100
      ).toFixed(1)
    )
    : 0;

  const getRandomImage = useCallback((set: keyof typeof IMAGE_SETS) => {
    const randomIndex = Math.floor(Math.random() * IMAGE_SETS[set].length);
    return `/files/${IMAGE_SETS[set][randomIndex]}`;
  }, []);

  const getEventLabel = (type: EventType): string => {
    const labels: Record<EventType, string> = {
      golf: 'Golfed',
      arrival: 'Arrived',
      departure: 'Departed',
      golf_arrival: 'Arrived and Golfed',
      golf_departure: 'Golfed and Departed'
    };
    return labels[type];
  };

  useEffect(() => {
    setCurrentImage(isGolfingToday ? getRandomImage('golf') : getRandomImage('sad'));

    const trips = Object.values(events).filter(event =>
      ['departure', 'golf_departure'].includes(event.type)
    ).length;
    setTotalTrips(trips);
    setTotalCost(trips * tripCost);
  }, [events, tripCost, getRandomImage, isGolfingToday]);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Track how many days Donald Trump has golfed during his presidency. Real-time updates on taxpayer costs, historical data, and verified sources. Updated daily."></meta>
        <meta name="keywords" content="Trump, is trump golfing, today, golfing, Donald Trump, Republican, GOP, fascist, price, cost" />
        <meta name="msapplication-TileColor" content="#ae8160" />
        <meta name="application-name" content="Is Trump Golfing Today?" />
        <meta property="og:image" content="https://istrumpgolfing.today/files/icons/preview.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />
        <meta name="twitter:image" content="https://istrumpgolfing.today/files/icons/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="shortcut icon" sizes="16x16 24x24 32x32 48x48" href="/files/fav/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/files/fav/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/files/fav/apple-touch-icon.png" />
        <title>Is Trump Golfing Today? Real-Time Tracker & Taxpayer Cost Calculator</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <h2>Is Trump Golfing Today?</h2>
        <img
          id="golfImage"
          src={currentImage}
          alt="pic of fascist"
          className={styles.golfImage}
          width={300}  // Add native width
          height={300} // Add native height
          onLoad={() => setIsImageLoading(false)}
          style={{ opacity: isImageLoading ? 0 : 1 }}
        />
        <div
          id="status"
          className={`${styles.status} ${isGolfingToday ? styles.statusYes : styles.statusNo
            }`}
          aria-live="polite"
        >
          {isGolfingToday ? 'Yes' : 'No'}
        </div>

        <div className={styles.blurb}>
          <p>Trump has golfed <span id="daysGolfed">{daysGolfed}</span> of the{' '}
            <span id="daysSinceStart">{effectiveDaysSinceStart}</span> days ({percentage}%)
            since his second term began.
          </p>

          <p>This has cost taxpayers{' '}
            <span className={styles.cost}>
              {`~$${(totalCost || 0).toLocaleString('en-US', {
                maximumFractionDigits: 0
              })}`}
            </span>{' '}
            across <strong>{totalTrips}</strong> golf trips.
          </p>

          <p>During his first term, he golfed 293 days (20%), costing $151.5 million.</p>

          <p>$1.75 million of that went to Secret Service accommodations at Trump-owned properties.</p>

          <div className={styles.sourceButtonContainer}>
            <button
              className={styles.sourceButton}
              onClick={() => setShowCostInfo(!showCostInfo)}
            >
              sources
            </button>
            {showCostInfo && (
              <div ref={popupRef} className={styles.costInfoPopup}>
                <p>
                  Cost estimates based on:
                </p>
                <ul className={styles.sourcesList}>
                  <li>
                    <a href="https://www.gao.gov/products/gao-19-178"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.costInfoLink}>
                      GAO study
                    </a> showing $3.4 million average per trip
                  </li>
                  <li>
                    <a href="https://www.independent.co.uk/news/world/americas/us-politics/trump-gold-trips-taxpayer-money-doge-b2701045.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.costInfoLink}>
                      Independent analysis
                    </a> of first term costs
                  </li>
                  <li>
                    <a href="https://www.citizensforethics.org/reports-investigations/crew-investigations/the-secret-service-spent-nearly-2-million-at-trump-properties/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.costInfoLink}>
                      CREW reporting
                    </a> on Secret Service accommodation costs
                  </li>
                  <li className={styles.nonLinkItem}>
                    Sources for days golfed can be seen in the calendar.
                  </li>
                </ul>
                <button className={styles.closeButton} onClick={() => setShowCostInfo(false)}>
                  <svg
                    className={styles.closeIcon}
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    role="button"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className={styles.vacationButtonContainer}>
            <button
              className={styles.vacationButton}
              onClick={() => setShowVacationInfo(!showVacationInfo)}
            >
              But what about other presidents? 
            </button>
            {showVacationInfo && (
              <div ref={popupRef} className={styles.vacationInfoPopup}>
                <p>
                While trump golfed 293 days in his first term, he took a total of <a href="https://www.nbcnews.com/politics/donald-trump/how-much-time-trump-spending-trump-properties-n753366" target="_blank"
                  rel="noopener norefferrer"
                  className={styles.vacationInfoPopup}>378 vacation days.</a>
                </p>
                <ul className={styles.sourcesList}>
                  <li>Biden (1 term): <a href="https://www.snopes.com/news/2025/02/04/biden-vacation-president/"
                  target="_blank"
                  rel="noopener norefferrer"
                  className={styles.vacationInfoLink}>184 days</a>
                  </li>
                  <li>Obama: (2 terms): <a href="https://www.cleveland.com/nation/2017/08/presidential_vacations_who_too.html"
                  target="_blank"
                  rel="noopener norefferrer"
                  className={styles.vacationInfoLink}>328 days</a>
                  </li>
                  <li>Bush: (2 terms): <a href="https://www.cleveland.com/nation/2017/08/presidential_vacations_who_too.html"
                  target="_blank"
                  rel="noopener norefferrer"
                  className={styles.vacationInfoLink}>1020 days</a>
                  </li>
                  <li>Clinton: (2 terms): <a href="https://www.cleveland.com/nation/2017/08/presidential_vacations_who_too.html"
                  target="_blank"
                  rel="noopener norefferrer"
                  className={styles.vacationInfoLink}>345 days</a>
                  </li>
                  <li>H.W. Bush: (2 terms): <a href="https://www.cleveland.com/nation/2017/08/presidential_vacations_who_too.html"
                  target="_blank"
                  rel="noopener norefferrer"
                  className={styles.vacationInfoLink}>543 days</a>
                  </li>
                  <li>Reagan: (2 terms): <a href="https://www.washingtonpost.com/wp-dyn/content/blog/2008/03/04/BL2008030401392.html"
                  target="_blank"
                  rel="noopener norefferrer"
                  className={styles.vacationInfoLink}>866 days</a>
                  </li>
                </ul>
                <button className={styles.closeButton} onClick={() => setShowVacationInfo(false)}>
                  <svg
                    className={styles.closeIcon}
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    role="button"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>


        </div>

        <div className={styles.legend}>
          <p>
            <span>◢ = Arrival</span>
            <span style={{ marginLeft: 15 }}>
              <span className={styles.legendColor}></span> = Days Golfed
            </span>
            <span style={{ marginLeft: 15 }}>◤ = Departure</span>
          </p>
        </div>

        <Calendar
          events={events}
          onDateSelect={(eventData) => {
            setSelectedEvent(eventData);
            setModalOpen(true);
          }}
        />

        {modalOpen && selectedEvent && ( // Add null check here
          <div ref={modalRef} className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              <svg
                className={styles.closeIcon}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className={styles.modalContent}>
              <h3>{formatDate(selectedEvent.date)}</h3>
              <p>{getEventLabel(selectedEvent.data.type)}</p>
              <p>Location: {selectedEvent.data.location}</p>
              <div className={styles.sourceLinkContainer}>
                {selectedEvent.data.url && (
                  <a
                    href={selectedEvent.data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceLink}
                  >
                    source
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className={styles.footer}>
          This data is produced with publicly available information and is not authorized, or endorsed by any political
          organization or candidate. <br /><br />
          Need to get ahold of us?{' '}
          <a href="mailto:mail@istrumpgolfing.today">mail@istrumpgolfing.today</a> <br />
          <div className={styles.socialLink}>
            <a
              href="https://bsky.app/profile/istrumpgolfing.today"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Bluesky"
            >
              <img
                src="/files/icons/bluesky.svg"
                className={styles.socialIcon}
                alt="Bluesky Social"
              />
            </a>
            <a
              href="https://www.pcrf.net/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Free Palestine"
            >
              <img
                src="/files/icons/palestine.svg"
                className={styles.palestineIcon}
                alt="Free Palestine"
              />
            </a>
          </div>
        </div>
      </main>
    </div >
  );
};

export default Home;