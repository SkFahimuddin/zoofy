import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '', country: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderItems: cart.items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: address,
        paymentMethod: 'Cash on Delivery',
        itemsPrice: cart.totalAmount,
        shippingPrice: 0,
        taxPrice: cart.totalAmount * 0.1,
        totalPrice: cart.totalAmount + (cart.totalAmount * 0.1)
      };

      await orderService.createOrder(orderData);
      await clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      alert('Failed to place order');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Street" onChange={(e) => setAddress({...address, street: e.target.value})} required />
        <input placeholder="City" onChange={(e) => setAddress({...address, city: e.target.value})} required />
        <input placeholder="State" onChange={(e) => setAddress({...address, state: e.target.value})} required />
        <input placeholder="Zip" onChange={(e) => setAddress({...address, zipCode: e.target.value})} required />
        <input placeholder="Country" onChange={(e) => setAddress({...address, country: e.target.value})} required />
        <h3>Total: ${(cart.totalAmount + (cart.totalAmount * 0.1)).toFixed(2)}</h3>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;