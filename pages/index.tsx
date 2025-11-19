/* pages/index.tsx */
import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from "react";
import { GetStaticProps } from "next";
import { getStatusData } from "../data/status";
import styles from "../styles/Home.module.css";
import useTermDates from "../hooks/useTermDates";
import Calendar from "../components/Calendar";
import { Events, EventData, TermStart, EventType } from "../types";
import { DependencyList } from "react";
import Link from "next/link";

interface HomeProps {
  events: Events;
  termStart: TermStart;
  locationCosts: { [key: string]: number };
  daysGolfed: number;
}

interface ClickOutsideHandler {
  (value: boolean): void;
}

/**
 * Fetches golf event data at build time for static site generation
 * @returns Props containing events, term start date, location costs, and days golfed count
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const statusData = getStatusData();
    return {
      props: {
        events: statusData.events,
        termStart: {
          year: statusData.termStart.getFullYear(),
          month: statusData.termStart.getMonth() + 1,
          day: statusData.termStart.getDate(),
        },
        locationCosts: statusData.locationCosts,
        daysGolfed: Object.values(statusData.events).filter(
          (
            e
          ): e is EventData => // Add type predicate
            ["golf", "golf_arrival", "golf_departure"].includes(e.type)
        ).length,
      },
    };
  } catch (error) {
    return {
      props: {
        events: {},
        termStart: { year: 2025, month: 1, day: 19 },
        locationCosts: {},
        daysGolfed: 0,
      },
    };
  }
};

/**
 * Custom hook to detect clicks outside of a referenced element
 * Useful for closing modals and popups when clicking outside
 * @param ref - React ref to the element to monitor
 * @param handler - Callback function to execute when clicking outside
 * @param dependencies - React dependencies to control when the listener is active
 */
const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: ClickOutsideHandler,
  dependencies: DependencyList
) => {
  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(false);
      }
    };

    if (dependencies.some((dep) => dep)) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, dependencies);
};

/**
 * Image file sets for different golf statuses
 * Each set contains multiple images for variety
 */
const IMAGE_SETS = {
  sad: ["sad.webp", "sad1.webp"],
  golf: ["istrumpgolfing.webp", "golf.webp", "golf1.webp", "golf2.webp"],
} as const;

/**
 * Formats an ISO date string (YYYY-MM-DD) to human-readable format (MMM-DD-YYYY)
 * @param dateString - ISO formatted date string
 * @returns Formatted date string (e.g., "Jan-20-2025")
 */
