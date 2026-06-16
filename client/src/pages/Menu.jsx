import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setFoods(res.data);
    } catch (err) {
      console.error("Menu fetch error:", err);
    }
  };

  const addToCart = (food) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const foodId = food._id;

  const existingIndex = cart.findIndex(
    (item) => item.id === foodId
  );

  if (existingIndex !== -1) {
    cart[existingIndex] = {
      ...cart[existingIndex],
      quantity: cart[existingIndex].quantity + 1,
    };
  } else {
    cart.push({
      id: foodId,
      name: food.name,
      price: food.price,
      image: food.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${food.name} added to cart`);
};


  const categories = [
    "All",
    ...new Set(foods.map((food) => food.category).filter(Boolean)),
  ];

  const filteredFoods =
    selectedCategory === "All"
      ? foods
      : foods.filter(
          (food) => food.category === selectedCategory
        );

  return (
  <div className="menu-container">

    {/* Categories */}
    <div className="filter-section">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${
            selectedCategory === category ? "selected-filter" : ""
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>

    <div className="food-list-container">
      {filteredFoods.map((food) => (
        <div className="food-item-card" key={food._id}>

          <img
            src={`http://localhost:5000${food.image}`}
            alt={food.name}
            className="food-item-image"
          />

          <div className="food-item-content">

            {/* Restaurant Info */}
            <div className="restaurant-info-box">
  <h3 className="restaurant-name">
    {food.restaurantName}
  </h3>

  <div className="restaurant-stats">

    <div className="rating-badge">
      <span className="star-icon">★</span>
      <span>{food.rating}</span>
    </div>

    <span className="review-count">
      {food.reviews}+ Reviews
    </span>

    <span className="dot">•</span>

    <span className="delivery-time">
      {food.deliveryTime}
    </span>

  </div>
</div>

            <div>
            <h4>{food.name}</h4>
            <p className="food-description">
              {food.description}
            </p>
            </div>

            <div className="food-footer">
              <p className="food-price">₹{food.price}</p>

              <button
                className="cart-button"
                onClick={() => addToCart(food)}
              >
                Add Cart
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>

  </div>

);
};

export default Menu;