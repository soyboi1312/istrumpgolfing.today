import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
// CHANGE 1: Use the standard Home styles
import styles from '../styles/Home.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About - Is Trump Golfing Today? Methodology & Sources</title>
        {/* ... existing meta tags ... */}
      </Head>

      <Navbar />

      <main className={styles.main}>
        {/* CHANGE 2: Use pageTitle class */}
        <h1 className={styles.pageTitle}>About This Project</h1>

        {/* CHANGE 3: Wrap logical sections in sectionCard */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.textBlock}>
            Is Trump Golfing Today? is a non-partisan, fact-based tracker...
            {/* ... content ... */}
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Why This Matters</h2>
          <p className={styles.textBlock}>
             Presidential time and taxpayer money are matters of public interest...
          </p>
          
          <h3 style={{ color: '#ffa500', fontFamily: 'Merriweather, serif', marginTop: '1.5rem' }}>Trump's Own Words</h3>
          <ul className={styles.contentList}>
            <li>"I'm going to be working for you. I'm not going to have time to go play golf." - Trump, August 2016</li>
            {/* ... other list items ... */}
          </ul>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Methodology</h2>
          <p className={styles.textBlock}>
            Each golf day is verified through multiple sources before being added to our database...
          </p>
          
          {/* Use contentList for verified sources */}
          <ul className={styles.contentList}>
             <li><strong>Pool reports:</strong> Official reports from White House press pool...</li>
             {/* ... */}
          </ul>
        </section>
        
        {/* Continue this pattern for "Data Sources", "Corrections", etc. */}

        <div className={styles.footer}>
           <div className={styles.footerLinks}>
            <Link href="/"><a className={styles.footerLink}>Home</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/comparison"><a className={styles.footerLink}>Comparison</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/cost-breakdown"><a className={styles.footerLink}>Cost Breakdown</a></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
