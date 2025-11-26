/* pages/index.tsx */
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef, DependencyList } from "react";
import { GetStaticProps } from "next";
import { getStatusData } from "../data/status";
import styles from "../styles/Home.module.css";
import useTermDates from "../hooks/useTermDates";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar"; 
import { Events, EventData, TermStart, EventType } from "../types";

interface HomeProps {
  events: Events;
  termStart: TermStart;
  locationCosts: { [key: string]: number };
  daysGolfed: number;
}

interface ClickOutsideHandler {
  (value: boolean): void;
}

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
        daysGolfed: Object.values(statusData.events).filter((e): e is EventData =>
          ["golf", "golf_arrival", "golf_departure"].includes(e.type)
        ).length,
      },
    };
  } catch (error) {
    return {
      props: {
        events: {},
        termStart: { year: 2025, month: 1, day: 20 },
        locationCosts: {},
        daysGolfed: 0,
      },
    };
  }
};

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${day}, ${year}`;
};

const getEventLabel = (type: EventType): string => {
  const labels: Record<EventType, string> = {
    golf: "Golfed",
    arrival: "Arrived at location",
    departure: "Departed location",
    golf_arrival: "Arrived and Golfed",
    golf_departure: "Golfed and Departed",
  };
  return labels[type];
};

const Home: React.FC<HomeProps> = ({
  events,
  termStart,
  locationCosts,
  daysGolfed,
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    date: string;
    data: EventData;
  } | null>(null);
  
  const [totalCost, setTotalCost] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, setModalOpen, [modalOpen]);

  const { daysSinceStart, isGolfingToday } = useTermDates(termStart, events);
  
  const effectiveDaysSinceStart = Math.max(daysSinceStart || 0, 1);
  const percentage = ((daysGolfed / effectiveDaysSinceStart) * 100).toFixed(1);

  const statusImage = isGolfingToday ? "/files/golf.webp" : "/files/sad.webp";

  useEffect(() => {
    setHasMounted(true);

    const eventDates = Object.keys(events).sort();
    const trips: { location: string; endDate: string }[] = [];

    eventDates.forEach((date, index) => {
      const event = events[date];
      const eventType = event.type;
      const isEndpoint =
        eventType === 'golf_departure' ||
        eventType === 'departure' ||
        (eventType === 'golf' &&
          (index === 0 ||
            !['arrival', 'golf_arrival'].includes(events[eventDates[index - 1]]?.type)));

      if (isEndpoint && ['golf', 'golf_arrival', 'golf_departure'].includes(eventType)) {
        trips.push({ location: event.location, endDate: date });
      }
    });

    const calculatedCost = trips.reduce((acc, trip) => {
      return acc + (locationCosts[trip.location] || 0);
    }, 0);

    setTotalCost(calculatedCost);
  }, [events, locationCosts]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Is Trump Golfing Today? | Live Presidential Golf Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Real-time tracker for Donald Trump's presidential golf trips, taxpayer costs, and stats." />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          {hasMounted && (
            <>
              <img
                src={statusImage}
                alt={isGolfingToday ? "Trump Golfing" : "Trump Not Golfing"}
                className={styles.golfImage}
                width={180}
                height={180}
              />
              <div>
                <div className={styles.statusBadge}>
                  <span className={`${styles.statusPulse} ${isGolfingToday ? styles.statusPulseYes : styles.statusPulseNo}`} />
                  <span className={styles.statusText}>
                    {isGolfingToday ? "YES, HE IS GOLFING" : "NO, HE IS NOT GOLFING"}
                  </span>
                </div>
              </div>
            </>
          )}
        </section>

        {/* STATS DASHBOARD */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Days Golfed</span>
            <div className={styles.statValue}>
                {hasMounted ? daysGolfed : "-"}
            </div>
            <div className={styles.statSubtext}>
                Out of {effectiveDaysSinceStart} days in office
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Time Spent</span>
            <div className={styles.statValue}>
                {hasMounted ? `${percentage}%` : "-%"}
            </div>
            <div className={styles.statSubtext}>
                Of his presidency so far
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Taxpayer Cost</span>
            <div className={`${styles.statValue} ${styles.statValueHighlight}`}>
                {hasMounted ? `$${(totalCost / 1000000).toFixed(1)}M` : "$-M"}
            </div>
            <div className={styles.statSubtext}>
                Estimated travel expenses
            </div>
          </div>
        </div>

        {/* NEW CONTEXT / SEO SECTION */}
        <section className={styles.contextSection}>
          <h2 className={styles.contextTitle}>The Cost of Leisure</h2>
          <p className={styles.contextText}>
            Presidential golf trips are not just leisure; they are massive logistical operations. 
            In his first term alone, Donald Trump visited his own properties <strong>428 times</strong>, 
            golfing on 293 of those days.
          </p>
          <p className={styles.contextText}>
            These trips resulted in an estimated <strong>$151.5 million</strong> burden on taxpayers, 
            with roughly <strong>$1.75 million</strong> paid directly to Trump-owned businesses 
            for Secret Service accommodations. 
            <br />
            <Link href="/cost-breakdown"><a className={styles.contextLink}>See the detailed cost breakdown &rarr;</a></Link>
          </p>
          <p className={styles.contextText}>
            Curious how this stacks up against history? Trump golfed more in one term 
            than many presidents did in two. 
            <br />
            <Link href="/comparison"><a className={styles.contextLink}>Compare with Obama, Bush, and others &rarr;</a></Link>
          </p>
        </section>

        {/* CALENDAR SECTION */}
        <Calendar
          events={events}
          onDateSelect={(eventData) => {
            setSelectedEvent(eventData);
            setModalOpen(true);
          }}
        />

        {/* EVENT MODAL */}
        {modalOpen && selectedEvent && (
          <div className={styles.modalOverlay} role="dialog" aria-modal="true">
            <div ref={modalRef} className={styles.modal}>
              <button
                className={styles.closeButton}
                onClick={() => setModalOpen(false)}
                aria-label="Close event details"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              
              <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>{formatDate(selectedEvent.date)}</h3>
                <div className={styles.modalBody}>
                    <p><strong>Status:</strong> {getEventLabel(selectedEvent.data.type)}</p>
                    <p><strong>Location:</strong> {selectedEvent.data.location}</p>
                </div>
                
                {selectedEvent.data.url && (
                  <div className={styles.sourceLinkContainer}>
                    <a
                      href={selectedEvent.data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceButton}
                    >
                      View Source Verification &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FOOTER AREA */}
        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link href="/comparison"><a className={styles.footerLink}>Presidential Comparison</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/cost-breakdown"><a className={styles.footerLink}>Cost Breakdown</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/embed"><a className={styles.footerLink}>Embed Widget</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/about"><a className={styles.footerLink}>About</a></Link>
          </div>
          
          <p className={styles.disclaimer}>
            This data is produced with publicly available information and is not
            authorized or endorsed by any political organization.
          </p>
          
          <p className={styles.disclaimer}>
            Need to get ahold of us?{" "}
            <a href="mailto:mail@istrumpgolfing.today" className={styles.contactLink}>
              mail@istrumpgolfing.today
            </a>
          </p>
          
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
                alt="Bluesky"
              />
            </a>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Home;
