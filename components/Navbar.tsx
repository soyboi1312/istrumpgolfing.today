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
        <Link href="/" className={styles.navLogo} onClick={() => setIsOpen(false)}>
            IS TRUMP GOLFING?
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <Link href="/comparison" className={styles.navLink}>
            Comparison
          </Link>
          <Link href="/cost-breakdown" className={styles.navLink}>
            Cost Breakdown
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
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
            <Link href="/comparison" className={styles.mobileMenuLink} onClick={toggleMenu}>
              Comparison
            </Link>
            <Link href="/cost-breakdown" className={styles.mobileMenuLink} onClick={toggleMenu}>
              Cost Breakdown
            </Link>
            <Link href="/about" className={styles.mobileMenuLink} onClick={toggleMenu}>
              About
            </Link>
            <Link href="/embed" className={styles.mobileMenuLink} onClick={toggleMenu}>
              Embed Widget
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
