import { useState, useEffect } from 'react';
import './style/App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const hideHeaderFooterPaths = ['/admin/dashboard'];

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const shouldHideHeaderFooter = hideHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path) || location.pathname.startsWith('/admin')
  );

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#444' : '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
      {!shouldHideHeaderFooter && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <main>
        <Outlet />
      </main>
      {!shouldHideHeaderFooter && <Footer darkMode={darkMode} />}
    </div>
  );
}

export default App;
