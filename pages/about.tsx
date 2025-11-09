import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/CostBreakdown.module.css';

/**
 * About & Methodology Page
 *
 * Explains the purpose, methodology, and data sources for the Trump golf tracker.
 *
 * @returns About page with methodology explanation
 */
const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - Is Trump Golfing Today? Methodology & Sources</title>
        <meta name="description" content="Learn how we track Trump's golf trips, our methodology for calculating costs, and the verified sources we use for all data on this presidential golf tracker." />
        <meta name="keywords" content="trump golf tracker methodology, how to track presidential golf, trump golf data sources, presidential travel costs" />
        <link rel="canonical" href="https://istrumpgolfing.today/about" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>About This Project</h1>

        <div className={`${styles.blurb} ${styles.blurbContainer}`}>
          <h2 className={styles.subtitle}>Our Mission</h2>
          <p>
            Is Trump Golfing Today? is a non-partisan, fact-based tracker that documents Donald Trump's golf outings during
            his presidency. Our goal is to provide transparent, verifiable data about how the president spends his time and
            how much it costs taxpayers.
          </p>

          <h2 className={styles.subtitle}>Why This Matters</h2>
          <p>
            Presidential time and taxpayer money are matters of public interest. Donald Trump frequently criticized President
            Obama for playing golf, promising voters he would be "too busy" to golf if elected. Tracking whether these promises
            align with actions is a fundamental aspect of governmental accountability.
          </p>

          <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Trump's Own Words</h3>
            <ul className={styles.sourcesList}>
              <li>"I'm going to be working for you. I'm not going to have time to go play golf." - Trump, August 2016</li>
              <li>"I would rarely leave the White House because there's so much work to be done." - Trump, 2015</li>
              <li>"Can you believe that, with all of the problems and difficulties facing the U.S., President Obama spent the day playing golf?" - Trump tweet, October 2014</li>
            </ul>
          </div>

          <h2 className={styles.subtitle}>Methodology</h2>

          <h3 className={styles.tableTitle}>How We Track Golf Days</h3>
          <p>
            Each golf day is verified through multiple sources before being added to our database. We primarily rely on:
          </p>
          <ul className={styles.sourcesList}>
            <li><strong>Pool reports:</strong> Official reports from White House press pool members who travel with the president</li>
            <li><strong>News photographs:</strong> Images of Trump at golf courses published by credible news organizations</li>
            <li><strong>Public statements:</strong> Announcements from the White House or Trump himself</li>
            <li><strong>Golf course confirmation:</strong> Reports from golf course staff or other reliable witnesses</li>
          </ul>

          <h3 className={styles.tableTitle}>Event Types</h3>
          <p>We categorize each event into one of five types:</p>
          <ul className={styles.sourcesList}>
            <li><strong>Golf:</strong> Confirmed golfing on that day</li>
            <li><strong>Arrival:</strong> Arrived at a golf resort but no confirmed golf activity</li>
            <li><strong>Departure:</strong> Departed from a golf resort</li>
            <li><strong>Golf + Arrival:</strong> Arrived and golfed on the same day</li>
            <li><strong>Golf + Departure:</strong> Golfed and departed on the same day</li>
          </ul>
          <p>
            <em>Note: We only count confirmed golf days. Days where Trump was merely present at a golf property without
            confirmed golfing are tracked separately for transparency but not included in the golf day count.</em>
          </p>

          <h3 className={styles.tableTitle}>Cost Calculations</h3>
          <p>Our cost estimates are based on:</p>
          <ul className={styles.sourcesList}>
            <li>
              <strong>GAO Report GAO-19-178:</strong> Government Accountability Office analysis of four Mar-a-Lago trips,
              establishing a baseline cost of $3.4 million per weekend trip to Florida
            </li>
            <li>
              <strong>Location-based adjustments:</strong> Trips to different locations cost different amounts based on
              flight distance, aircraft requirements, and security needs
            </li>
            <li>
              <strong>Conservative estimates:</strong> We use the lower end of cost ranges when multiple estimates exist
            </li>
          </ul>

          <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Cost Components</h3>
            <p>Presidential golf trip costs typically include:</p>
            <ul className={styles.sourcesList}>
              <li>Air Force One operation costs (~$200,000/hour flight time)</li>
              <li>C-17 cargo planes to transport presidential motorcade</li>
              <li>Marine One helicopter operations</li>
              <li>Secret Service personnel overtime and per diem</li>
              <li>Local law enforcement coordination</li>
              <li>Coast Guard operations (for coastal properties)</li>
              <li>Advance team travel and logistics</li>
            </ul>
          </div>

          <h2 className={styles.subtitle}>Data Sources & Verification</h2>
          <p>
            Every golf day in our database includes a link to its source. We prioritize sources in this order:
          </p>
          <ol className={styles.sourcesList}>
            <li>Official White House pool reports</li>
            <li>Major news organizations (AP, Reuters, NY Times, Washington Post, CNN, Fox News, etc.)</li>
            <li>Photographic evidence from credible sources</li>
            <li>Golf course reports and social media (verified accounts only)</li>
          </ol>

          <h2 className={styles.subtitle}>What We're NOT</h2>
          <ul className={styles.sourcesList}>
            <li><strong>Not a political organization:</strong> We don't endorse candidates or take political donations</li>
            <li><strong>Not making judgments:</strong> We present data; you draw conclusions</li>
            <li><strong>Not exclusive:</strong> Golf data is just one metric of presidential activity</li>
          </ul>

          <h2 className={styles.subtitle}>Accuracy & Corrections</h2>
          <p>
            We strive for 100% accuracy. If you find an error in our data, please email us at{' '}
            <a href="mailto:mail@istrumpgolfing.today" style={{ color: '#ffa500' }}>
              mail@istrumpgolfing.today
            </a>{' '}
            with:
          </p>
          <ul className={styles.sourcesList}>
            <li>The specific date in question</li>
            <li>What you believe is incorrect</li>
            <li>A link to a credible source supporting the correction</li>
          </ul>
          <p>We review all submissions and issue corrections when warranted.</p>

          <h2 className={styles.subtitle}>Data Usage</h2>
          <p>
            All data on this site is freely available for journalists, researchers, and the public. We encourage fact-checking,
            verification, and republication of our data with attribution.
          </p>

          <h2 className={styles.subtitle}>Technical Implementation</h2>
          <p>
            This site is built with Next.js and TypeScript, statically generated for fast performance, and hosted for
            maximum uptime. The codebase is optimized for accessibility (WCAG 2.1 compliant) and mobile devices.
          </p>

          <h2 className={styles.subtitle}>Contact & Social</h2>
          <ul className={styles.sourcesList}>
            <li>
              Email:{' '}
              <a href="mailto:mail@istrumpgolfing.today" style={{ color: '#ffa500' }}>
                mail@istrumpgolfing.today
              </a>
            </li>
            <li>
              Bluesky:{' '}
              <a href="https://bsky.app/profile/istrumpgolfing.today" target="_blank" rel="noopener noreferrer" style={{ color: '#ffa500' }}>
                @istrumpgolfing.today
              </a>
            </li>
          </ul>

          <h2 className={styles.subtitle}>Support</h2>
          <p>
            This is a volunteer project with no ads or tracking. If you'd like to support our work, please consider donating to:
          </p>
          <ul className={styles.sourcesList}>
            <li>
              <a href="https://www.pcrf.net/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffa500' }}>
                Palestine Children's Relief Fund (PCRF)
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.footer}>
          <Link href="/">
            <a className={styles.homeLink}>← Back to Main Tracker</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default About;
