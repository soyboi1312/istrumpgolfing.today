/* pages/index.tsx */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { GetStaticProps } from "next";
import { getStatusData } from "../data/status";
import styles from "../styles/Home.module.css";
import useTermDates from "../hooks/useTermDates";
import useClickOutside from "../hooks/useClickOutside";
import useHasMounted from "../hooks/useHasMounted";
import { calculateGolfStats } from "../utils/statsCalculator";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import { Events, EventData, TermStart, EventType } from "../types";

interface HomeProps {
  events: Events;
  termStart: TermStart;
  daysGolfed: number;
  totalCost: number;
  // NEW: Pre-calculated props for SEO/SSR
  daysSinceStart: number;
  percentage: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const statusData = getStatusData();
    
    // Calculate stats at build time
    const stats = calculateGolfStats(statusData.events, statusData.locationCosts);

    // NEW: Calculate time-based stats on the server for SEO
    // This ensures Google sees "20%" instead of "-%"
    const termStartDate = new Date(
        statusData.termStart.getFullYear(),
        statusData.termStart.getMonth(),
        statusData.termStart.getDate()
    );
    
    // Use current time for build; Math.max ensures we don't divide by zero or negative
    const now = new Date();
    const diffTime = now.getTime() - termStartDate.getTime();
    const daysSinceStart = Math.max(Math.floor(diffTime / (1000 * 3600 * 24)), 1);
    
    const percentage = ((stats.daysGolfed / daysSinceStart) * 100).toFixed(1);

    return {
      props: {
        events: statusData.events,
        termStart: {
          year: statusData.termStart.getFullYear(),
          month: statusData.termStart.getMonth() + 1,
          day: statusData.termStart.getDate(),
        },
        daysGolfed: stats.daysGolfed,
        totalCost: stats.totalCost,
        daysSinceStart,
        percentage
      },
      // Optional: Revalidate every hour to keep "daysSinceStart" relatively fresh
      revalidate: 3600, 
    };
  } catch (error) {
    return {
      props: {
        events: {},
        termStart: { year: 2025, month: 1, day: 20 },
        daysGolfed: 0,
        totalCost: 0,
        daysSinceStart: 1,
        percentage: "0.0"
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
  daysGolfed,
  totalCost,
  daysSinceStart,
  percentage
}) => {
  const hasMounted = useHasMounted();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    date: string;
    data: EventData;
  } | null>(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Use the extracted hook - closes modal when clicking outside
  useClickOutside(modalRef, setModalOpen, modalOpen);

  // We still use this hook for "isGolfingToday" live status,
  // but we use props for the hard numbers to improve SEO/CLS.
  const { isGolfingToday } = useTermDates(termStart, events);

  const statusImage = isGolfingToday ? "/files/golf.webp" : "/files/sad.webp";

  return (
    <div className={styles.container}>
      <SEO 
        title="Is Trump Golfing Today? | Live Presidential Golf Tracker"
        description="Real-time tracker for Donald Trump's presidential golf trips, taxpayer costs, and stats."
        isGolfing={isGolfingToday ?? undefined}
      />
      
      <Head>
        {/* NEW: WebSite Schema to establish authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Is Trump Golfing Today?",
              "url": "https://istrumpgolfing.today",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://istrumpgolfing.today/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Structured Data (Dataset) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dataset",
              "name": "Trump Golf Tracker",
              "description": "A database of presidential golf outings and associated costs.",
              "url": "https://istrumpgolfing.today",
              "creator": {
                "@type": "Organization",
                "name": "Is Trump Golfing Today?"
              },
              "variableMeasured": ["Golf Days", "Taxpayer Cost", "Location"],
              "license": "https://creativecommons.org/licenses/by/4.0/"
            })
          }}
        />

        {/* FAQ Schema Structured Data */}
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

      <Navbar />

      <main className={styles.main}>
        
        <h1 className={styles.pageTitle}>
          Donald Trump Presidential Golf Tracker & Statistics
        </h1>

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          {hasMounted && (
            <>
              <Image
                src={statusImage}
                alt={isGolfingToday ? "Donald Trump Golfing at Mar-a-Lago" : "Donald Trump working"}
                className={styles.golfImage}
                width={180}
                height={180}
                priority
              />
              <div>
                <div className={styles.statusBadge}>
                  <span className={`${styles.statusPulse} ${isGolfingToday ? styles.statusPulseYes : styles.statusPulseNo}`} />
                  <h2 className={`${styles.statusText} ${styles.statusTextInline}`}>
                    {isGolfingToday ? "YES, HE IS GOLFING" : "NO, HE IS NOT GOLFING"}
                  </h2>
                </div>
              </div>
            </>
          )}
        </section>

        {/* STATS DASHBOARD */}
        {/* IMPROVEMENT: Values now render Server-Side, improving SEO indexing */}
        <div className={styles.statsGrid}>
          <dl className={styles.statCard}>
            <dt className={styles.statLabel}>Days Golfed</dt>
            <dd className={styles.statValue}>
              {daysGolfed}
            </dd>
            <dd className={styles.statSubtext}>
                Out of {daysSinceStart} days in office
            </dd>
          </dl>

          <dl className={styles.statCard}>
            <dt className={styles.statLabel}>Time Spent</dt>
            <dd className={styles.statValue}>
                {percentage}%
            </dd>
            <dd className={styles.statSubtext}>
                Of his presidency so far
            </dd>
          </dl>

          <dl className={styles.statCard}>
            <dt className={styles.statLabel}>Taxpayer Cost</dt>
            <dd className={`${styles.statValue} ${styles.statValueHighlight}`}>
                ${(totalCost / 1000000).toFixed(1)}M
            </dd>
            <dd className={styles.statSubtext}>
                Estimated travel expenses
            </dd>
          </dl>
        </div>

        {/* CONTEXT / SEO SECTION */}
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
            <Link href="/cost-breakdown" className={styles.contextLink}>
                View Full Trump Golf Cost Breakdown &rarr;
            </Link>
          </p>
          <p className={styles.contextText}>
            Curious how this stacks up against history? Trump golfed more in one term 
            than many presidents did in two. 
            <br />
            <Link href="/comparison" className={styles.contextLink}>
                Compare Trump vs Other Presidents Golf Stats &rarr;
            </Link>
          </p>
        </section>

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
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <title>Twitter/X icon</title>
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
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <title>Bluesky icon</title>
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
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <title>Reddit icon</title>
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 1.249.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              Reddit
            </a>
          </div>
        </div>

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
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <title>Close</title>
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
        <Footer exclude={['home']} variant="full" />

      </main>
    </div>
  );
};

export default Home;