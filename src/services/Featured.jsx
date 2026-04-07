import React from "react";
import "../style/featured.css";
import verifyIcon from '../public/verify.png';
import icon from '../public/icon.png';

const properties = [
  {
    id: 1,
    title: "Traditional Heritage Home",
    location: "Alleppey, Kerala",
    img: "https://images.unsplash.com/photo-1565255822848-80db21938837",
      price: 2800,
      rating: 4.1,
  },
  {
    id: 2,
    title: "Jungle Retreat Villa",
    location: "Munnar, Kerala",
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    rating: 4.6,
      price: 3500,
  },
  {
    id: 3,
    title: "Modern Poolside Villa",
    location: "Varkala, Kerala",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    rating: 4.2,
      price: 4100,
  },
  {
    id: 4,
    title: "Backwater Lake Homestay",
    location: "Kumarakom, Kerala",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    rating: 4.7,
      price: 3800,
  },
  {
    id: 5,
    title: "Wooden Hill Station Retreat",
    location: "Thekkady, Kerala",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    rating: 4.5,
      price: 2500,
  },
  {
    id: 6,
    title: "Luxury Private Villa",
    location: "Kovalam, Kerala",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    rating: 4.9,
      price: 4100,
  },
];

export default function FeaturedProperties() {
  return (
    <section className="featured">
        <div className="featured-container">
      <h2 className="featured-title">Featured Properties</h2>
      <p className="featured-subtitle">
        Explore handpicked homestays and villas across Kerala
      </p>

      <div className="property-grid">
        {properties.map((item) => (
          <div className="property-card" key={item.id}>
            <div className="property-image">
              <img src={item.img} alt={item.title} />

              <span className="tag">Homestay</span>
              <span className="verified"><img src={verifyIcon } alt="Verified" /> Verified</span>
            </div>

            <div className="property-info">
              <h3>{item.title}</h3>
            </div>
            <span className="property-location"><img src={icon} alt="Location Icon" className="location-icon" /> {item.location}</span>
    <div className="property-meta">
  <span className="rating">⭐ {item.rating}</span>
  <div className="price">₹{item.price}<span className="night">/night</span></div>
</div>

<button className="view-button">view on app</button>
          </div>
        ))}
      </div></div>
    </section>
  );
}