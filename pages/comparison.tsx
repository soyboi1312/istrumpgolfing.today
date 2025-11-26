/* pages/comparison.tsx */
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

interface ComparisonProps {
  lastUpdated: string;
}

export const getStaticProps: GetStaticProps<ComparisonProps> = async () => {
  return {
    props: {
      lastUpdated: new Date().toISOString(),
    },
  };
};

/**
 * Presidential Golf & Vacation Comparison Page
 *
 * Compares Trump's golf and vacation days with other modern presidents.
 * Data sourced from verified news reports and governmental records.
 */
const Comparison: React.FC<ComparisonProps> = ({ lastUpdated }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trump Golf vs Other Presidents - Presidential Vacation Comparison</title>
        <meta name="description" content="Compare Trump's 293 golf days and 378 vacation days to Obama, Bush, Biden, Clinton, Reagan. See which president took the most time off and how much it cost taxpayers." />
        <meta name="keywords" content="trump golf vs obama, presidential vacation days, trump vacation comparison, how many days did trump golf, presidential golf comparison, biden vacation days" />
        <link rel="canonical" href="https://istrumpgolfing.today/comparison/" />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://istrumpgolfing.today/comparison" />
        <meta property="og:title" content="Trump Golf vs Other Presidents - Complete Comparison" />
        <meta property="og:description" content="Trump golfed 293 days in his first term (20%). See how this compares to Obama (333 days), Bush (1,020 days), and other presidents." />

        {/* Structured Data */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://istrumpgolfing.today"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "Presidential Comparison",
                "item": "https://istrumpgolfing.today/comparison"
              }]
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
          <h2 className={styles.sectionTitle}>Golf Days by President (First Term)</h2>
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
                <tr>
                  <td>Donald Trump (Term 1)</td>
                  <td>293</td>
                  <td>1,461</td>
                  <td>20.1%</td>
                </tr>
                <tr>
                  <td>Barack Obama (Term 1)</td>
                  <td>98</td>
                  <td>1,461</td>
                  <td>6.7%</td>
                </tr>
                <tr>
                  <td>George W. Bush (Term 1)</td>
                  <td>24</td>
                  <td>1,461</td>
                  <td>1.6%</td>
                </tr>
                <tr>
                  <td>Bill Clinton (Term 1)</td>
                  <td>24</td>
                  <td>1,461</td>
                  <td>1.6%</td>
                </tr>
                <tr>
                  <td>Joe Biden (Full Term)</td>
                  <td>20</td>
                  <td>1,461</td>
                  <td>0.013%</td>
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
          
          <h3 style={{ color: 'var(--color-primary-orange)', fontFamily: 'Merriweather, serif', marginTop: '1.5rem', marginBottom: '1rem' }}>
            Trump's Golf Habits
          </h3>
          <ul className={styles.contentList}>
            <li><strong>Most golf-playing president in modern history:</strong> Trump golfed 293 days in his first term, far exceeding any recent president</li>
            <li><strong>Frequency:</strong> Golfed approximately once every 5 days while in office</li>
            <li><strong>Cost to taxpayers:</strong> Estimated $151.5 million for first term golf trips</li>
            <li><strong>Property profit:</strong> $1.75 million paid to Trump-owned properties for Secret Service accommodations</li>
            <li><strong>Campaign promise:</strong> Said he would be "too busy" to golf as president</li>
          </ul>

          <h3 style={{ color: 'var(--color-primary-orange)', fontFamily: 'Merriweather, serif', marginTop: '1.5rem', marginBottom: '1rem' }}>
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
          <p className={styles.textBlock} style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
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

        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link href="/"><a className={styles.footerLink}>Home</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/cost-breakdown"><a className={styles.footerLink}>Cost Breakdown</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/about"><a className={styles.footerLink}>About</a></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Comparison;
