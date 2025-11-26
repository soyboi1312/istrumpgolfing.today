import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const CostBreakdown = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trump Golf Cost to Taxpayers - Breakdown & Analysis | Is Trump Golfing Today?</title>
        <meta name="description" content="Analysis of taxpayer costs for presidential golf trips." />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="The Cost of Presidential Golf" />
        <meta property="og:description" content="Breakdown of the $3.4M Mar-a-Lago weekends vs local trips." />
        <meta property="og:image" content="https://istrumpgolfing.today/files/istrumpgolfing.webp" />
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
                "name": "Cost Breakdown",
                "item": "https://istrumpgolfing.today/cost-breakdown"
              }]
            })
          }}
        />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Taxpayer Cost Breakdown</h1>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Executive Summary</h2>
          <p className={styles.textBlock}>
            The taxpayer cost of presidential golf trips varies dramatically depending on the destination. The primary cost drivers are <strong>flight distance</strong>, the <strong>type of aircraft</strong> required, and <strong>location-specific security needs</strong>.
          </p>
          <p className={styles.textBlock}>
            Below is an analysis based on Government Accountability Office (GAO) reports and Department of Defense flight hour data.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>1. The "Mar-a-Lago" Weekend</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> West Palm Beach, FL<br/>
            <strong>Cost:</strong> ~$3.4 Million per trip
          </p>
          <p className={styles.textBlock}>
            This high cost is driven by the use of <strong>Air Force One</strong> (Boeing 747) and the necessity of <strong>C-5M Super Galaxy</strong> or C-17 heavy airlift aircraft to transport the motorcade. Additionally, the resort's coastal location requires a unique and expensive maritime security operation by the U.S. Coast Guard.
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
          <p className={styles.textBlock}>
            A low-to-mid-range cost scenario. Due to its proximity to Washington, DC (~50 miles), these trips avoid the need for heavy cargo planes.
          </p>
          <ul className={styles.contentList}>
            <li>Travel relies primarily on <strong>Marine One</strong> helicopters and local aircraft support.</li>
            <li>No heavy airlift (C-5M) required for motorcade.</li>
            <li>No maritime security requirements.</li>
          </ul>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>3. The "Local" Round</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> Sterling, VA (Trump National)<br/>
            <strong>Cost:</strong> &lt; $100,000
          </p>
          <p className={styles.textBlock}>
            The lowest-cost scenario. Because this location is near the White House, travel is conducted entirely by motorcade, <strong>eliminating all aircraft expenses</strong>—the largest component of travel costs. The total cost consists mainly of vehicle operations and personnel overtime.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>4. Hypothetical: Long Distance</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> e.g., Las Vegas, NV<br/>
            <strong>Cost:</strong> &gt; $5.0 Million per trip
          </p>
          <p className={styles.textBlock}>
             Using this framework, a trip to the West Coast would be significantly more expensive than Mar-a-Lago. The higher figure is primarily due to the <strong>flight time</strong> (5+ hours vs 2 hours), which doubles the operational costs for both Air Force One and the heavy cargo support needed to transport the motorcade.
          </p>
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
