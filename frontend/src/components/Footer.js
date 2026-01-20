import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div>
            <div className={styles.footerBrand}>
              <span style={{ fontSize: '1.5rem' }}>🐾</span>
              <h3 className={styles.footerBrandText}>Zoofy</h3>
            </div>
            <p className={styles.footerDescription}>Your one-stop shop for all pet needs</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <ul className={styles.footerList}>
              <li className={styles.footerListItem}>
                <Link to="/products" className={styles.footerLink}>Products</Link>
              </li>
              <li className={styles.footerListItem}>
                <Link to="/about" className={styles.footerLink}>About Us</Link>
              </li>
              <li className={styles.footerListItem}>
                <Link to="/contact" className={styles.footerLink}>Contact</Link>
              </li>
              <li className={styles.footerListItem}>
                <Link to="/faq" className={styles.footerLink}>FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={styles.footerTitle}>Categories</h4>
            <ul className={styles.footerList}>
              <li className={styles.footerListItem}>
                <Link to="/products?category=Dogs" className={styles.footerLink}>Dogs</Link>
              </li>
              <li className={styles.footerListItem}>
                <Link to="/products?category=Cats" className={styles.footerLink}>Cats</Link>
              </li>
              <li className={styles.footerListItem}>
                <Link to="/products?category=Birds" className={styles.footerLink}>Birds</Link>
              </li>
              <li className={styles.footerListItem}>
                <Link to="/products?category=Fish" className={styles.footerLink}>Fish</Link>
              </li>
              <li className={styles.footerListItem}>
                <Link to="/products?category=Small Pets" className={styles.footerLink}>Small Pets</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <div className={styles.footerContact}>
              <Phone size={16} />
              <span>+1 234 567 8900</span>
            </div>
            <div className={styles.footerContact}>
              <Mail size={16} />
              <span>info@zoofy.com</span>
            </div>
            <div className={styles.footerContact}>
              <MapPin size={16} />
              <span>123 Pet Street, NY</span>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2026 Zoofy Pet Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;