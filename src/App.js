import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Food from './components/sections/Food';
import Menu from './components/sections/Menu';
import Nutrition from './components/sections/Nutrition';
import Partners from './components/sections/Partners';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Loading from './components/common/Loading';
import AuthModal from './components/common/Auth/AuthModal';
import Dashboard from './components/sections/Dashboard/Dashboard';
import NotFound from './components/common/NotFound';
import { listings as initialListings } from './data/listings';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState(initialListings);

  useEffect(() => {
    // Simulating initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (role) => {
    setUser({ role, email: role === 'ngo' ? 'ngo@scan.com' : 'res@scan.com' });
    setIsLoggedIn(true);
    setShowAuthModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const addDonation = (newDonation) => {
    const donation = {
      ...newDonation,
      id: listings.length + 1,
      status: 'available',
      timeAgo: 'Just now',
      distance: '0.5 km',
      pickup: 'Verification Pending',
      freshness: 100
    };
    setListings(prev => [donation, ...prev]);
  };

  const updateDonation = (id, updates) => {
    setListings(prev => prev.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Main Layout Route */}
          <Route element={
            <>
              <Navbar
                onLoginClick={() => setShowAuthModal(true)}
                user={user}
                onLogout={handleLogout}
              />
              <main>
                <Outlet />
              </main>
              <Footer />
            </>
          }>
            <Route path="/" element={
              isLoggedIn ? (
                <Dashboard
                  user={user}
                  listings={listings}
                  onAddDonation={addDonation}
                  onUpdateDonation={updateDonation}
                />
              ) : (
                <>
                  <Home />
                  <About />
                  <Food />
                  <Menu />
                  <Nutrition />
                  <Partners />
                  <Contact />
                </>
              )
            } />
          </Route>

          {/* Standalone Route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
