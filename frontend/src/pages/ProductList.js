import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';
import { Search, Filter } from 'lucide-react';
import styles from './ProductList.module.css';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets', 'Reptiles'];

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
    
    loadProducts(category, search);
  }, [searchParams]);

  const loadProducts = async (category, search) => {
    setLoading(true);
    try {
      const params = {};
      if (category && category !== 'All') params.category = category;
      if (search) params.search = search;

      const data = await productService.getProducts(params);
      setProducts(data.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    loadProducts(category === 'All' ? null : category, searchQuery);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts(selectedCategory === 'All' ? null : selectedCategory, searchQuery);
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.productsHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Our Products</h1>
          
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className={styles.searchInput}
              />
            </div>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <div className={styles.filterHeader}>
            <Filter size={20} />
            <span>Filter by Category:</span>
          </div>
          <div className={styles.categoryFilters}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`${styles.categoryButton} ${selectedCategory === cat ? styles.active : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.productsContent}>
        <div className="container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
              <div className="spinner"></div>
            </div>
          ) : products.length === 0 ? (
            <div className={styles.noResults}>
              <p className={styles.noResultsTitle}>No products found</p>
              <p className={styles.noResultsText}>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <>
              <p className={styles.resultsCount}>{products.length} products found</p>
              <div className={styles.productsGrid}>
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;