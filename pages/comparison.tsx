import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const Comparison = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trump vs Obama Golf Comparison | Is Trump Golfing Today?</title>
        <meta name="description" content="Detailed comparison of Trump's golf habits vs Obama, Bush, and Biden." />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Presidential Comparison</h1>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Golf Days (First Term)</h2>
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
                  <td>Donald Trump</td>
                  <td>293</td>
                  <td>1,461</td>
                  <td>20.1%</td>
                </tr>
                <tr>
                  <td>Barack Obama</td>
                  <td>98</td>
                  <td>1,461</td>
                  <td>6.7%</td>
                </tr>
                <tr>
                  <td>George W. Bush</td>
                  <td>24</td>
                  <td>1,461</td>
                  <td>1.6%</td>
                </tr>
                <tr>
                  <td>Bill Clinton</td>
                  <td>24</td>
                  <td>1,461</td>
                  <td>1.6%</td>
                </tr>
                <tr>
                  <td>Joe Biden</td>
                  <td>~150</td>
                  <td>1,461</td>
                  <td>~10.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.textBlock}>
            <strong>Key Insight:</strong> Trump golfed approximately 3x more frequently than Obama during their respective first terms, despite frequently criticizing Obama's golfing habits on Twitter before taking office.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Total Vacation Days</h2>
          <p className={styles.textBlock}>
            It is important to distinguish between "Golf Days" and "Vacation Days." Presidents often work from vacation homes (e.g., the Western White House).
          </p>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>President</th>
                  <th>Total Days Away</th>
                  <th>Terms</th>
                  <th>Avg Per Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>George W. Bush</td>
                  <td>1,020</td>
                  <td>2</td>
                  <td>128</td>
                </tr>
                <tr>
                  <td>Donald Trump</td>
                  <td>378</td>
                  <td>1</td>
                  <td>95</td>
                </tr>
                <tr>
                  <td>Barack Obama</td>
                  <td>328</td>
                  <td>2</td>
                  <td>41</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Cost & Logistics</h2>
          <ul className={styles.contentList}>
            <li><strong>Trump:</strong> $151.5M (4 years). High costs due to frequent travel to Florida (Air Force One + Coast Guard protection).</li>
            <li><strong>Obama:</strong> ~$105M (8 years). Lower average annual cost.</li>
            <li><strong>Bush:</strong> ~$20M (8 years). Mostly traveled to his ranch in Texas, which had lower security overhead than a public resort.</li>
          </ul>
        </section>

        {/* Footer (Reused for consistency) */}
        <div className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link href="/"><a className={styles.footerLink}>Home</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/cost-breakdown"><a className={styles.footerLink}>Cost Breakdown</a></Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/about"><a className={styles.footerLink}>About</a></Link>
          </div>
          <p className={styles.disclaimer}>
             Data produced with publicly available information. Not authorized by any candidate.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Comparison;