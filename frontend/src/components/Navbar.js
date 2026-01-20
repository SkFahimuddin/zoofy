import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Package, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarMain}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>🐾</span>
            </div>
            <h1 className={styles.logoText}>Zoofy</h1>
          </Link>

          <form onSubmit={handleSearch} className={`${styles.searchForm} mobile-hide`}>
            <input
              type="text"
              placeholder="Search for pet products..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={styles.searchButton}>
              <Search size={20} />
            </button>
          </form>

          <div className={`${styles.navLinks} mobile-hide`}>
            <Link to="/products" className={styles.navLink}>Products</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={styles.navLink}>
                  <User size={20} />
                  <span>{user?.name}</span>
                </Link>
                <Link to="/orders" className={styles.navLink}>
                  <Package size={20} />
                  <span>Orders</span>
                </Link>
                <button onClick={handleLogout} className={styles.navLink} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.navLink}>Login</Link>
                <Link to="/signup" className={styles.navLink} style={{ backgroundColor: 'white', color: '#9333ea', padding: '0.5rem 1rem', borderRadius: '9999px' }}>
                  Sign Up
                </Link>
              </>
            )}

            <Link to="/cart" className={`${styles.navLink} ${styles.cartIcon}`}>
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className={styles.cartBadge}>{getCartCount()}</span>
              )}
            </Link>
          </div>

          <button className={styles.menuButton} onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <form onSubmit={handleSearch} className={`${styles.mobileSearch} desktop-hide`}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <Search size={20} />
          </button>
        </form>
      </div>

      {showMenu && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileMenuList}>
            <li className={styles.mobileMenuItem}>
              <Link to="/products" className={styles.mobileMenuLink} onClick={() => setShowMenu(false)}>
                Products
              </Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li className={styles.mobileMenuItem}>
                  <Link to="/dashboard" className={styles.mobileMenuLink} onClick={() => setShowMenu(false)}>Dashboard</Link>
                </li>
                <li className={styles.mobileMenuItem}>
                  <Link to="/orders" className={styles.mobileMenuLink} onClick={() => setShowMenu(false)}>My Orders</Link>
                </li>
                <li className={styles.mobileMenuItem}>
                  <Link to="/cart" className={styles.mobileMenuLink} onClick={() => setShowMenu(false)}>Cart ({getCartCount()})</Link>
                </li>
                <li className={styles.mobileMenuItem}>
                  <button onClick={() => { handleLogout(); setShowMenu(false); }} className={styles.mobileMenuLink} style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.mobileMenuItem}>
                  <Link to="/login" className={styles.mobileMenuLink} onClick={() => setShowMenu(false)}>Login</Link>
                </li>
                <li className={styles.mobileMenuItem}>
                  <Link to="/signup" className={styles.mobileMenuLink} onClick={() => setShowMenu(false)}>Sign Up</Link>
                </li>
                <li className={styles.mobileMenuItem}>
                  <Link to="/cart" className={styles.mobileMenuLink} onClick={() => setShowMenu(false)}>Cart ({getCartCount()})</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;