import React from "react";

const FoodCard = ({ food, addToCart }) => {
  return (
    <div className="food-card">
      <img
        src={`http://localhost:5000${food.image}`}
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