const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[parseInt(month, 10) - 1]}-${day}-${year}`; // Added radix
};

const Home: React.FC<HomeProps> = ({
  events,
  termStart,
  locationCosts,
  daysGolfed,
}) => {
  const [hasMounted, setHasMounted] = useState(false); // Top-level mount state
  const [totalTrips, setTotalTrips] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    date: string;
    data: EventData;
  } | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("/files/sad.webp"); // Default image
  const [showCostInfo, setShowCostInfo] = useState<boolean>(false);
  const [showVacationInfo, setShowVacationInfo] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);
  const costInfoRef = useRef<HTMLDivElement | null>(null);
  const vacationInfoRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHasMounted(true); // This will run only on the client, after the initial render
  }, []);

  useClickOutside(modalRef, setModalOpen, [modalOpen]);
  useClickOutside(costInfoRef, setShowCostInfo, [showCostInfo]);
  useClickOutside(vacationInfoRef, setShowVacationInfo, [showVacationInfo]);

  const { daysSinceStart, isGolfingToday } = useTermDates(termStart, events);
  const effectiveDaysSinceStart = Math.max(daysSinceStart || 0, 0);
  const percentage =
    effectiveDaysSinceStart > 0
      ? parseFloat(((daysGolfed / effectiveDaysSinceStart) * 100).toFixed(1))
      : 0;

  /**
   * Selects a random image from the specified set
   * @param set - The image set key ('sad' or 'golf')
   * @returns Path to a random image from the selected set
   */
  const getRandomImage = useCallback((set: keyof typeof IMAGE_SETS) => {
    const randomIndex = Math.floor(Math.random() * IMAGE_SETS[set].length);
    return `/files/${IMAGE_SETS[set][randomIndex]}`;
  }, []);

  /**
   * Converts event type code to human-readable label
   * @param type - Event type (golf, arrival, departure, etc.)
   * @returns Human-readable event label
   */
  const getEventLabel = (type: EventType): string => {
    const labels: Record<EventType, string> = {
      golf: "Golfed",
      arrival: "Arrived",
      departure: "Departed",
      golf_arrival: "Arrived and Golfed",
      golf_departure: "Golfed and Departed",
    };
    return labels[type];
  };

  useEffect(() => {
    // All client-side calculations are now dependent on hasMounted
    if (hasMounted) {
      setCurrentImage(
        isGolfingToday ? getRandomImage("golf") : getRandomImage("sad")
      );

      const golfEvents = Object.values(events).filter((event) =>
        ["golf", "golf_arrival", "golf_departure"].includes(event.type)
      );
      setTotalTrips(golfEvents.length);

      // Calculate total cost by counting TRIPS, not individual days
      // A trip is identified by its end date (departure or standalone golf day)
      const eventDates = Object.keys(events).sort();
      const trips: { location: string; endDate: string }[] = [];

      eventDates.forEach((date, index) => {
        const event = events[date];
        const eventType = event.type;

        // Check if this is a trip endpoint
        const isEndpoint =
          eventType === 'golf_departure' ||
          eventType === 'departure' ||
          // Standalone golf day (not preceded by arrival)
          (eventType === 'golf' && (
            index === 0 ||
            !['arrival', 'golf_arrival'].includes(events[eventDates[index - 1]]?.type)
          ));

        if (isEndpoint && ['golf', 'golf_arrival', 'golf_departure'].includes(eventType)) {
          trips.push({ location: event.location, endDate: date });
        }
      });

      const newTotalCost = trips.reduce((acc, trip) => {
        const cost = locationCosts[trip.location] || 0;
        return acc + cost;
      }, 0);

      setTotalCost(newTotalCost);
    }
  }, [hasMounted, events, locationCosts, getRandomImage, isGolfingToday]);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Is Trump golfing today? The official real-time counter for presidential golf trips. Track daily updates, taxpayer costs, and verified location data."
        ></meta>
        <meta name="msapplication-TileColor" content="#ae8160" />
        <meta name="application-name" content="Is Trump Golfing Today?" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://istrumpgolfing.today/" />
        <meta property="og:title" content="Is Trump Golfing Today? | Real-Time Trump Golf Tracker" />
        <meta property="og:description" content="Track Donald Trump's golf trips in real-time. See daily updates, taxpayer costs, and verified sources. 293 days golfed in first term costing $151.5M." />
        <meta property="og:image" content="https://istrumpgolfing.today/files/icons/preview.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />
        <meta property="og:site_name" content="Is Trump Golfing Today?" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://istrumpgolfing.today/" />
        <meta name="twitter:title" content="Is Trump Golfing Today? | Trump Golf Tracker" />
        <meta name="twitter:description" content="Real-time Trump golf tracker. Track presidential golf trips, costs, and verified data. Updated daily." />
        <meta name="twitter:image" content="https://istrumpgolfing.today/files/icons/preview.png" />
        <meta name="twitter:site" content="@istrumpgolfing" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://istrumpgolfing.today/" />

        <link
          rel="shortcut icon"
          sizes="16x16 24x24 32x32 48x48"
          href="/files/fav/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/files/fav/favicon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/files/fav/apple-touch-icon.png"
        />
        <title>
          Is Trump Golfing Today? Golf Tracker & Cost Calculator
        </title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Is Trump Golfing Today?",
              "url": "https://istrumpgolfing.today",
              "description": "Track Donald Trump's golf trips during his presidency with real-time updates on taxpayer costs and verified sources.",
              "about": {
                "@type": "Thing",
                "name": "Presidential Golf Trip Tracking",
                "description": "Detailed tracking and cost analysis of presidential golf trips"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Is Trump Golfing Today"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Is Trump golfing today?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This website tracks Donald Trump's golf trips in real-time, showing whether he is golfing today and providing historical data on all his golf outings during his presidency."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much do Trump's golf trips cost taxpayers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Trump's golf trips cost taxpayers varying amounts depending on location: Mar-a-Lago trips cost approximately $3.4 million per weekend, Bedminster trips cost around $350,000, and local DC trips cost under $100,000. During his first term, golf trips cost taxpayers $151.5 million total."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many days has Trump golfed as president?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "During his first term, Donald Trump golfed 293 days out of 1,461 days in office (20%). The website tracks all golf days with verified sources and real-time updates for his current term."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where does Trump golf most often?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Trump most frequently golfs at his own properties including Mar-a-Lago in Florida, Trump National Golf Club in Bedminster, New Jersey, and Trump National Golf Club in Sterling, Virginia."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <main className={styles.main}>
        <h1>Is Trump Golfing Today?</h1>

        {/* Conditional rendering based on hasMounted */}
        {hasMounted ? (
          <>
            <img
              id="golfImage"
              src={currentImage}
              alt="Donald Trump golfing at Mar-a-Lago in 2025."
              className={styles.golfImage}
              width={300}
              height={300}
            />
            <div
              id="status"
              className={`${styles.status} ${
                isGolfingToday ? styles.statusYes : styles.statusNo
              }`}
              aria-live="polite"
            >
              {isGolfingToday ? "Yes" : "No"}
            </div>
            <div className={styles.blurb}>
              <h2 className={styles.subtitle}>Trump Golf Tracker - Real-Time Presidential Golf Trip Counter</h2>
              <p>
                Trump has golfed <span id="daysGolfed">{daysGolfed}</span> of the{" "}
                <span id="daysSinceStart">{effectiveDaysSinceStart}</span> days (
                {percentage}%) since his second term began.
              </p>
              <p>
                This has cost taxpayers{" "}
                <span className={styles.cost}>
                  {`~$${(totalCost || 0).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}`}
                </span>{". "}
              </p>

              <div className={styles.vacationButtonContainer}>
                <button
                  className={styles.vacationButton}
                  onClick={() => setShowVacationInfo(!showVacationInfo)}
                  aria-label="View vacation days comparison with other presidents"
                  aria-expanded={showVacationInfo}
                >
                  But what about other presidents?
                </button>
                {showVacationInfo && (
                  <div ref={vacationInfoRef} className={styles.vacationInfoPopup}>
                    <p>
                      While trump golfed 293 days in his first term, he took a total
                      of 378 vacation days.
                    </p>
                    <ul className={styles.sourcesList}>
                      <li>Biden (1 term): 184 days</li>
                      <li>Obama (2 terms): 328 days</li>
                      <li>Bush (2 terms): 1020 days</li>
                      <li>Clinton (2 terms): 345 days</li>
                      <li>H.W. Bush (2 terms): 543 days</li>
                      <li>Reagan (2 terms): 866 days</li>
                      <li>
                        <a
                          href="https://www.nbcnews.com/politics/donald-trump/how-much-time-trump-spending-trump-properties-n753366"
                          target="_blank"
                          rel="noopener norefferrer"
                          className={styles.vacationInfoLink}
                        >
                          Source for Trump's first term
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.snopes.com/news/2025/02/04/biden-vacation-president/"
                          target="_blank"
                          rel="noopener norefferrer"
                          className={styles.vacationInfoLink}
                        >
                          Source for Biden
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.cleveland.com/nation/2017/08/presidential_vacations_who_too.html"
                          target="_blank"
                          rel="noopener norefferrer"
                          className={styles.vacationInfoLink}
                        >
                          Source for H.W. Bush - Obama
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.washingtonpost.com/wp-dyn/content/blog/2008/03/04/BL2008030401392.html"
                          target="_blank"
                          rel="noopener norefferrer"
                          className={styles.vacationInfoLink}
                        >
                          Source for Reagan
                        </a>
                      </li>
                    </ul>
                    <button
                      className={styles.closeButton}
                      onClick={() => setShowVacationInfo(false)}
                      aria-label="Close vacation comparison popup"
                    >
                      <svg
                        className={styles.closeIcon}
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <p>
                During his first term, he golfed 293 days (20%), costing $151.5
                million.
              </p>

              <p>
                $1.75 million of that went to Secret Service accommodations at
                Trump-owned properties.
              </p>

              <p>
                Wondering why these trips cost so much? We've put together a{" "}
                <Link href="/cost-breakdown">
                  <a className={styles.costInfoLink}>detailed cost breakdown</a>
                </Link>{" "}
                explaining the factors that drive these expenses.
              </p>

              {/* Share Buttons */}
              <div className={styles.shareButtons}>
                <p className={styles.shareText}>Share this tracker:</p>
                <div className={styles.shareButtonGroup}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Trump has golfed ${daysGolfed} days (${percentage}%) since taking office, costing taxpayers ~$${(totalCost || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}. Track it live:`
                    )}&url=${encodeURIComponent('https://istrumpgolfing.today')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.shareButton}
                    aria-label="Share on Twitter"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                  </a>
                  <a
                    href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
                      `Trump has golfed ${daysGolfed} days (${percentage}%) costing taxpayers ~$${(totalCost || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}. Track it: https://istrumpgolfing.today`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.shareButton}
                    aria-label="Share on Bluesky"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/>
                    </svg>
                    Bluesky
                  </a>
                  <a
                    href={`https://www.reddit.com/submit?url=${encodeURIComponent('https://istrumpgolfing.today')}&title=${encodeURIComponent('Trump Golf Tracker - Real-time tracking of presidential golf trips')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.shareButton}
                    aria-label="Share on Reddit"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                    Reddit
                  </a>
                </div>
              </div>

              {/* MOVED BLOCK STARTS HERE */}
              <div className={styles.sourceButtonContainer}>
                <button
                  className={styles.sourceButton}
                  onClick={() => setShowCostInfo(!showCostInfo)}
                  aria-label="View cost estimate sources and references"
                  aria-expanded={showCostInfo}
                >
                  Sources
                </button>
                {showCostInfo && (
                  <div ref={costInfoRef} className={styles.costInfoPopup}>
                    <p>Cost estimates based on:</p>
                    <ul className={styles.sourcesList}>
                      <li>
                        <a
                          href="https://www.independent.co.uk/news/world/americas/us-politics/trump-gold-trips-taxpayer-money-doge-b2701045.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.costInfoLink}
                        >
                          Independent analysis
                        </a>{" "}
                        of first term costs
                      </li>
                      <li>
                        <a
                          href="https://www.citizensforethics.org/reports-investigations/crew-investigations/the-secret-service-spent-nearly-2-million-at-trump-properties/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.costInfoLink}
                        >
                          CREW reporting
                        </a>{" "}
                        on Secret Service accommodation costs
                      </li>
                      <li className={styles.nonLinkItem}>
                        Sources for days golfed can be seen in the calendar.
                      </li>
                    </ul>
                    <button
                      className={styles.closeButton}
                      onClick={() => setShowCostInfo(false)}
                      aria-label="Close sources popup"
                    >
                      <svg
                        className={styles.closeIcon}
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {/* MOVED BLOCK ENDS HERE */}

            </div>
          </>
        ) : (
          // This is the placeholder content that will be rendered on the server
          // and on the initial client load. It's static and has no client-side dependencies.
          <div>
            <div
              className={styles.skeleton}
              style={{
                height: '300px',
                width: '300px',
                margin: '0 auto 2rem'
              }}
            />
            <div className={`${styles.skeleton}`} style={{ height: '5rem', width: '200px', margin: '1rem auto 2rem' }} />
            <div className={`${styles.blurb}`}>
              <div className={styles.skeleton} style={{ height: '1.4rem', marginBottom: '1rem' }} />
              <div className={styles.skeleton} style={{ height: '1.4rem', width: '80%' }} />
            </div>
          </div>
        )}

        <div className={styles.legend}>
          <p>
            <span>◢ = Arrival</span>
            <span style={{ marginLeft: 15 }}>
              <span className={styles.legendColor}></span> = Days Golfed
            </span>
            <span style={{ marginLeft: 15 }}>◤ = Departure</span>
          </p>
        </div>

        {/* The Calendar component can now be simplified */}
        <Calendar
          events={events}
          onDateSelect={(eventData) => {
            setSelectedEvent(eventData);
            setModalOpen(true);
          }}
        />

        {modalOpen &&
          selectedEvent && (
            <div ref={modalRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
              <button
                className={styles.closeButton}
                onClick={() => setModalOpen(false)}
                aria-label="Close event details modal"
              >
                <svg
                  className={styles.closeIcon}
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className={styles.modalContent}>
                <h3 id="modal-title">{formatDate(selectedEvent.date)}</h3>
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
          <div className={styles.navigationLinks}>
            <Link href="/comparison">
              <a className={styles.navLink}>Presidential Comparison</a>
            </Link>
            {" | "}
            <Link href="/cost-breakdown">
              <a className={styles.navLink}>Cost Breakdown</a>
            </Link>
            {" | "}
            <Link href="/embed">
              <a className={styles.navLink}>Embed Widget</a>
            </Link>
            {" | "}
            <Link href="/about">
              <a className={styles.navLink}>About</a>
            </Link>
          </div>
          <br />
          This data is produced with publicly available information and is not
          authorized, or endorsed by any political organization or candidate.{" "}
          <br />
          <br />
          Need to get ahold of us?{" "}
          <a href="mailto:mail@istrumpgolfing.today">
            mail@istrumpgolfing.today
          </a>{" "}
          <br />
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
          </div>
        </div>
      </main>
    </div>
  );
};
 
export default Home;
