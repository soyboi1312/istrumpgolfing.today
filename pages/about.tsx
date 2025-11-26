import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About & Methodology | Is Trump Golfing Today?</title>
        <meta name="description" content="Methodology and sources for the Trump Golf Tracker." />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>About This Project</h1>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.textBlock}>
            <strong>Is Trump Golfing Today?</strong> is a non-partisan data tracker. 
            Our goal is to provide transparency regarding presidential travel, leisure time, and the associated costs to taxpayers.
          </p>
          <p className={styles.textBlock}>
            We do not take a political stance on whether a President <em>should</em> golf; we simply track <em>when</em> they do and <em>how much</em> it costs, contrasting actions with campaign promises.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Methodology</h2>
          <p className={styles.textBlock}>
            How do we know if he is golfing? We rely on a hierarchy of sources:
          </p>
          <ul className={styles.contentList}>
            <li><strong>White House Pool Reports:</strong> Official reports from journalists traveling with the President.</li>
            <li><strong>Visual Confirmation:</strong> Photos or videos posted to social media by club members or news outlets on the day of.</li>
            <li><strong>Flight Data:</strong> Tracking Air Force One movements to airports near golf properties (marked as "Arrival" until golf is confirmed).</li>
          </ul>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Data Sources</h2>
          <p className={styles.textBlock}>
            Cost estimates are derived from:
          </p>
          <ul className={styles.contentList}>
            <li><a href="https://www.gao.gov/products/gao-19-178" target="_blank" rel="noopener noreferrer">GAO Report 19-178</a> (Presidential Travel Expenses)</li>
            <li><a href="https://www.judicialwatch.org/" target="_blank" rel="noopener noreferrer">Judicial Watch</a> (FOIA records on Secret Service spending)</li>
            <li>Public flight hour costs for VC-25A (Air Force One) and C-17 Globemaster III aircraft.</li>
          </ul>
        </section>

        <div className={styles.footer}>
           <div className={styles.footerLinks}>
            <Link href="/"><a className={styles.footerLink}>Home</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/comparison"><a className={styles.footerLink}>Comparison</a></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;