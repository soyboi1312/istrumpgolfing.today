// components/Footer.tsx
import Link from 'next/link';
import Image from "next-image-export-optimizer";
import styles from '../styles/Home.module.css';

interface FooterProps {
  /** Which links to show - defaults to all except current page */
  exclude?: ('home' | 'comparison' | 'cost-breakdown' | 'embed' | 'about')[];
  /** Whether to show the full footer with disclaimer and social (only on home page) */
  variant?: 'full' | 'minimal';
}

const Footer: React.FC<FooterProps> = ({ exclude = [], variant = 'minimal' }) => {
  const links = [
    { key: 'home', href: '/', label: 'Home' },
    { key: 'comparison', href: '/comparison', label: 'Presidential Comparison' },
    { key: 'cost-breakdown', href: '/cost-breakdown', label: 'Cost Breakdown' },
    { key: 'embed', href: '/embed', label: 'Embed Widget' },
    { key: 'about', href: '/about', label: 'About' },
  ].filter(link => !exclude.includes(link.key as typeof exclude[number]));

  return (
    <div className={styles.footer}>
      <div className={styles.footerLinks}>
        {links.map((link, index) => (
          <span key={link.key}>
            {index > 0 && <span className={styles.footerSeparator}>|</span>}
            <Link href={link.href} className={styles.footerLink}>
              {link.label}
            </Link>
          </span>
        ))}
      </div>

      {variant === 'full' && (
        <>
          <p className={styles.disclaimer}>
            This data is produced with publicly available information and is not
            authorized or endorsed by any political organization.
          </p>

          <p className={styles.disclaimer}>
            Need to get ahold of us?{' '}
            <a href="mailto:mail@istrumpgolfing.today" className={styles.contactLink}>
              mail@istrumpgolfing.today
            </a>
          </p>

          <div className={styles.socialLink}>
            <a
              href="https://bsky.app/profile/istrumpgolfing.today"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Bluesky"
            >
              <Image
                src="/files/icons/bluesky.svg"
                className={styles.socialIcon}
                alt="Bluesky"
                width={24}
                height={24}
              />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
