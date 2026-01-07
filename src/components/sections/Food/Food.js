import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Beef,
  Zap,
  Wheat,
  Apple,
  Search,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import './Food.css';

const Food = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    {
      title: "Vegetarian",
      desc: "Fresh plant-based meals verified for quality and nutrition.",
      icon: Leaf,
      color: '#10b981',
      bgColor: '#ecfdf5',
      count: 124,
      growth: 12
    },
    {
      title: "Protein Rich",
      desc: "High-protein legumes and dairy products ready for distribution.",
      icon: Beef,
      color: '#3b82f6',
      bgColor: '#eff6ff',
      count: 86,
      growth: 8
    },
    {
      title: "Low Carb",
      desc: "Fiber-rich options perfect for balanced meal planning.",
      icon: Zap,
      color: '#f59e0b',
      bgColor: '#fffbeb',
      count: 42,
      growth: 15
    },
    {
      title: "Grain Base",
      desc: "Quality-checked whole grains and cereals for bulk meals.",
      icon: Wheat,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
      count: 95,
      growth: 10
    },
    {
      title: "Fresh Produce",
      desc: "Farm-fresh fruits and vegetables at peak ripeness.",
      icon: Apple,
      color: '#ef4444',
      bgColor: '#fef2f2',
      count: 158,
      growth: 18
    }
  ];

  return (
    <section className="food-section" id="food">
      <div className="food-wrap">

        {/* Header */}
        <motion.div
          className="food-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">
            <Leaf size={16} />
            Food Categories
          </span>
          <h2>Browse <span className="highlight">Verified</span> Categories</h2>
          <p>
            Every item has passed our quality checks and is ready for
            NGO collection and community distribution.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="stat-box">
            <span className="stat-num">500+</span>
            <span className="stat-label">Active Listings</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">12+</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-box">
            <span className="stat-num">50+</span>
            <span className="stat-label">Daily Updates</span>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={i}
                className="category-card"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Icon */}
                <motion.div
                  className="cat-icon"
                  style={{ backgroundColor: cat.bgColor }}
                  animate={isHovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={24} color={cat.color} strokeWidth={2.5} />
                </motion.div>

                {/* Content */}
                <div className="cat-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                </div>

                {/* Footer */}
                <div className="cat-footer">
                  <div className="cat-meta">
                    <span className="cat-count">{cat.count} items</span>
                    <div className="cat-growth" style={{ color: cat.color }}>
                      <TrendingUp size={14} />
                      <span>+{cat.growth}%</span>
                    </div>
                  </div>

                  <motion.button
                    className="cat-btn"
                    style={{
                      color: cat.color,
                      borderColor: isHovered ? cat.color : '#e2e8f0'
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="food-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>Can't find what you need?</p>
          <motion.button
            className="cta-btn"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search size={18} />
            Search All Categories
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default Food;