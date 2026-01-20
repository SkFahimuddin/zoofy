import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    
    try {
      await addToCart(product._id, 1);
      alert('Product added to cart!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <Link to={`/products/${product._id}`} className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image || 'https://via.placeholder.com/400'} 
          alt={product.name}
          className={styles.productImage}
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className={`${styles.stockBadge} ${styles.stockLow}`}>
            Only {product.stock} left!
          </span>
        )}
        {product.stock === 0 && (
          <span className={`${styles.stockBadge} ${styles.stockOut}`}>
            Out of Stock
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.productName}>{product.name}</h3>
        
        <div className={styles.rating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className={styles.ratingText}>({product.rating || 0})</span>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.price}>${product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={styles.addButton}
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;