import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../public/logo.jpg";


function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logoImage} />
<h1
  style={{
    ...styles.logoText,
    fontSize: isMobile ? "1.2rem" : "1.5rem",
  }}
>
  Trippsee
</h1>     </div>

      <nav style={{...styles.nav, gap: isMobile ? "1rem" : "1.8rem"}}>
        <Link to="/"
          style={{
            ...styles.navLink,
            padding: isMobile ? "1px 1px" : "2px 8px",
            fontSize: isMobile ? "0.85rem" : "0.9rem",
          }} 
  onClick={() => {
    document.getElementById("about").scrollIntoView({
      behavior: "smooth",
    });
  }}        >
          About
        </Link>

        <div
          style={{
            ...styles.navLink,
            padding: isMobile ? "1px 1px" : "2px 8px",
          fontSize: isMobile ? "0.85rem" : "0.9rem",
          }}
          onClick={() => {
            document.getElementById("contact").scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Contact
        </div>

        {/* <div
          style={{
            ...styles.navLink,
            padding: isMobile ? "1px 1px" : "2px 8px",
            fontSize: isMobile ? "0.85rem" : "0.9rem",
          }}
        >
          Terms & Conditions
        </div> */}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    padding: "6px 2%",
    background: "#ffffff",
    display: "flex",
    margin: "13px 0",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
  },

  logoImage: {
    height: "40px",
    marginRight: "10px",
  },

  logoText: {
    margin: 0,
    color: "#034218",
    fontSize: "1.8rem",

    fontWeight: "700",
        fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif"
  },

  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
  },

  navLink: {
    color: "#055320",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "600",
fontFamily: "'Segoe UI', Tahoma, Geneva, sans-serif",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },   

};


export default Header;