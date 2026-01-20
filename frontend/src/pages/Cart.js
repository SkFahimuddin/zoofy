// Already created in earlier artifact - scroll up to find it
// Or use this simplified version:
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.items.map(item => (
            <div key={item._id}>
              <h3>{item.product?.name}</h3>
              <p>${item.price} x {item.quantity}</p>
            </div>
          ))}
          <h2>Total: ${cart.totalAmount}</h2>
          <Link to="/checkout">Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;