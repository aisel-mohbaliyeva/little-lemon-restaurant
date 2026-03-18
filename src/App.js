import React, { useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ReservationsPage from './pages/ReservationsPage';
import './App.css';

/**
 * App - Root component for Little Lemon Restaurant web app.
 * Handles client-side navigation between pages.
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onReserve={() => navigate('reservations')} />;
      case 'reservations':
        return <ReservationsPage onHome={() => navigate('home')} />;
      default:
        return (
          <main id="main-content">
            <div className="placeholder-page">
              <h1>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
              <p>This page is coming soon.</p>
              <button className="placeholder-page__btn" onClick={() => navigate('home')}>
                ← Back to Home
              </button>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav currentPage={currentPage} onNavigate={navigate} />
      {renderPage()}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
