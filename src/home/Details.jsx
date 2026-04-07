import React from "react";
import '../style/booking.css';
import { FaMapMarkerAlt, FaDollarSign, FaBuilding, FaCheckCircle } from "react-icons/fa";
export default function SmartBookingTools() {

  const tools = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Location Filter",
      description: "Search by district, city, or popular destinations across Kerala"
    },
    {
      icon: <FaDollarSign />,
      title: "Price Range",
      description: "Filter properties by your budget from ₹1,000 to ₹10,000+"
    },
    {
      icon: <FaBuilding />,
      title: "Property Type",
      description: "Choose between cozy homestays or full-service villas"
    },
    {
      icon: <FaCheckCircle />,
      title: "Verified Only",
      description: "All properties are verified for safety and authenticity"
    }
  ];

  return (
    <section className="tools-section" id="about">

      <div className="tools-container">

        <div className="tools-header">
          <h2>Smart Booking Tools</h2>
          <p>Find your perfect stay with powerful search and filtering options</p>
        </div>

        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div className="tool-card" key={index}>

              <div className="tool-icon">
                {tool.icon}
              </div>

              <h3>{tool.title}</h3>

              <p>{tool.description}</p>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}