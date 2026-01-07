import { useState, useEffect } from 'react';
import { ArrowRight, Info, UtensilsCrossed } from 'lucide-react';
import { homeData } from '../../../data/home';
import './Home.css';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-background"></div>

      {/* Left Section */}
      <div className="hero-left">
        <div className={`hero-badge ${isVisible ? 'fade-in-up' : ''}`}>
          <span>Connecting Restaurants with NGOs</span>
        </div>

        <h1 className={`hero-title hero-title-font ${isVisible ? 'fade-in-up delay-1' : ''}`}>
          Rescue Food.<br />
          <span className="brand-accent hero-title-font">Feed Communities.</span>
        </h1>

        <p className={`hero-subtitle ${isVisible ? 'fade-in-up delay-2' : ''}`}>
          Bridge the gap between surplus food and hungry families. Our platform connects restaurants with NGOs to ensure no meal goes to waste while feeding those in need.
        </p>

        <div className={`hero-buttons ${isVisible ? 'fade-in-up delay-3' : ''}`}>
          <button
            className={`btn-primary ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => handleLinkClick(e, '#donate')}
            aria-label="Start donating food"
          >
            <UtensilsCrossed size={20} />
            <span>Donate Food</span>
            <ArrowRight size={18} />
          </button>

          <button
            className="btn-secondary"
            onClick={(e) => handleLinkClick(e, '#about')}
            aria-label="Learn how it works"
          >
            <Info size={20} />
            <span>How It Works</span>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="hero-right">
        <div className={`hero-features ${isVisible ? 'fade-in-up delay-4' : ''}`}>
          {homeData.map((homeData) => (
            <div key={homeData.id} className="feature-card">

              <div className="feature-icon">
                {homeData.icon}
              </div>

              <div className="feature-content">
                <div className="feature-stat feature-stat-font">{homeData.stat}</div>
                <h3>{homeData.title}</h3>
                <p>{homeData.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;