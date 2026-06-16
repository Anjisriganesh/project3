import React from "react";

const FoodCard = ({ food, addToCart }) => {
  return (
    <div className="food-card">
      <img
        src={`https://shoyu-backend.onrender.com${food.image}`}
        alt={food.name}
        className="food-image"
      />

      <h3>{food.name}</h3>

      <p>{food.description}</p>

      <h4>₹{food.price}</h4>

      <button onClick={() => addToCart(food)}>
        Add To Cart
      </button>
    </div>
  );
};

export default FoodCard;