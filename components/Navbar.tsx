// components/Navbar.tsx
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/">
          <a className={styles.navLogo}>IS TRUMP GOLFING?</a>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/comparison"><a className={styles.navLink}>Comparison</a></Link>
          <Link href="/cost-breakdown"><a className={styles.navLink}>Cost Breakdown</a></Link>
          <Link href="/about"><a className={styles.navLink}>About</a></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
