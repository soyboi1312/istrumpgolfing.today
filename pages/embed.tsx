import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

const Embed = () => {
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
      <Head>
        <title>Embed Widget | Is Trump Golfing Today?</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Add the Trump Golf Tracker to your website." />
        <link rel="icon" href="/files/fav/icon.svg" type="image/svg+xml" />
      </Head>

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
          <div style={{
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '15px',
            maxWidth: '300px',
            background: '#1a1a1a',
            margin: '0 auto'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#ffa500', fontFamily: 'Merriweather, serif' }}>Trump Golf Tracker</h3>
            <p style={{ margin: '5px 0', color: '#fff' }}><strong>85</strong> days golfed</p>
            <p style={{ margin: '5px 0', color: '#aaa' }}>Cost: ~$60.8M</p>
            <span style={{ color: '#ffa500', fontSize: '0.8rem', textDecoration: 'underline' }}>View Full Tracker &rarr;</span>
          </div>
        </section>

        <div className={styles.footer}>
           <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>Home</Link>
            <span className={styles.footerSeparator}>|</span>
            <Link href="/about" className={styles.footerLink}>About</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Embed;
