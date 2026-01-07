import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Award,
    Heart,
    Users,
    MapPin,
    Star,
    Utensils,
    Building2,
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import { restaurants, ngos } from '../../../data/partners';
import './Partners.css';

const Partners = () => {
    const [activeTab, setActiveTab] = useState('restaurants');
    const [hoveredId, setHoveredId] = useState(null);

    const totalRestaurantStats = {
        donations: restaurants.reduce((sum, r) => sum + r.totalDonations, 0),
        portions: restaurants.reduce((sum, r) => sum + r.portionsServed, 0),
        partners: restaurants.length
    };

    const totalNGOStats = {
        served: ngos.reduce((sum, n) => sum + n.peopleServed, 0),
        partners: ngos.length,
        locations: ngos.length * 3 // Approximate coverage
    };

    const data = activeTab === 'restaurants' ? restaurants : ngos;

    return (
        <section className="partners-section" id="partners">
            <div className="partners-wrap">

                {/* Header */}
                <motion.div
                    className="partners-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-badge">
                        <Award size={16} />
                        Our Partners
                    </span>

                    <h2>
                        Building a <span className="highlight">Hunger-Free</span> Community
                    </h2>

                    <p>
                        Join our network of restaurants and NGOs working together to eliminate food waste
                        and feed those in need.
                    </p>
                </motion.div>

                {/* Impact Stats */}
                <motion.div
                    className="impact-banner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="impact-stat">
                        <div className="impact-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                            <Utensils size={24} />
                        </div>
                        <div className="impact-info">
                            <span className="impact-num">{totalRestaurantStats.partners}</span>
                            <span className="impact-label">Restaurant Partners</span>
                        </div>
                    </div>

                    <div className="impact-divider"></div>

                    <div className="impact-stat">
                        <div className="impact-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
                            <Heart size={24} />
                        </div>
                        <div className="impact-info">
                            <span className="impact-num">{totalNGOStats.partners}</span>
                            <span className="impact-label">NGO Partners</span>
                        </div>
                    </div>

                    <div className="impact-divider"></div>

                    <div className="impact-stat">
                        <div className="impact-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                            <Users size={24} />
                        </div>
                        <div className="impact-info">
                            <span className="impact-num">{(totalNGOStats.served / 1000).toFixed(0)}K+</span>
                            <span className="impact-label">People Served</span>
                        </div>
                    </div>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    className="tab-switcher"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.button
                        className={`tab-btn ${activeTab === 'restaurants' ? 'active' : ''}`}
                        onClick={() => setActiveTab('restaurants')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Utensils size={18} />
                        Partner Restaurants
                        <span className="tab-count">{restaurants.length}</span>
                    </motion.button>

                    <motion.button
                        className={`tab-btn ${activeTab === 'ngos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ngos')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Heart size={18} />
                        Partner NGOs
                        <span className="tab-count">{ngos.length}</span>
                    </motion.button>
                </motion.div>

                {/* Partners Grid */}
                <motion.div
                    className="partners-grid"
                    layout
                >
                    {data.map((partner, i) => {
                        const isHovered = hoveredId === partner.id;
                        const isRestaurant = activeTab === 'restaurants';

                        return (
                            <motion.div
                                key={partner.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="partner-card"
                                onMouseEnter={() => setHoveredId(partner.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ y: -8 }}
                            >
                                {/* Logo/Avatar */}
                                <motion.div
                                    className="partner-logo"
                                    animate={isHovered ? { scale: 1.1, rotate: -5 } : { scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="logo-emoji">
                                        {typeof partner.logo === 'string' ? (
                                            partner.logo
                                        ) : (
                                            <partner.logo width="48" height="48" />
                                        )}
                                    </span>
                                </motion.div>

                                {/* Content */}
                                <div className="partner-content">
                                    <div className="partner-header">
                                        <h3 className="partner-name">{partner.name}</h3>
                                        <div className="partner-rating">
                                            <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                            <span>{partner.rating}</span>
                                        </div>
                                    </div>

                                    <div className="partner-meta">
                                        <span className="meta-item">
                                            <MapPin size={14} />
                                            {partner.location}
                                        </span>
                                        <span className="meta-sep">•</span>
                                        <span className="meta-item">{partner.type}</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="partner-stats">
                                        {isRestaurant ? (
                                            <>
                                                <div className="stat-item">
                                                    <span className="stat-num">{partner.totalDonations}</span>
                                                    <span className="stat-label">Donations</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="stat-num">{partner.portionsServed}</span>
                                                    <span className="stat-label">Portions</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="stat-item">
                                                    <span className="stat-num">{(partner.peopleServed / 1000).toFixed(1)}K</span>
                                                    <span className="stat-label">Served</span>
                                                </div>
                                                <div className="stat-item">
                                                    <span className="stat-num">{partner.partnersCount}</span>
                                                    <span className="stat-label">Partners</span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Impact Badge */}
                                    <div className="impact-badge">
                                        <CheckCircle size={14} color="#10b981" />
                                        <span>{isRestaurant ? partner.impact : partner.focus}</span>
                                    </div>

                                    {/* Joined/Established */}
                                    <div className="partner-footer">
                                        <span className="joined-text">
                                            {isRestaurant ? `Joined ${partner.joined}` : `Est. ${partner.established}`}
                                        </span>
                                        <motion.button
                                            className="view-btn"
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            View Profile
                                            <ArrowRight size={14} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="partners-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="cta-content">
                        <h3>Want to join our mission?</h3>
                        <p>
                            {activeTab === 'restaurants'
                                ? "Become a partner restaurant and make a difference while reducing waste."
                                : "Register your NGO to receive quality surplus food for your community programs."}
                        </p>
                    </div>
                    <motion.button
                        className="cta-button"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Building2 size={18} />
                        {activeTab === 'restaurants' ? "Become a Partner Restaurant" : "Register Your NGO"}
                        <ArrowRight size={18} />
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
};

export default Partners;
