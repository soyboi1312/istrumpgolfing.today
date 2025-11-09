import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/CostBreakdown.module.css';

/**
 * Embed Widget Page
 *
 * Provides embeddable widget code for journalists and websites
 * to display Trump golf statistics on their own sites.
 *
 * @returns Embed widget page with code examples
 */
const Embed = () => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- Trump Golf Tracker Widget -->
<div id="trump-golf-widget"></div>
<script>
(function() {
  fetch('https://istrumpgolfing.today/api/stats')
    .then(res => res.json())
    .then(data => {
      const widget = document.getElementById('trump-golf-widget');
      widget.innerHTML = \`
        <div style="border: 2px solid #ffa500; border-radius: 10px; padding: 20px; max-width: 400px; font-family: Arial, sans-serif; background: #1a1a1a; color: #fff;">
          <h3 style="margin: 0 0 15px 0; color: #ffa500; font-size: 1.3rem;">Trump Golf Tracker</h3>
          <p style="margin: 10px 0; font-size: 1.1rem;">
            <strong>\${data.totalGolfDays}</strong> golf days (\${data.percentageGolfed}%)
          </p>
          <p style="margin: 10px 0; color: #ccc;">
            Estimated cost: <strong style="color: #ffa500;">~$\${data.estimatedTotalCost.toLocaleString()}</strong>
          </p>
          <p style="margin: 15px 0 0 0; font-size: 0.85rem;">
            <a href="https://istrumpgolfing.today" target="_blank" style="color: #ffa500; text-decoration: none;">
              View full tracker →
            </a>
          </p>
        </div>
      \`;
    })
    .catch(err => console.error('Trump Golf Widget Error:', err));
})();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Embed Widget - Is Trump Golfing Today?</title>
        <meta name="description" content="Free embeddable Trump golf tracker widget for journalists and websites. Add real-time golf statistics to your site with our simple embed code." />
        <meta name="keywords" content="trump golf widget, embed trump tracker, golf statistics widget, presidential golf embed" />
        <link rel="canonical" href="https://istrumpgolfing.today/embed" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Embeddable Widget</h1>

        <div className={`${styles.blurb} ${styles.blurbContainer}`}>
          <h2 className={styles.subtitle}>Add Trump Golf Stats to Your Website</h2>
          <p>
            Journalists, bloggers, and website owners can embed our Trump golf tracker on their sites for free.
            The widget pulls live data from our API and displays current statistics with attribution.
          </p>

          <h3 className={styles.tableTitle}>Widget Preview</h3>
          <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
            <div id="trump-golf-widget-demo" style={{
              border: '2px solid #ffa500',
              borderRadius: '10px',
              padding: '20px',
              maxWidth: '400px',
              fontFamily: 'Arial, sans-serif',
              background: '#1a1a1a',
              color: '#fff'
            }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#ffa500', fontSize: '1.3rem' }}>Trump Golf Tracker</h3>
              <p style={{ margin: '10px 0', fontSize: '1.1rem' }}>
                <strong>Loading...</strong>
              </p>
              <p style={{ margin: '15px 0 0 0', fontSize: '0.85rem' }}>
                <a href="https://istrumpgolfing.today" target="_blank" rel="noopener noreferrer" style={{ color: '#ffa500', textDecoration: 'none' }}>
                  View full tracker →
                </a>
              </p>
            </div>
          </div>

          <h3 className={styles.tableTitle}>Embed Code</h3>
          <p>Copy and paste this code anywhere in your HTML:</p>

          <div style={{ position: 'relative', margin: '1.5rem 0' }}>
            <pre style={{
              background: '#2d2d2d',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              color: '#f8f8f2'
            }}>
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={handleCopy}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '0.5rem 1rem',
                background: '#ffa500',
                border: 'none',
                borderRadius: '5px',
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
          </div>

          <h3 className={styles.tableTitle}>Using Our API</h3>
          <p>
            For more advanced integrations, you can use our public JSON API:
          </p>
          <div style={{
            background: '#2d2d2d',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#f8f8f2',
            margin: '1rem 0'
          }}>
            <code>GET https://istrumpgolfing.today/api/stats</code>
          </div>

          <h3 className={styles.tableTitle}>API Response Format</h3>
          <pre style={{
            background: '#2d2d2d',
            padding: '1.5rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.85rem',
            lineHeight: '1.5',
            color: '#f8f8f2',
            margin: '1rem 0'
          }}>
            <code>{`{
  "termStart": "2025-01-20",
  "currentDate": "2025-11-09",
  "daysSinceStart": 293,
  "totalGolfDays": 0,
  "percentageGolfed": "0.0",
  "estimatedTotalCost": 0,
  "golfDaysByLocation": {},
  "recentGolfDays": [],
  "metadata": {
    "dataVersion": "2.0",
    "lastUpdated": "2025-11-09T...",
    "attribution": "Is Trump Golfing Today?",
    "website": "https://istrumpgolfing.today"
  }
}`}</code>
          </pre>

          <h3 className={styles.tableTitle}>Terms of Use</h3>
          <ul className={styles.sourcesList}>
            <li><strong>Free to use:</strong> No API key or registration required</li>
            <li><strong>Attribution required:</strong> Keep the "View full tracker" link in the widget</li>
            <li><strong>No modifications:</strong> Don't alter the data or misrepresent its source</li>
            <li><strong>Rate limits:</strong> API responses are cached for 1 hour. Please don't hammer our servers</li>
            <li><strong>No warranty:</strong> Data provided as-is. Verify important information independently</li>
          </ul>

          <h3 className={styles.tableTitle}>Support & Questions</h3>
          <p>
            For technical support, custom integrations, or questions, email us at{' '}
            <a href="mailto:mail@istrumpgolfing.today" style={{ color: '#ffa500' }}>
              mail@istrumpgolfing.today
            </a>
          </p>
        </div>

        <div className={styles.footer}>
          <Link href="/">
            <a className={styles.homeLink}>← Back to Main Tracker</a>
          </Link>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            fetch('https://istrumpgolfing.today/api/stats')
              .then(res => res.json())
              .then(data => {
                const widget = document.getElementById('trump-golf-widget-demo');
                if (widget) {
                  widget.innerHTML = \`
                    <h3 style="margin: 0 0 15px 0; color: #ffa500; font-size: 1.3rem;">Trump Golf Tracker</h3>
                    <p style="margin: 10px 0; font-size: 1.1rem;">
                      <strong>\${data.totalGolfDays}</strong> golf days (\${data.percentageGolfed}%)
                    </p>
                    <p style="margin: 10px 0; color: #ccc;">
                      Estimated cost: <strong style="color: #ffa500;">~$\${data.estimatedTotalCost.toLocaleString()}</strong>
                    </p>
                    <p style="margin: 15px 0 0 0; font-size: 0.85rem;">
                      <a href="https://istrumpgolfing.today" target="_blank" style="color: #ffa500; text-decoration: none;">
                        View full tracker →
                      </a>
                    </p>
                  \`;
                }
              })
              .catch(err => console.error('Trump Golf Widget Error:', err));
          })();
        `
      }} />
    </div>
  );
};

export default Embed;
