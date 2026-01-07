import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { cardData } from '../../../data/about';
import './About.css';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="about-section-main" id="about">
      <div className="about-container-main">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="about-subtitle">Our Mission</span>

          <h2 className="about-title-main">
            A Circular Ecosystem for{' '}
            <span className="about-title-accent">
              Zero Hunger
            </span>
          </h2>

          <p className="about-description-main">
            Bridging the gap between surplus and scarcity. By combining <strong>IoT sensor intelligence</strong> with
            social logistics, we ensure that perfectly good food from restaurants
            finds its way to the plates of those who need it most, rather than
            the landfill.
          </p>

          <div className="stats-wrapper">
            <div className="stat-item">
              <h4>98%</h4>
              <p>Accuracy Rate</p>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <h4>50k+</h4>
              <p>Meals Diverted</p>
            </div>
          </div>

          <button className="join-button">
            <Leaf size={18} color="#10b981" />
            Join the Movement
          </button>
        </motion.div>

        {/* Right Side: Interactive Workflow */}
        <div className="workflow-main">
          {cardData.map((cardData, index) => (
            <motion.div
              key={cardData.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onMouseEnter={() => setHoveredCard(cardData.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`cardData-main ${hoveredCard === cardData.id ? 'hovered' : ''}`}
            >
              <div className={`cardData-icon-box ${cardData.colorClass}`}>
                {cardData.icon}
              </div>
              <div className="cardData-content-main">
                <h3>{cardData.title}</h3>
                <p>{cardData.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;