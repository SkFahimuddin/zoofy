import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import productService from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await addToCart(product._id, quantity);
      alert('Product added to cart successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div className={styles.detailCard}>
          <div className={styles.detailGrid}>
            <div className={styles.imageSection}>
              <img
                src={product.image || 'https://via.placeholder.com/600'}
                alt={product.name}
              />
            </div>

            <div className={styles.infoSection}>
              <div className={styles.productCategory}>{product.category}</div>
              <h1 className={styles.productTitle}>{product.name}</h1>

              <div className={styles.ratingSection}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className={styles.ratingText}>
                  ({product.rating || 0}) • {product.numReviews || 0} reviews
                </span>
              </div>

              <div className={styles.price}>${product.price}</div>

              <div className={styles.stockStatus}>
                {product.stock > 0 ? (
                  <span className={styles.inStock}>In Stock ({product.stock} available)</span>
                ) : (
                  <span className={styles.outOfStock}>Out of Stock</span>
                )}
              </div>

              <div className={styles.descriptionSection}>
                <h3 className={styles.sectionTitle}>Description</h3>
                <p className={styles.description}>{product.description}</p>
              </div>

              {product.brand && (
                <div className={styles.brandSection}>
                  <strong>Brand:</strong> {product.brand}
                </div>
              )}

              {product.stock > 0 && (
                <div className={styles.quantitySection}>
                  <label className={styles.sectionTitle}>Quantity</label>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={styles.quantityButton}
                    >
                      <Minus size={20} />
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className={styles.quantityButton}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={styles.addToCartButton}
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button className={styles.wishlistButton}>
                  <Heart size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;