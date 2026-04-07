import Header from './components/Header.jsx'
import image from './public/hawali-beach.jpg';
import MyDatePicker from './components/DatePicker.jsx';
import googleplay from './public/google-play.png';
import appleIcon from './public/apple.png';
import './style/footer.css';
import Details from './home/Details.jsx';
import Featured from './services/Featured.jsx';
import About from './home/About.jsx';
import Experience from './services/Experience.jsx';
import Footer from './home/Footer.jsx';

import { Routes, Route } from 'react-router-dom';

import PrivacyPolicy from './components/privacy.jsx';
import TermsConditions from './components/Terms&Conditions.jsx';

import './style/main.css';
import './style/searchBox.css';

function App() {

  return (
    <>
      <Header />

      <Routes>

        {/* HOME PAGE */}

        <Route path="/" element={
          <>
            <div className="hero">
              <img src={image} alt="Kerala" className="hero-image" />

              <div className="overlay">
                <h1 className="hero-title">Discover Kerala</h1>
                <h2 className="hero-subtitle">Differently</h2>

                <p className="hero-description">
                  Book Verified Real Homestays In Kerala.
                </p>

                <div className="vertical-box">
                  <div className="search-box-wrapper">
                    <MyDatePicker />
                  </div>
                </div>
              </div>

              <div className="app-download">
                 <a
    href="https://play.google.com/store/apps/details?id=apps.trippsee.com"
    target="_blank"
    rel="noopener noreferrer"
    className="android"
  >
    <img src={googleplay} alt="Google Play Icon" className="app-icon" />
    Google Play
  </a>
                 <a
    href="https://apps.apple.com/us/app/trippsee/id6759007924"
    target="_blank"
    rel="noopener noreferrer"
    className="apple"
  >
    <img src={appleIcon} alt="Apple Store Icon" className="apple-icon" />
    Apple Store
  </a>
              </div>
            </div>

            <Details />
            <Featured />
            <About />
            <Experience />
          </>
        }/>

        {/* PRIVACY PAGE */}

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* TERMS PAGE */}

        <Route path="/terms-conditions" element={<TermsConditions />} />

      </Routes>

      <Footer />

    </>
  )
}

export default App;