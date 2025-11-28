import { GetStaticProps } from 'next';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import { getStatusData } from '../data/status';
import { calculateGolfStats } from '../utils/statsCalculator';
import { isGolfEventType } from '../types';

interface LocationCostData {
  location: string;
  days: number;
  costPerDay: number;
  totalCost: number;
}

interface CostBreakdownProps {
  locationData: LocationCostData[];
  totalDays: number;
  totalCost: number;
}

export const getStaticProps: GetStaticProps<CostBreakdownProps> = async () => {
  const statusData = getStatusData();
  const { events, locationCosts } = statusData;
  const stats = calculateGolfStats(events, locationCosts);

  // Count days by location
  const daysByLocation: Record<string, number> = {};
  Object.values(events).forEach((event) => {
    if (isGolfEventType(event.type)) {
      daysByLocation[event.location] = (daysByLocation[event.location] || 0) + 1;
    }
  });

  // Build location data array with per-day costs
  const locationData: LocationCostData[] = Object.keys(daysByLocation)
    .map((location) => {
      const days = daysByLocation[location];
      const costPerDay = locationCosts[location] || 0;
      return {
        location,
        days,
        costPerDay,
        totalCost: days * costPerDay,
      };
    })
    .sort((a, b) => b.totalCost - a.totalCost);

  return {
    props: {
      locationData,
      totalDays: stats.daysGolfed,
      totalCost: stats.totalCost,
    },
  };
};

const CostBreakdown: React.FC<CostBreakdownProps> = ({ locationData, totalDays, totalCost }) => {
  return (
    <div className={styles.container}>
      <SEO
        title="Trump Golf Cost to Taxpayers - Breakdown & Analysis Is Trump Golfing"
        description="See the detailed taxpayer cost breakdown for presidential golf trips. Analysis includes expenses for Mar-a-Lago, Bedminster, and local outings." 
        path="/cost-breakdown/"
      />

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
            <strong>Cost:</strong> ~$1.1 million per trip
          </p>
          <p className={styles.textBlock}>
            Trips to Bedminster cost approximately $1.1 million each. This cost is lower than florida trips because the President typically uses a smaller <strong>Boeing 757</strong> instead of the 747 (Air Force One).
          </p>
          <ul className={styles.contentList}>
            <li>Travel uses a smaller 757, reducing flight costs compared to the 747.</li>
            <li>No maritime security requirements.</li>
            <li>Includes costs for secret Service protection and logistics.</li>
          </ul>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>3. The "Local" Round</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> Washington, DC<br/>
            <strong>Cost:</strong> &lt; $150,000
          </p>
          <p className={styles.textBlock}>
            The lowest-cost scenario. Because this location is near the White House, travel is conducted entirely by motorcade, <strong>eliminating all aircraft expenses</strong>—the largest component of travel costs. The total cost consists mainly of vehicle operations and personnel overtime.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>4. Las Vegas & West Coast</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> Las Vegas, NV<br/>
            <strong>Cost:</strong> ~$2.0 Million per day
          </p>
          <p className={styles.textBlock}>
            Trips to the West Coast are more expensive than Florida due to the longer <strong>flight time</strong> (~4.5 hours vs ~2.5 hours to Florida). This increases operational costs for Air Force One and cargo aircraft transporting the motorcade.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>5. International: Scotland</h2>
          <p className={styles.textBlock}>
            <strong>Location:</strong> Trump Turnberry / Aberdeen, Scotland<br/>
            <strong>Cost:</strong> ~$2.0 Million per day
          </p>
          <p className={styles.textBlock}>
            Transatlantic trips involve ~7 hour flights each way on Air Force One (~$2.8M each way). Combined with cargo aircraft, international security coordination, and extended advance team deployments, these are among the most expensive presidential trips.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Current Cost by Location</h2>
          <p className={styles.textBlock}>
            Below is the breakdown of golf days and estimated taxpayer costs by location for the current term:
          </p>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Days</th>
                  <th>Cost/Day</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {locationData.map((loc) => (
                  <tr key={loc.location}>
                    <td>{loc.location}</td>
                    <td>{loc.days}</td>
                    <td>${loc.costPerDay.toLocaleString()}</td>
                    <td>${loc.totalCost.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className={styles.tableTotalRow}>
                  <td>Total</td>
                  <td>{totalDays}</td>
                  <td>—</td>
                  <td>${totalCost.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`${styles.textBlock} ${styles.noteText}`}>
            <strong>Important:</strong> These figures represent <strong>minimum estimates</strong> based on golf days only.
            Per-day costs are derived from GAO per-trip estimates divided by average trip length (~2.5 days).
          </p>
          <p className={`${styles.textBlock} ${styles.noteText}`}>
            Actual costs are likely <strong>20-40% higher</strong> when accounting for arrival and departure days,
            advance team deployments, and post-visit security operations. The full security apparatus (Air Force One,
            Coast Guard, Secret Service) is deployed for the entire trip duration, not just golf days.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>External Estimates & Validation</h2>
          <p className={styles.textBlock}>
            Independent analyses from news organizations and watchdog groups provide additional context for these estimates:
          </p>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <tbody>
                <tr>
                  <td>Second Term (2025) - External Estimate</td>
                  <td>~$70.8 Million</td>
                </tr>
                <tr>
                  <td>First Term Total (2017-2021)</td>
                  <td>$151.5 Million</td>
                </tr>
                <tr>
                  <td>Projected Full Second Term</td>
                  <td>~$300 Million</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`${styles.textBlock} ${styles.noteText}`}>
            Sources: Independent media reports based on GAO methodology and public records.
            Variations between estimates reflect different counting methods and which expenses are included.
          </p>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Additional Cost: Payments to Trump Properties</h2>
          <p className={styles.textBlock}>
            Beyond travel and security costs, taxpayer money flows <strong>directly to Trump-owned businesses</strong> when
            the Secret Service rents rooms, golf carts, and facilities at his properties.
          </p>
          <div className={styles.tableContainer}>
            <table className={styles.dataTable}>
              <tbody>
                <tr>
                  <td>Secret Service at Trump Properties (2025)</td>
                  <td>~$100,000</td>
                </tr>
                <tr>
                  <td>Golf Carts & Portable Toilets (Bedminster)</td>
                  <td>$600,000+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={`${styles.textBlock} ${styles.noteText}`}>
            Source: Citizens for Responsibility and Ethics in Washington (CREW) via FOIA requests.
            These payments represent revenue to Trump&apos;s businesses on top of the travel costs tracked above.
          </p>
        </section>

        <Footer exclude={['cost-breakdown']} />
      </main>
    </div>
  );
};

export default CostBreakdown;
