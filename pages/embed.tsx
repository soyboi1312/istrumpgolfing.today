import { useState } from 'react';
import { GetStaticProps } from 'next';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import { getStatusData } from '../data/status';
import { calculateGolfStats } from '../utils/statsCalculator';

interface EmbedProps {
  totalGolfDays: number;
  estimatedTotalCost: number;
}

export const getStaticProps: GetStaticProps<EmbedProps> = async () => {
  const statusData = getStatusData();
  const stats = calculateGolfStats(statusData.events, statusData.locationCosts);

  return {
    props: {
      totalGolfDays: stats.daysGolfed,
      estimatedTotalCost: stats.totalCost,
    },
  };
};

const Embed: React.FC<EmbedProps> = ({ totalGolfDays, estimatedTotalCost }) => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<div id="trump-golf-widget"></div>
<script>
(function() {
  fetch('https://istrumpgolfing.today/stats.json')
    .then(res => res.json())
    .then(data => {
      const widget = document.getElementById('trump-golf-widget');
      widget.innerHTML = \`
        <div style="border: 1px solid #333; border-radius: 8px; padding: 15px; max-width: 300px; font-family: sans-serif; background: #1a1a1a; color: #fff;">
          <h3 style="margin: 0 0 10px 0; color: #ffa500;">Trump Golf Tracker</h3>
          <p style="margin: 5px 0;"><strong>\${data.totalGolfDays}</strong> days golfed</p>
          <p style="margin: 5px 0; color: #aaa;">Cost: ~$\${(data.estimatedTotalCost/1000000).toFixed(1)}M</p>
          <a href="https://istrumpgolfing.today" style="color: #ffa500; font-size: 0.8rem;">View Full Tracker &rarr;</a>
        </div>
      \`;
    })
    .catch(console.error);
})();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <SEO
        title="Embed Widget | Is Trump Golfing Today?"
        description="Add the Trump Golf Tracker widget to your website. Free to use with attribution."
        path="/embed/"
      />

      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Embed Widget</h1>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Add to your site</h2>
          <p className={styles.textBlock}>
            Copy and paste the code below to add a live-updating widget to your website or blog. It's free to use with attribution.
          </p>

          <div className={styles.codeBlock}>
            {embedCode}
          </div>
          
          <button onClick={handleCopy} className={styles.copyButton}>
            {copied ? '✓ Copied!' : 'Copy Code'}
          </button>
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Preview</h2>
          <div className={styles.widgetPreview}>
            <h3 className={styles.widgetTitle}>Trump Golf Tracker</h3>
            <p className={styles.widgetText}><strong>{totalGolfDays}</strong> days golfed</p>
            <p className={styles.widgetTextMuted}>Cost: ~${(estimatedTotalCost / 1000000).toFixed(1)}M</p>
            <span className={styles.widgetLink}>View Full Tracker &rarr;</span>
          </div>
        </section>

        <Footer exclude={['embed']} />
      </main>
    </div>
  );
};

export default Embed;
