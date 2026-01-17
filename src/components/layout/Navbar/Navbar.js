import { useState, useEffect } from 'react';
import { Menu, X, LogIn, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLoginClick, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isHome) {
        const sections = ['home', 'about', 'food', 'food-menu', 'nutritional-content', 'partners', 'contact'];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && el.getBoundingClientRect().top <= 100) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Handle hash scrolling when arriving from another page
  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [isHome, location.hash]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'food', label: 'Category' },
    { id: 'food-menu', label: 'Menu' },
    { id: 'nutritional-content', label: 'Nutrition' },
    { id: 'partners', label: 'Partners' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (e, id) => {
    setIsMenuOpen(false);

    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
      }
    } else {
      // Allow default navigation to /#id
      // We explicitly navigate to ensure hash change behaves correctly
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <h1 className="logo-text" style={{ fontFamily: "Bruno Ace", fontWeight: "bold" }}>Nutri<span className="logo-accent" style={{ fontFamily: "Bruno Ace", fontWeight: "bold" }}>Scan</span></h1>
          </div>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  className={activeSection === item.id && isHome ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {user ? (
              <div className="user-profile">
                <div className="user-info">
                  <User size={18} />
                  <span>{user.role}</span>
                </div>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
              </div>
            ) : (
              <button className="login-btn" onClick={onLoginClick}>
                <LogIn size={18} />
                <span>Login</span>
              </button>
            )}

            <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <span className="mobile-menu-title" style={{ fontFamily: "Bruno Ace", fontWeight: "bold" }}>Navigation</span>
            </div>
            <nav className="mobile-nav-links">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={activeSection === item.id && isHome ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mobile-actions">
              {user ? (
                <button className="mobile-logout-btn" onClick={() => { onLogout(); setIsMenuOpen(false); }}>
                  Logout ({user.role})
                </button>
              ) : (
                <button className="mobile-cta-btn" onClick={() => { onLoginClick(); setIsMenuOpen(false); }}>
                  Login
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
