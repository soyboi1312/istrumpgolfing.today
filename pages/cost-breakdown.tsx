import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/CostBreakdown.module.css';

/**
 * Cost Breakdown Page Component
 *
 * Displays detailed breakdowns of presidential golf trip costs across different locations.
 * Cost estimates are based on GAO reports and various governmental analyses.
 *
 * Cost Sources:
 * - Mar-a-Lago, FL: ~$3.4M per weekend (GAO-19-178 report on 4 Mar-a-Lago trips)
 * - Bedminster, NJ: ~$350K per 3-day trip (close proximity to DC, reduced aircraft requirements)
 * - Sterling, VA / Washington, DC: <$100K per day trip (motorcade only, no aircraft)
 * - Las Vegas, NV: ~$5M per weekend (hypothetical, based on extended flight distance)
 *
 * @returns Detailed cost breakdown page with tables and source references
 */
const CostBreakdown = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cost Breakdown - Is Trump Golfing Today?</title>
        <meta name="description" content="Detailed cost analysis of Trump's presidential golf trips based on GAO reports. Learn why Mar-a-Lago trips cost $3.4M, Bedminster $350K, and DC trips under $100K per visit." />
        <meta name="keywords" content="Trump golf costs, presidential travel expenses, Mar-a-Lago cost, GAO report, taxpayer money, presidential golf trips" />
        <link rel="canonical" href="https://istrumpgolfing.today/cost-breakdown" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Presidential Golf Trip Cost Breakdown</h1>
        <div className={`${styles.blurb} ${styles.blurbContainer}`}>
            <p>The taxpayer cost of presidential golf trips varies dramatically depending on the destination, with the primary cost drivers being flight distance, the type of aircraft required, and location-specific security needs. A Government Accountability Office (GAO) report on four of President Trump's trips to his Mar-a-Lago club in Florida established a baseline cost of approximately $3.4 million per weekend. This high cost is driven by the use of the large Air Force One (a modified Boeing 747), the necessity of C-17 cargo planes to transport the presidential motorcade, and a unique, expensive maritime security operation by the U.S. Coast Guard required by the resort's coastal location.</p>
            <p>In contrast, a trip to the Trump National Golf Club in Bedminster, New Jersey, represents a low-to-mid-range cost scenario, estimated at approximately $350,000 per 3-day trip. Due to its proximity to Washington, DC (approximately 50 miles), Bedminster trips avoid the need for large aircraft like Air Force One or C-17 cargo planes. Instead, travel relies primarily on Marine One helicopters, local aircraft support, and motorcade operations, with no maritime security requirements. The lowest-cost scenario is a day trip to the Trump National Golf Club in Sterling, Virginia. Because this location is even closer to the White House, travel is conducted entirely by motorcade, eliminating all aircraft expenses—the largest component of travel costs. The total for a Sterling trip is estimated to be under $100,000, composed mainly of vehicle operating costs and personnel overtime.</p>
            <p>Using this same framework, a hypothetical weekend trip to Las Vegas would be even more expensive than one to Mar-a-Lago, with an estimated cost of over $5 million. This higher figure is primarily due to the much longer flight time from Washington, D.C., which significantly increases the operational costs for both Air Force One and the C-17 cargo planes needed to transport the motorcade.</p>
            <h2 className={styles.subtitle}>Location-Based Cost Breakdowns</h2>
            <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Cost Component (Per Weekend Trip to Mar-a-Lago, FL)</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cost Component</th>
                        <th>Estimated Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Estimated Per-Trip Cost</td>
                        <td>$3,400,000</td>
                    </tr>
                    <tr>
                        <td>Department of Defense (DOD) Total</td>
                        <td>$2,117,000</td>
                    </tr>
                    <tr>
                        <td className={styles.subItem}>Operational Costs (Mainly Aircraft)</td>
                        <td className={styles.subItem}>$1,875,000</td>
                    </tr>
                    <tr>
                        <td className={styles.subItem}>Temporary Duty (TDY) Costs (Personnel)</td>
                        <td className={styles.subItem}>$242,000</td>
                    </tr>
                    <tr>
                        <td>Department of Homeland Security (DHS) Total</td>
                        <td>$1,268,000</td>
                    </tr>
                    <tr>
                        <td className={styles.subItem}>Operational Costs (Mainly USCG Boats)</td>
                        <td className={styles.subItem}>$762,500</td>
                    </tr>
                    <tr>
                        <td className={styles.subItem}>Temporary Duty (TDY) Costs (USSS/USCG Personnel)</td>
                        <td className={styles.subItem}>$505,500</td>
                    </tr>
                    <tr>
                        <td>Other Executive Agencies</td>
                        <td>$7,250</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
                <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Cost Component (Per 3-Day Trip to Bedminster, NJ)</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cost Component</th>
                        <th>Estimated Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Estimated Per-Trip Cost</td>
                        <td>~$350,000</td>
                    </tr>
                    <tr>
                        <td>Marine One Helicopters</td>
                        <td>$57,000</td>
                    </tr>
                    <tr>
                        <td>Local Aircraft Support</td>
                        <td>$50,000</td>
                    </tr>
                    <tr>
                        <td>Motorcade Operations</td>
                        <td>$60,000</td>
                    </tr>
                    <tr>
                        <td>DOD/DHS Personnel (3-Day)</td>
                        <td>$100,000</td>
                    </tr>
                    <tr>
                        <td>Secret Service Staffing</td>
                        <td>$50,000</td>
                    </tr>
                    <tr>
                        <td>Bedminster Township Law Enforcement</td>
                        <td>$33,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
                <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Cost Component (Per Day Trip to Sterling, VA or Washington, DC)</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cost Component</th>
                        <th>Estimated Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Est. Weekend Cost</td>
                        <td>&lt; $100,000 (per day trip)</td>
                    </tr>
                    <tr>
                        <td>Primary Aircraft</td>
                        <td>None (Motorcade only)</td>
                    </tr>
                    <tr>
                        <td>Cargo Aircraft</td>
                        <td>None</td>
                    </tr>
                    <tr>
                        <td>Maritime Security</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>Primary Cost Drivers</td>
                        <td>Motorcade operations, personnel overtime (federal & local)</td>
                    </tr>
                    <tr>
                        <td>Key Cost Reductions</td>
                        <td>Complete elimination of air travel, no overnight TDY costs</td>
                    </tr>
                </tbody>
            </table>
        </div>
                
                <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Estimated Cost for a Weekend Trip to Las Vegas, NV</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Cost Component</th>
                        <th>Estimated Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Air Force One (VC-25A)</td>
                        <td>~$2,730,000</td>
                    </tr>
                    <tr>
                        <td>C-17 Cargo Flights</td>
                        <td>~$1,500,000+</td>
                    </tr>
                    <tr>
                        <td>Marine One Helicopter</td>
                        <td>~$57,000</td>
                    </tr>
                    <tr>
                        <td>Personnel (TDY) Costs</td>
                        <td>~$750,000</td>
                    </tr>
                    <tr>
                        <td>Total Estimated Cost</td>
                        <td>~$5,037,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>

        <div className={styles.sourcesSection}>
          <h2 className={styles.subtitle}>Sources and Related Content</h2>
          <ul className={styles.sourcesList}>
            <li><a href="https://www.gao.gov/products/gao-19-178" target="_blank" rel="noopener noreferrer">Presidential Travel: Secret Service and DOD Need to Ensure That Expenditure Reports Are Prepared and Submitted to Congress - GAO</a></li>
            <li><a href="https://gao.gov/assets/gao-19-178.pdf" target="_blank" rel="noopener noreferrer">GAO-19-178, PRESIDENTIAL TRAVEL: Secret Service and DOD Need to Ensure That Expenditure Reports Are Prepared and Submitted to Congress</a></li>
            <li><a href="https://elections101.iowa.gov/wp-content/uploads/2021/09/Trumps-Golf-Costs-HuffPost.docx" target="_blank" rel="noopener noreferrer">Trump's Golf Costs - Elections 101</a></li>
            <li><a href="https://americanprogressaction.org/article/president-trump-track-charge-taxpayers-240-million-golf-trips" target="_blank" rel="noopener noreferrer">President Trump on Track to Charge Taxpayers $237 Million for Golf Trips</a></li>
          </ul>
        </div>

        <div className={styles.footer}>
          <Link href="/">
            <a className={styles.homeLink}>Back to Home</a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CostBreakdown;
