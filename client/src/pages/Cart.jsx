import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart
  useEffect(() => {
    const syncCart = () => {
      const data = JSON.parse(localStorage.getItem("cart")) || [];

      const updatedData = data.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1,
      }));

      setCart(updatedData);
    };

    syncCart();

    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  // Update cart
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    updateCart(updated);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updated = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    updateCart(updated);
  };

  // Remove item
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);

    updateCart(updated);
  };

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Place Order
  // Place Order
const placeOrder = () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Save tracking information
  localStorage.setItem("orderPlaced", "true");
  localStorage.setItem("orderStatus", "Preparing");

  alert("🎉 Order placed successfully!");

  // Clear cart
  updateCart([]);

  // Navigate to Track page
  navigate("/track");
};

  return (
    <div className="cart-container">
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some delicious food 🍕🍔🍟</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">

                <img
                  src={`https://shoyu-backend.onrender.com${item.image}`}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <h4>
                  ₹{item.price * item.quantity}
                </h4>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{total}</h2>

            <button
              className="place-order-btn"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;