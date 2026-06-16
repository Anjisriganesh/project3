import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const [location, setLocation] = useState(
    localStorage.getItem("location") || "Palakollu"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLocation(localStorage.getItem("location") || "Palakollu");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFoods();
  }, []);

  
  useEffect(() => {
  const sections = document.querySelectorAll(".zoom-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  return () => {
    sections.forEach((section) => {
      observer.unobserve(section);
    });
  };
}, [foods]);


  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods");
      setFoods(res.data);
    } catch (error) {
      console.log("Error fetching foods:", error);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const openMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="home">
      
      <div className="banner">
        <img
          src="/shoyu.jpg"
          alt="Shoyu Banner"
          className="banner-image"
        />

        <div className="banner-content">
          <h1>Delicious Food Delivered to Your Doorstep</h1>

          <p>
            Order your favorite meals from the best restaurants in{" "}{location}
          </p>
        </div>
      </div>

      {/* Restaurants */}
      <h3 className="delivery-heading">
        Restaurants with online food delivery in {location}
      </h3>

      <div className="restaurant-grid">
  {foods.map((item) => (
    <div
      className="restaurant-card zoom-section"
      key={item._id}
    >
      <button
        className={`fav-btn ${
          favorites.includes(item._id) ? "active" : ""
        }`}
        onClick={() => toggleFavorite(item._id)}
      >
        {favorites.includes(item._id)
          ? "❤️"
          : "🤍"}
      </button>

      <img
        src={`http://localhost:5000${item.image}`}
        alt={item.name}
        onClick={openMenu}
        className="food-img"
      />

      <div className="card-content">
        <h3>{item.name}</h3>

        <p className="description">
          {item.description}
        </p>

        <div className="rating-time">
          <span className="category">
            🍽️ {item.category}
          </span>

          <span className="price">
            💰 ₹{item.price}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Journey */}
      <div className="journey-section zoom-section">
        <h2 className="journey-title">THE SHOYU JOURNEY</h2>

        <div className="journey-grid">
          <div className="journey-card">
            <img src="/g1.webp" alt="Journey 2021" />
            <h3>2021</h3>
            <p>Idea and planning of Shoyu food delivery platform.</p>
          </div>

          <div className="journey-card">
            <img src="/g2.webp" alt="Journey 2022" />
            <h3>2022</h3>
            <p>Started restaurant partnerships and menu onboarding.</p>
          </div>

          <div className="journey-card">
            <img src="/g3.webp" alt="Journey 2023" />
            <h3>2023</h3>
            <p>Launched the first version of the application.</p>
          </div>

          <div className="journey-card">
            <img src="/g4.webp" alt="Journey 2024" />
            <h3>2024</h3>
            <p>Added real-time ordering and tracking features.</p>
          </div>

          <div className="journey-card">
            <img src="/g6.webp" alt="Journey 2025" />
            <h3>2025</h3>
            <p>Expanded services to multiple cities and users.</p>
          </div>
        </div>
      </div>

      <div className="app-download-section">
  <div className="app-left">
    <h3>Shoyu</h3>

    <h2>Get the Shoyu App now!</h2>

    <p>
      For best offers and discounts curated specially for you.
      Scan the QR code and enjoy a seamless food ordering experience.
    </p>

    <button className="download-btn">
      Download App
    </button>
  </div>

  <div className="app-right">
    <img
      src="/sc.webp"
      alt="Shoyu App"
      className="app-download-image"
    />
  </div>
</div>


<div className="about-section zoom-section">
  <div className="about-left">
    <span className="about-tag">ABOUT SHOYU</span>
    

    <p>
       From local specialties to trending cuisines, Shoyu connects
      food lovers with their favorite restaurants.Our mission is to elevate the quality of life of the urban consumer by offering unparalleled convenience. Convenience is what makes us tick. It’s what makes us get out of bed and say, “Let’s do this.
    </p>

   

    <button className="about-btn">
      Explore More
    </button>
  </div>

  <div className="about-right">
    <img
      src="/p1.png"
      alt="About Shoyu"
      className="about-image"
    />
  </div>
</div>

    </div>
  );
};

export default Home;