import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wrap">

        <div className="footer-main">
          {/* Brand */}
          <div className="footer-col brand-col">
            <h3 className="brand"
              style={{ fontFamily: "Bruno Ace", fontWeight: "bold" }}>Nutri<span style={{ fontFamily: "Bruno Ace", fontWeight: "bold" }}>Scan</span></h3>
            <p className="tagline">
              Making nutrition simple. Scan your food, understand what you eat,
              and make healthier choices every day.
            </p>
            <div className="socials">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col contact-col">
            <h4>Get in Touch</h4>
            <div className="contact-list">
              <div className="contact-item">
                <Mail size={16} />
                <span>hello@nutriscan.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 789-0123</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} NutriScan. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy</a>
            <span>•</span>
            <a href="#terms">Terms</a>
            <span>•</span>
            <a href="#cookies">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;