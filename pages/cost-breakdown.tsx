import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const CostBreakdown = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cost Breakdown | Is Trump Golfing Today?</title>
        <meta name="description" content="Analysis of taxpayer costs for presidential golf trips." />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Taxpayer Cost Breakdown</h1>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.textBlock}>
            The cost of a presidential golf trip varies wildly based on location. A flight to Florida on Air Force One is significantly more expensive than a motorcade drive to a local course in Virginia.
          </p>
          <p className={styles.textBlock}>
            Below are the estimated costs per trip type, based on GAO reports and Department of Defense flight hour data.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>1. The "Mar-a-Lago" Weekend</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> West Palm Beach, FL<br/>
            <strong>Cost:</strong> ~$3.4 Million per trip
          </p>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <tbody>
                <tr>
                  <td>Air Force One & Cargo Planes</td>
                  <td>$1,875,000</td>
                </tr>
                <tr>
                  <td>Coast Guard (Maritime Security)</td>
                  <td>$762,500</td>
                </tr>
                <tr>
                  <td>Secret Service / DOD Per Diem</td>
                  <td>$750,000</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>$3,387,500</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>2. The "Bedminster" Trip</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> New Jersey<br/>
            <strong>Cost:</strong> ~$350,000 per trip
          </p>
          <ul className={styles.contentList}>
            <li>Cheaper because it is a shorter flight.</li>
            <li>Often uses Marine One (helicopter) or smaller aircraft instead of full motorcade transport via C-17s.</li>
            <li>No extensive maritime security required.</li>
          </ul>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>3. The "Local" Round</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> Sterling, VA (Trump National)<br/>
            <strong>Cost:</strong> &lt; $100,000
          </p>
          <ul className={styles.contentList}>
            <li>Motorcade only (no flight costs).</li>
            <li>Primary cost is Secret Service overtime and local police coordination.</li>
          </ul>
        </section>

        <div className={styles.footer}>
           <div className={styles.footerLinks}>
            <Link href="/"><a className={styles.footerLink}>Home</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/comparison"><a className={styles.footerLink}>Comparison</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/about"><a className={styles.footerLink}>About</a></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CostBreakdown;