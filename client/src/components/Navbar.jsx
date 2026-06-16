import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const [search, setSearch] = useState("");
   const [location, setLocation] = useState(
    localStorage.getItem("location")
  );



  const username =
  JSON.parse(localStorage.getItem("user"))?.name?.slice(0, 6) || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <h2> Shoyu</h2>

        
      </div>

      
      <div className="navbar-center">
        <input
          type="text"
          placeholder="🔍 Search food, restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      
      <div className="navbar-right">
        <Link to="/home"> Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart"> Cart</Link>
        <Link to="/track"> Track</Link>

        
        <div className="location-box">
  <span className="location-icon">✈️</span>

  <select
  value={location}
  onChange={(e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  }}
  className="location-select"
>
  <option value="Palakollu">Palakollu</option>
  <option value="Medapadu">Medapadu</option>
  <option value="Bhimavaram">Bhimavaram</option>
  <option value="Srikakulam">Srikakulam</option>
  <option value="Vijayawada">Vijayawada</option>
  <option value="Hyderabad">Hyderabad</option>
  <option value="Tirupati">Tirupati</option>
  <option value="Vizag">Vizag</option>
</select>
</div>

   {isLoggedIn && (
  <div className="user-menu">
    <span className="username">
      👤 {username}
    </span>

    <button className="logout-hover" onClick={handleLogout}>
      Logout
    </button>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;