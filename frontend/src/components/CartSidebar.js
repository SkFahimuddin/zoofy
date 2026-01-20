import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import styles from './CartSidebar.module.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      try {
        await updateQuantity(itemId, newQuantity);
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to update quantity');
      }
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to remove item');
    }
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shopping Cart</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.cartItems}>
          {cart.items.length === 0 ? (
            <div className={styles.emptyCart}>
              <ShoppingCart size={64} className={styles.emptyIcon} />
              <p className={styles.emptyText}>Your cart is empty</p>
            </div>
          ) : (
            cart.items.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <img 
                  src={item.product?.image || 'https://via.placeholder.com/100'} 
                  alt={item.product?.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.product?.name}</h3>
                  <p className={styles.itemPrice}>${item.price}</p>
                  
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                      className={styles.quantityButton}
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                      className={styles.quantityButton}
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className={styles.removeButton}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalAmount}>${cart.totalAmount.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className={styles.checkoutButton}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;