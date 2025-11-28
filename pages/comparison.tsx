/* pages/comparison.tsx */
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import { getStatusData } from '../data/status';
import { getEasternTimeDate } from '../utils/dateHelpers';
import { EventData, GOLF_EVENT_TYPES } from '../types';

interface TermStats {
  daysGolfed: number;
  daysInOffice: number;
  percentage: string;
}

interface ComparisonProps {
  lastUpdated: string;
  term2Stats: TermStats;
}

export const getStaticProps: GetStaticProps<ComparisonProps> = async () => {
  const statusData = getStatusData();
  const termStart = statusData.termStart;
  // Use Eastern Time for consistent date calculations
  const today = getEasternTimeDate();

  // Calculate days in office (ensure at least 1 to avoid division by zero)
  const daysInOffice = Math.max(
    1,
    Math.floor((today.getTime() - termStart.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Calculate golf days
  // We filter for explicit golf events, consistent with your index page logic
  const golfDays = Object.values(statusData.events).filter((e): e is EventData =>
    GOLF_EVENT_TYPES.includes(e.type as typeof GOLF_EVENT_TYPES[number])
  ).length;

  return {
    props: {
      lastUpdated: new Date().toISOString(),
      term2Stats: {
        daysGolfed: golfDays,
        daysInOffice: daysInOffice,
        percentage: ((golfDays / daysInOffice) * 100).toFixed(1)
      },
    },
  };
};

/**
 * Presidential Golf & Vacation Comparison Page
 *
 * Compares Trump's golf and vacation days with other modern presidents.
 * Data sourced from verified news reports and governmental records.
 */
const Comparison: React.FC<ComparisonProps> = ({ lastUpdated, term2Stats }) => {
  return (
    <div className={styles.container}>
      <SEO
        title="Trump Golf vs Other Presidents - Presidential Vacation Comparison"
        description="Compare presidential golf and vacation days. See how Trump's time off compares to Obama, Bush, and Biden, including a full taxpayer cost analysis."
        path="/comparison/"
      />

      <Head>
        {/* Structured Data - kept in Head as SEO component doesn't handle JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Presidential Golf and Vacation Day Comparison",
              "description": "Comprehensive comparison of golf and vacation days across modern U.S. presidents",
              "author": {
                "@type": "Organization",
                "name": "Is Trump Golfing Today"
              },
              "datePublished": "2025-11-09",
              "dateModified": lastUpdated
            })
          }}
        />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Presidential Golf & Vacation Comparison</h1>

        <section className={styles.sectionCard}>
          <p className={styles.textBlock}>
            Presidential time off has been a topic of debate for decades. This page compares golf outings and vacation days
            across modern U.S. presidents to provide context and data-driven insights. All data comes from verified news reports,
            governmental records, and independent fact-checking organizations.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Golf Days by President</h2>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>President</th>
                  <th>Golf Days</th>
                  <th>Days in Office</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {/* Live Term 2 Data Row */}
                <tr className={styles.liveDataRow}>
                  <td><strong>Donald Trump (Term 2)</strong> <span className={styles.liveBadge}>Live</span></td>
                  <td><strong>{term2Stats.daysGolfed}</strong></td>
                  <td><strong>{term2Stats.daysInOffice}</strong></td>
                  <td><strong>{term2Stats.percentage}%</strong></td>
                </tr>
                <tr>
                  <td>Donald Trump (Term 1)</td>
                  <td>293</td>
                  <td>1,461</td>
                  <td>20.1%</td>
                </tr>
                <tr>
                  <td>Barack Obama (Term 1 & 2)</td>
                  <td>98</td>
                  <td>2,922</td>
                  <td>3.35%</td>
                </tr>
                <tr>
                  <td>Bill Clinton (Term 1)</td>
                  <td>24</td>
                  <td>1,461</td>
                  <td>1.6%</td>
                </tr>
                <tr>
                  <td>Joe Biden (Term 1)</td>
                  <td>20</td>
                  <td>1,461</td>
                  <td>1.4%</td>
                </tr>
                <tr>
                  <td>George W. Bush (Term 1 & 2)</td>
                  <td>24</td>
                  <td>2,922</td>
                  <td>0.08%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Total Vacation Days (All Terms)</h2>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>President</th>
                  <th>Vacation Days</th>
                  <th>Terms Served</th>
                  <th>Days per Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>George W. Bush</td>
                  <td>1,020</td>
                  <td>2 (8 years)</td>
                  <td>128</td>
                </tr>
                <tr>
                  <td>Ronald Reagan</td>
                  <td>866</td>
                  <td>2 (8 years)</td>
                  <td>108</td>
                </tr>
                <tr>
                  <td>George H.W. Bush</td>
                  <td>543</td>
                  <td>1 (4 years)</td>
                  <td>136</td>
                </tr>
                <tr>
                  <td>Donald Trump</td>
                  <td>378</td>
                  <td>1 (4 years)</td>
                  <td>95</td>
                </tr>
                <tr>
                  <td>Bill Clinton</td>
                  <td>345</td>
                  <td>2 (8 years)</td>
                  <td>43</td>
                </tr>
                <tr>
                  <td>Barack Obama</td>
                  <td>328</td>
                  <td>2 (8 years)</td>
                  <td>41</td>
                </tr>
                <tr>
                  <td>Joe Biden</td>
                  <td>184</td>
                  <td>1 (4 years)</td>
                  <td>46</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Key Insights</h2>
          
          <h3 className={styles.sectionSubtitle}>
            Trump's Golf Habits
          </h3>
          <ul className={styles.contentList}>
            <li><strong>Most golf-playing president in modern history:</strong> Trump golfed 293 days in his first term, far exceeding any recent president</li>
            <li><strong>Frequency:</strong> Golfed approximately once every 5 days while in office</li>
            <li><strong>Cost to taxpayers:</strong> Estimated $151.5 million for first term golf trips</li>
            <li><strong>Property profit:</strong> $1.75 million paid to Trump-owned properties for Secret Service accommodations</li>
            <li><strong>Campaign promise:</strong> Said he would be "too busy" to golf as president</li>
          </ul>

          <h3 className={styles.sectionSubtitle}>
            Historical Context
          </h3>
          <ul className={styles.contentList}>
            <li><strong>George W. Bush:</strong> Stopped playing golf in 2003 out of respect for troops in Iraq, saying "I don't want some mom whose son may have recently died to see the commander-in-chief playing golf"</li>
            <li><strong>Barack Obama:</strong> Played 333 rounds over 8 years (average 42 per year), frequently criticized by Trump on Twitter</li>
            <li><strong>Reagan & Bush Sr.:</strong> Took more total vacation days but spread across ranch stays and family compound visits</li>
            <li><strong>Working vacations:</strong> Modern presidents often work while on vacation; the distinction between "vacation" and "remote work" has become blurred</li>
          </ul>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Cost Comparison</h2>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>President</th>
                  <th>Estimated Travel Cost</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Donald Trump</td>
                  <td>$151.5 million</td>
                  <td>First term. Golf trips only; visited own properties 428 times</td>
                </tr>
                <tr>
                  <td>Barack Obama</td>
                  <td>~$105 million</td>
                  <td>8-year total; includes international trips</td>
                </tr>
                <tr>
                  <td>George W. Bush</td>
                  <td>~$20 million</td>
                  <td>8-year total; mostly ranch in Texas (lower cost)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`${styles.textBlock} ${styles.noteText}`}>
            Note: Presidential travel costs vary significantly based on destination. Trips requiring Air Force One, cargo planes, and extensive security details cost far more than visits to nearby locations or personal properties with existing infrastructure.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Sources & Methodology</h2>
          <ul className={styles.contentList}>
            <li>
              <a href="https://www.nbcnews.com/politics/donald-trump/how-much-time-trump-spending-trump-properties-n753366" target="_blank" rel="noopener noreferrer">
                NBC News - Trump property visits and golf tracker
              </a>
            </li>
            <li>
              <a href="https://www.snopes.com/news/2025/02/04/biden-vacation-president/" target="_blank" rel="noopener noreferrer">
                Snopes - Biden vacation day fact check
              </a>
            </li>
            <li>
              <a href="https://www.cleveland.com/nation/2017/08/presidential_vacations_who_too.html" target="_blank" rel="noopener noreferrer">
                Cleveland.com - Historical presidential vacation data
              </a>
            </li>
            <li>
              <a href="https://www.washingtonpost.com/wp-dyn/content/blog/2008/03/04/BL2008030401392.html" target="_blank" rel="noopener noreferrer">
                Washington Post - Reagan vacation records
              </a>
            </li>
            <li>
              <a href="https://www.independent.co.uk/news/world/americas/us-politics/trump-gold-trips-taxpayer-money-doge-b2701045.html" target="_blank" rel="noopener noreferrer">
                The Independent - Trump golf trip cost analysis
              </a>
            </li>
            <li>
              <a href="https://www.citizensforethics.org/reports-investigations/crew-investigations/the-secret-service-spent-nearly-2-million-at-trump-properties/" target="_blank" rel="noopener noreferrer">
                CREW - Secret Service spending at Trump properties
              </a>
            </li>
          </ul>
        </section>

        <Footer exclude={['comparison']} />
      </main>
    </div>
  );
};

export default Comparison;
