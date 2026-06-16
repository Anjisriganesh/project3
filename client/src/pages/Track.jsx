import React, { useState, useEffect } from "react";
import "./Track.css";

const Track = () => {
  const [orderPlaced, setOrderPlaced] = useState(
    localStorage.getItem("orderPlaced") === "true"
  );

  const [status, setStatus] = useState(
    localStorage.getItem("orderStatus") || "Preparing"
  );

  useEffect(() => {
    if (!orderPlaced) return;

    const steps = [
      "Preparing",
      "Picked Up",
      "On the way",
      "Delivered",
    ];

    let index = steps.indexOf(status);

    const interval = setInterval(() => {
      if (index < steps.length - 1) {
        index++;

        const nextStatus = steps[index];

        setStatus(nextStatus);
        localStorage.setItem("orderStatus", nextStatus);

        // Order completed
        if (nextStatus === "Delivered") {
          setTimeout(() => {
            localStorage.removeItem("orderPlaced");
            localStorage.removeItem("orderStatus");

            setOrderPlaced(false);
          }, 3000);
        }
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStepClass = (step) => {
    const steps = [
      "Preparing",
      "Picked Up",
      "On the way",
      "Delivered",
    ];

    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(step);

    return stepIndex <= currentIndex
      ? "step active"
      : "step";
  };

  // No active order
  if (!orderPlaced) {
    return (
      <div className="track-container">
        <h1>🚚 Track Your Order</h1>

        <div className="empty-track">
          <h2>No active orders found</h2>

          <p>
            Place an order to start tracking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="track-container">
      <h1>🚚 Track Your Order</h1>

      <div className="track-box">
        <div className={getStepClass("Preparing")}>
           Preparing
        </div>

        <div className={getStepClass("Picked Up")}>
           Picked Up
        </div>

        <div className={getStepClass("On the way")}>
           On the way
        </div>

        <div className={getStepClass("Delivered")}>
           Delivered
        </div>
      </div>

      <h2 className="status-text">
        Current Status: <span>{status}</span>
      </h2>
    </div>
  );
};

export default Track;