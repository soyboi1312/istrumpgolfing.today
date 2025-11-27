import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

/**
 * About & Methodology Page
 * * Explains the purpose, methodology, and data sources for the Trump golf tracker.
 * Refactored to match the main site design.
 */
const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - Is Trump Golfing Today? Methodology & Sources</title>
        <meta name="description" content="Learn how we track Trump's golf trips, our methodology for calculating costs, and the verified sources we use for all data on this presidential golf tracker." />
        <meta name="keywords" content="trump golf tracker methodology, how to track presidential golf, trump golf data sources, presidential travel costs" />
        <link rel="canonical" href="https://istrumpgolfing.today/about/" />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Is Trump Golfing Today?" />
        <meta property="og:description" content="Methodology, data sources, and cost calculation breakdown." />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>About This Project</h1>

        {/* Mission & Context Section */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.textBlock}>
            Is Trump Golfing Today? is a non-partisan, fact-based tracker that documents Donald Trump's golf outings during
            his presidency. Our goal is to provide transparent, verifiable data about how the president spends his time and
            how much it costs taxpayers.
          </p>

          <h3 className={styles.sectionSubtitle}>
            Why This Matters
          </h3>
          <p className={styles.textBlock}>
            Presidential time and taxpayer money are matters of public interest. Donald Trump frequently criticized President
            Obama for playing golf, promising voters he would be "too busy" to golf if elected. Tracking whether these promises
            align with actions is a fundamental aspect of governmental accountability.
          </p>

          <h3 className={styles.sectionSubtitle}>
            Trump's Own Words
          </h3>
          <ul className={styles.contentList}>
            <li>"I'm going to be working for you. I'm not going to have time to go play golf." - Trump, August 2016</li>
            <li>"I would rarely leave the White House because there's so much work to be done." - Trump, 2015</li>
            <li>"Can you believe that, with all of the problems and difficulties facing the U.S., President Obama spent the day playing golf?" - Trump tweet, October 2014</li>
          </ul>
        </section>

        {/* Methodology Section */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Methodology</h2>

          <h3 className={styles.sectionSubtitle}>
            How We Track Golf Days
          </h3>
          <p className={styles.textBlock}>
            Each golf day is verified through multiple sources before being added to our database. We primarily rely on:
          </p>
          <ul className={styles.contentList}>
            <li><strong>Pool reports:</strong> Official reports from White House press pool members who travel with the president</li>
            <li><strong>News photographs:</strong> Images of Trump at golf courses published by credible news organizations</li>
            <li><strong>Public statements:</strong> Announcements from the White House or Trump himself</li>
            <li><strong>Golf course confirmation:</strong> Reports from golf course staff or other reliable witnesses</li>
          </ul>

          <h3 className={styles.sectionSubtitle}>
            What Counts as a Golf Day
          </h3>
          <p className={styles.textBlock}>
            We only count days with <strong>confirmed golf activity</strong>. A day is counted when there is evidence
            from pool reports, photographs, or official schedules showing Trump at a golf course playing golf.
          </p>
          <p className={styles.textBlock} style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
            Note: Days where Trump was merely present at a golf property without confirmed golfing activity
            are not included in the count. We err on the side of caution and only count verified golf days.
          </p>
        </section>

        {/* Cost Section */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Cost Calculations</h2>
          <p className={styles.textBlock}>Our cost estimates are based on:</p>
          <ul className={styles.contentList}>
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

          <h3 className={styles.sectionSubtitle}>
            Cost Components
          </h3>
          <p className={styles.textBlock}>Presidential golf trip costs typically include:</p>
          <ul className={styles.contentList}>
            <li>Air Force One operation costs (~$200,000/hour flight time)</li>
            <li>C-17/C-5M cargo planes to transport presidential motorcade</li>
            <li>Marine One helicopter operations</li>
            <li>Secret Service personnel overtime and per diem</li>
            <li>Local law enforcement coordination</li>
            <li>Coast Guard operations (for coastal properties)</li>
            <li>Advance team travel and logistics</li>
          </ul>
        </section>

        {/* Data & Integrity Section */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Data Sources & Verification</h2>
          <p className={styles.textBlock}>
            Every golf day in our database includes a link to its source. We prioritize sources in this order:
          </p>
          <ul className={styles.contentList}>
            <li>
              <strong>Factbase/Rollcall Presidential Calendar:</strong> The official presidential public schedule
              compiled by Factbase at{' '}
              <a href="https://rollcall.com/factbase/trump/topic/calendar/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-orange)' }}>
                rollcall.com/factbase/trump/topic/calendar/
              </a>
            </li>
            <li>Official White House pool reports</li>
            <li>Major news organizations (AP, Reuters, NY Times, Washington Post, CNN, Fox News, etc.)</li>
            <li>Photographic evidence from credible sources</li>
            <li>Golf course reports and social media (verified accounts only)</li>
          </ul>

          <h3 className={styles.sectionSubtitle}>
            Accuracy & Corrections
          </h3>
          <p className={styles.textBlock}>
            We strive for 100% accuracy. If you find an error in our data, please email us at{' '}
            <a href="mailto:mail@istrumpgolfing.today" style={{ color: 'var(--color-primary-orange)' }}>
              mail@istrumpgolfing.today
            </a>{' '}
            with:
          </p>
          <ul className={styles.contentList}>
            <li>The specific date in question</li>
            <li>What you believe is incorrect</li>
            <li>A link to a credible source supporting the correction</li>
          </ul>
          <p className={styles.textBlock}>We review all submissions and issue corrections when warranted.</p>

          <h3 className={styles.sectionSubtitle}>
            What We're NOT
          </h3>
          <ul className={styles.contentList}>
            <li><strong>Not a political organization:</strong> We don't endorse candidates or take political donations</li>
            <li><strong>Not making judgments:</strong> We present data; you draw conclusions</li>
            <li><strong>Not exclusive:</strong> Golf data is just one metric of presidential activity</li>
          </ul>
        </section>

        {/* Project Info Section */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Project Information</h2>
          
          <h3 className={styles.sectionSubtitle}>
            Data Usage
          </h3>
          <p className={styles.textBlock}>
            All data on this site is freely available for journalists, researchers, and the public. We encourage fact-checking,
            verification, and republication of our data with attribution.
          </p>

          <h3 className={styles.sectionSubtitle}>
            Technical Implementation
          </h3>
          <p className={styles.textBlock}>
            This site is built with Next.js and TypeScript, statically generated for fast performance, and hosted for
            maximum uptime. The codebase is optimized for accessibility (WCAG 2.1 compliant) and mobile devices.
          </p>

          <h3 className={styles.sectionSubtitle}>
            Contact & Support
          </h3>
          <ul className={styles.contentList}>
            <li>
              Email:{' '}
              <a href="mailto:mail@istrumpgolfing.today" style={{ color: 'var(--color-primary-orange)' }}>
                mail@istrumpgolfing.today
              </a>
            </li>
            <li>
              Bluesky:{' '}
              <a href="https://bsky.app/profile/istrumpgolfing.today" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-orange)' }}>
                @istrumpgolfing.today
              </a>
            </li>
          </ul>
        </section>

        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>Home</Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/comparison" className={styles.footerLink}>Comparison</Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/cost-breakdown" className={styles.footerLink}>Cost Breakdown</Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/embed" className={styles.footerLink}>Embed Widget</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
