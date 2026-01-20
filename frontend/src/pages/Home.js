import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
import styles from './Home.module.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const data = await productService.getProducts({ limit: 8 });
      setFeaturedProducts(data.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Dogs', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', link: '/products?category=Dogs' },
    { name: 'Cats', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', link: '/products?category=Cats' },
    { name: 'Birds', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400', link: '/products?category=Birds' },
    { name: 'Fish', image: 'https://images.unsplash.com/photo-1520990269532-27c0e9680e3e?w=400', link: '/products?category=Fish' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h2 className={styles.heroTitle}>
                Everything Your Pet Needs
              </h2>
              <p className={styles.heroSubtitle}>
                Premium quality products for your furry, feathered, and finned friends
              </p>
              <Link to="/products" className={styles.heroButton}>
                Shop Now
                <ChevronRight size={20} />
              </Link>
            </div>
            <div className={styles.heroImage}>
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600" 
                alt="Happy pets"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoriesGrid}>
            {categories.map(category => (
              <Link 
                key={category.name}
                to={category.link}
                className={styles.categoryCard}
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className={styles.categoryImage}
                />
                <div className={styles.categoryOverlay}>
                  <h3 className={styles.categoryName}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <Link to="/products" className={styles.viewAllLink}>
              View All
              <ChevronRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚚</div>
              <h3 className={styles.featureTitle}>Free Shipping</h3>
              <p className={styles.featureDescription}>On orders over $50</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💯</div>
              <h3 className={styles.featureTitle}>Quality Products</h3>
              <p className={styles.featureDescription}>100% satisfaction guaranteed</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎁</div>
              <h3 className={styles.featureTitle}>Best Prices</h3>
              <p className={styles.featureDescription}>Competitive pricing always</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;