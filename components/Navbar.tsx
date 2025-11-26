// components/Navbar.tsx
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/">
          <a className={styles.navLogo} onClick={() => setIsOpen(false)}>
            IS TRUMP GOLFING?
          </a>
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <Link href="/comparison"><a className={styles.navLink}>Comparison</a></Link>
          <Link href="/cost-breakdown"><a className={styles.navLink}>Cost Breakdown</a></Link>
          <Link href="/about"><a className={styles.navLink}>About</a></Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={styles.hamburger} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen : ''}`} />
          <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen : ''}`} />
          <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen : ''}`} />
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileMenuLinks}>
            <Link href="/comparison">
              <a className={styles.mobileMenuLink} onClick={toggleMenu}>Comparison</a>
            </Link>
            <Link href="/cost-breakdown">
              <a className={styles.mobileMenuLink} onClick={toggleMenu}>Cost Breakdown</a>
            </Link>
            <Link href="/about">
              <a className={styles.mobileMenuLink} onClick={toggleMenu}>About</a>
            </Link>
            <Link href="/embed">
              <a className={styles.mobileMenuLink} onClick={toggleMenu}>Embed Widget</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
